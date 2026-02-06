#!/bin/bash
# Framework Registry - Plugin Packaging Script
# Packs all plugins in source/ into plugins/ as .tar.gz files

REGISTRY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SOURCE_DIR="$REGISTRY_DIR/source"
SOURCES_FILE="$REGISTRY_DIR/sources.json"
OUTPUT_DIR="$REGISTRY_DIR/plugins"
REGISTRY_FILE="$REGISTRY_DIR/marketplace.json"

# --- TRANSLATIONS (EN) ---
T_CORE_PACKING="Packing Core v%s..."
T_CORE_SUCCESS="Success: Core v%s added to registry."
T_PLUGIN_BUILDING="Building and packing plugin %s v%s from Git..."
T_PLUGIN_SUCCESS="Success: %s added to registry."
T_PLUGIN_NO_MANIFEST="Warning: No manifest found for %s, skipping."
T_THEME_BUILDING="Building and packing theme %s v%s from Git..."
T_THEME_SUCCESS="Success: %s added to registry."
T_EXTENSION_SYNC="Syncing %s from %s (%s)..."
T_CLI_NO_ENTRY="No entry point found in %s (index.ts/js)"
T_FINAL_CLEANUP="Final cleanup of build artifacts..."
T_COMPLETE="Registry packing and metadata update complete."

# Clean existing artifacts from output directories to ensure a fresh build
echo "Cleaning old artifacts..."
rm -f "$OUTPUT_DIR"/*.zip "$OUTPUT_DIR"/*.tar.gz 2>/dev/null
rm -f "$REGISTRY_DIR/core"/*.zip "$REGISTRY_DIR/core"/*.tar.gz 2>/dev/null
rm -f "$REGISTRY_DIR/themes"/*.zip "$REGISTRY_DIR/themes"/*.tar.gz 2>/dev/null

mkdir -p "$OUTPUT_DIR"
mkdir -p "$SOURCE_DIR/plugins"
mkdir -p "$SOURCE_DIR/themes"

# Initialize registry JSON structure
echo '{"version": "1.0.0", "lastUpdated": "", "core": null, "plugins": [], "themes": []}' > "$REGISTRY_FILE"
# Set current timestamp
last_updated=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
jq --arg date "$last_updated" '.lastUpdated = $date' "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"

# --- HELPERS ---
sync_extension() {
    local type=$1 # plugins or themes
    local slug=$2
    local git_url=$3
    local branch=$4
    local target_dir="$SOURCE_DIR/$type/$slug"
    local final_url="$git_url"

    # Inject token into URL if available (using more reliable replacement)
    if [ -n "$GITHUB_TOKEN" ] && [[ "$git_url" == https://github.com/* ]]; then
        final_url="https://${GITHUB_TOKEN}@github.com/${git_url#https://github.com/}"
    fi

    printf "$T_EXTENSION_SYNC\n" "$slug" "$git_url" "$branch"

    if [ ! -d "$target_dir" ] || [ ! -d "$target_dir/.git" ]; then
        rm -rf "$target_dir"
        git clone --depth 1 --branch "$branch" --quiet "$final_url" "$target_dir" || { echo "Failed to clone $slug"; return 1; }
    else
        # Update remote URL to ensure token is used
        (cd "$target_dir" && \
         git remote set-url origin "$final_url" && \
         git fetch origin "$branch" --quiet && \
         git reset --hard "origin/$branch") || { echo "Failed to sync $slug"; return 1; }
    fi
}

# --- SYNC CORE SOURCE ---
CORE_REPO_URL="https://github.com/fromcode119/framework"
if [ -n "$GITHUB_TOKEN" ]; then
    CORE_REPO_URL="https://${GITHUB_TOKEN}@github.com/fromcode119/framework"
fi
CORE_SOURCE_DIR="$SOURCE_DIR/core"
mkdir -p "$SOURCE_DIR"

# Clone the repository if it doesn't exist
if [ ! -d "$CORE_SOURCE_DIR/.git" ]; then
    echo "Cloning Core repository (main branch)..."
    [ -d "$CORE_SOURCE_DIR" ] && rm -rf "$CORE_SOURCE_DIR"
    git clone --depth 1 "$CORE_REPO_URL" "$CORE_SOURCE_DIR"
else
    echo "Updating Core repository..."
    (cd "$CORE_SOURCE_DIR" && git pull)
fi

# --- PREPARE CLI FOR BUILDING ---
# We need the CLI to build themes and plugins on the fly
CLI_PATH="$CORE_SOURCE_DIR/packages/cli"
if [ -d "$CLI_PATH" ]; then
    echo "Preparing Fromcode CLI for registry builds..."
    
    # We need to build the CLI and its internal dependencies (database, core, etc.)
    (cd "$CORE_SOURCE_DIR" && npm install --quiet && npm run build)
fi

# Set dummy environment variables to satisfy CLI validation during builds if not already set
export DATABASE_URL="${DATABASE_URL:-postgres://localhost:5432/sync_only}"
export JWT_SECRET="${JWT_SECRET:-sync_only_secret_must_be_at_least_32_characters_long}"
export NODE_ENV="${NODE_ENV:-development}"

# --- PACK CORE ---
CORE_OUTPUT_DIR="$REGISTRY_DIR/core"
mkdir -p "$CORE_OUTPUT_DIR"

if [ -d "$CORE_SOURCE_DIR" ]; then
    core_package_json="$CORE_SOURCE_DIR/package.json"
    if [ -f "$core_package_json" ]; then
        version=$(jq -r '.version' "$core_package_json")
        output_name="fromcode-core-${version}.zip"
        download_url="/core/$output_name"
        
        printf "$T_CORE_PACKING\n" "$version"
        # Pack only essential system files: packages, root configs, and docker setup
        # Excludes docs, starters, and development noise
        (cd "$CORE_SOURCE_DIR" && zip -ro "$CORE_OUTPUT_DIR/$output_name" \
            packages/ \
            package.json \
            package-lock.json \
            tsconfig.json \
            Dockerfile \
            docker-compose.yml \
            .dockerignore \
            -x "*.git*" "*/node_modules/*" "*/.next/*" "*.env*" "*.log*" "*/backups/*" "*/public/uploads/*")
        
        jq --arg version "$version" \
           --arg url "$download_url" \
           --arg date "$last_updated" \
           '.core = {version: $version, downloadUrl: $url, lastUpdated: $date}' \
           "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
        
        printf "$T_CORE_SUCCESS\n" "$version"

        # Link built packages so the sync script can find them
        mkdir -p node_modules/@fromcode
        ln -sf "$CORE_SOURCE_DIR/packages/core" node_modules/@fromcode/core
        ln -sf "$CORE_SOURCE_DIR/packages/database" node_modules/@fromcode/database
        ln -sf "$CORE_SOURCE_DIR/packages/api" node_modules/@fromcode/api
        ln -sf "$CORE_SOURCE_DIR/packages/auth" node_modules/@fromcode/auth
        ln -sf "$CORE_SOURCE_DIR/packages/sdk" node_modules/@fromcode/sdk
    fi
fi

# --- PACK PLUGINS ---
num_plugins=$(jq '.plugins | length' "$SOURCES_FILE")
for (( i=0; i<$num_plugins; i++ )); do
    plugin_slug=$(jq -r ".plugins[$i].slug" "$SOURCES_FILE")
    plugin_url=$(jq -r ".plugins[$i].gitUrl" "$SOURCES_FILE")
    plugin_branch=$(jq -r ".plugins[$i].branch" "$SOURCES_FILE")
    plugin_path="$SOURCE_DIR/plugins/$plugin_slug"

    sync_extension "plugins" "$plugin_slug" "$plugin_url" "$plugin_branch"

    if [ -d "$plugin_path" ]; then
        manifest_file="$plugin_path/manifest.json"
        
        # Determine manifest file
        if [ ! -f "$manifest_file" ] && [ -f "$plugin_path/plugin.json" ]; then
             manifest_file="$plugin_path/plugin.json"
        fi

        if [ -f "$manifest_file" ]; then
            plugin_slug=$(jq -r '.slug' "$manifest_file")
            version=$(jq -r '.version' "$manifest_file")
            name=$(jq -r '.name' "$manifest_file")
            desc=$(jq -r '.description // ""' "$manifest_file")
            category=$(jq -r '.category // "general"' "$manifest_file")
            author=$(jq -r '.author // ""' "$manifest_file")
            homepage=$(jq -r '.homepage // ""' "$manifest_file")
            
            output_name="${plugin_slug}-${version}.zip"
            download_url="/plugins/$output_name"
            
            printf "$T_PLUGIN_BUILDING\n" "$plugin_slug" "$version"
            
            # 1. Build the plugin UI assets AND Backend using the CLI
            (cd "$SOURCE_DIR" && node "$CORE_SOURCE_DIR/packages/cli/dist/bin.js" plugin build "$plugin_slug")

            # Create zip, EXCLUDING dev junk
            TMP_ZIP_DIR=$(mktemp -d)
            cp -R "$plugin_path/" "$TMP_ZIP_DIR/"
            
            # Clean up before zipping: remove junk but KEEP compiled index.js
            find "$TMP_ZIP_DIR" -type d -name "node_modules" -exec rm -rf {} + 2>/dev/null
            find "$TMP_ZIP_DIR" -type d -name ".next" -exec rm -rf {} + 2>/dev/null
            find "$TMP_ZIP_DIR" -type d -name ".git" -exec rm -rf {} + 2>/dev/null
            
            # Remove source files and maps from the package
            find "$TMP_ZIP_DIR" -type f -name "*.ts" -delete 2>/dev/null
            find "$TMP_ZIP_DIR" -type f -name "*.tsx" -delete 2>/dev/null
            find "$TMP_ZIP_DIR" -type f -name "*.js.map" -delete 2>/dev/null
            find "$TMP_ZIP_DIR" -type f -name "tsconfig.json" -delete 2>/dev/null
            rm -rf "$TMP_ZIP_DIR/ui/src" "$TMP_ZIP_DIR/ui/package.json" "$TMP_ZIP_DIR/ui/package-lock.json" 2>/dev/null

            rm -f "$OUTPUT_DIR/$output_name"
            # Final safety: use zip exclusions as well
            (cd "$TMP_ZIP_DIR" && zip -rq "$OUTPUT_DIR/$output_name" . -x "*/node_modules/*" "*/.next/*" "*/.git/*" "*.log" ".DS_Store" "*.ts" "*.tsx" "*.map")
            rm -rf "$TMP_ZIP_DIR"
            
            # Update registry.json with this plugin's metadata
            jq --arg slug "$plugin_slug" \
               --arg name "$name" \
               --arg version "$version" \
               --arg desc "$desc" \
               --arg url "$download_url" \
               --arg cat "$category" \
               --arg auth "$author" \
               --arg home "$homepage" \
               '.plugins += [{slug: $slug, name: $name, version: $version, description: $desc, downloadUrl: $url, category: $cat, author: $auth, homepage: $home}]' \
               "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"

            # If there are capabilities, add them too
            if jq -e '.capabilities' "$manifest_file" > /dev/null; then
                caps=$(jq -c '.capabilities' "$manifest_file")
                jq --arg slug "$plugin_slug" --argjson caps "$caps" \
                   '(.plugins[] | select(.slug == $slug)) += {capabilities: $caps}' \
                   "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
            fi

            # If there are screenshots, add them
            if jq -e '.screenshots' "$manifest_file" > /dev/null; then
                screens=$(jq -c '.screenshots' "$manifest_file")
                jq --arg slug "$plugin_slug" --argjson screens "$screens" \
                   '(.plugins[] | select(.slug == $slug)) += {screenshots: $screens}' \
                   "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
            fi

            # If there is an icon, add it
            if jq -e '.iconUrl' "$manifest_file" > /dev/null; then
                icon=$(jq -r '.iconUrl' "$manifest_file")
                jq --arg slug "$plugin_slug" --arg icon "$icon" \
                   '(.plugins[] | select(.slug == $slug)) += {iconUrl: $icon}' \
                   "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
            fi
            
            # If there is a changelog, add it too
            if jq -e '.changelog' "$manifest_file" > /dev/null; then
                changelog=$(jq -c '.changelog' "$manifest_file")
                jq --arg slug "$plugin_slug" --argjson log "$changelog" \
                   '(.plugins[] | select(.slug == $slug)) += {changelog: $log}' \
                   "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
            fi
            
            printf "$T_PLUGIN_SUCCESS\n" "$output_name"
        else
            printf "$T_PLUGIN_NO_MANIFEST\n" "$plugin_slug"
        fi
    fi
done

# --- PACK THEMES ---
THEMES_OUTPUT_DIR="$REGISTRY_DIR/themes"
mkdir -p "$THEMES_OUTPUT_DIR"

num_themes=$(jq '.themes | length' "$SOURCES_FILE")
for (( i=0; i<$num_themes; i++ )); do
    theme_slug=$(jq -r ".themes[$i].slug" "$SOURCES_FILE")
    theme_url=$(jq -r ".themes[$i].gitUrl" "$SOURCES_FILE")
    theme_branch=$(jq -r ".themes[$i].branch" "$SOURCES_FILE")
    theme_path="$SOURCE_DIR/themes/$theme_slug"

    sync_extension "themes" "$theme_slug" "$theme_url" "$theme_branch"

    if [ -d "$theme_path" ]; then
        manifest_file="$theme_path/theme.json"

        if [ -f "$manifest_file" ]; then
                version=$(jq -r '.version' "$manifest_file")
                name=$(jq -r '.name' "$manifest_file")
                desc=$(jq -r '.description // ""' "$manifest_file")
                author=$(jq -r '.author // ""' "$manifest_file")
                
                output_name="${theme_slug}-${version}.zip"
                download_url="/themes/$output_name"
                
                printf "$T_THEME_BUILDING\n" "$theme_slug" "$version"
                
                # Build the theme UI assets on the fly
                (cd "$theme_path" && node "$CORE_SOURCE_DIR/packages/cli/dist/bin.js" theme build "$theme_slug")
                
                # Create zip, EXCLUDING dev junk
                TMP_ZIP_DIR=$(mktemp -d)
                cp -R "$theme_path/" "$TMP_ZIP_DIR/"
                
                # Clean up before zipping
                find "$TMP_ZIP_DIR" -type d -name "node_modules" -exec rm -rf {} + 2>/dev/null
                find "$TMP_ZIP_DIR" -type d -name ".git" -exec rm -rf {} + 2>/dev/null
                
                # Remove source files and maps from the package
                find "$TMP_ZIP_DIR" -type f -name "*.ts" -delete 2>/dev/null
                find "$TMP_ZIP_DIR" -type f -name "*.tsx" -delete 2>/dev/null
                find "$TMP_ZIP_DIR" -type f -name "*.js.map" -delete 2>/dev/null
                find "$TMP_ZIP_DIR" -type f -name "tsconfig.json" -delete 2>/dev/null
                rm -rf "$TMP_ZIP_DIR/ui/src" "$TMP_ZIP_DIR/ui/package.json" "$TMP_ZIP_DIR/ui/package-lock.json" 2>/dev/null

                rm -f "$THEMES_OUTPUT_DIR/$output_name"
                # Final safety: use zip exclusions as well
                (cd "$TMP_ZIP_DIR" && zip -rq "$THEMES_OUTPUT_DIR/$output_name" . -x "*/node_modules/*" "*/.git/*" "*.log" ".DS_Store" "*.ts" "*.tsx" "*.map")
                rm -rf "$TMP_ZIP_DIR"
                
                # Update registry.json with this theme's metadata
                
                # Update registry.json with this theme's metadata
                jq --arg slug "$theme_slug" \
                   --arg name "$name" \
                   --arg version "$version" \
                   --arg desc "$desc" \
                   --arg url "$download_url" \
                   --arg auth "$author" \
                   '.themes += [{slug: $slug, name: $name, version: $version, description: $desc, downloadUrl: $url, author: $auth}]' \
                   "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
                
                # If there are screenshots, add them
                if jq -e '.screenshots' "$manifest_file" > /dev/null; then
                    screens=$(jq -c '.screenshots' "$manifest_file")
                    jq --arg slug "$theme_slug" --argjson screens "$screens" \
                       '(.themes[] | select(.slug == $slug)) += {screenshots: $screens}' \
                       "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
                fi

                # If there is an icon, add it
                if jq -e '.iconUrl' "$manifest_file" > /dev/null; then
                    icon=$(jq -r '.iconUrl' "$manifest_file")
                    jq --arg slug "$theme_slug" --arg icon "$icon" \
                       '(.themes[] | select(.slug == $slug)) += {iconUrl: $icon}' \
                       "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
                fi

                # If there is a changelog, add it
                if jq -e '.changelog' "$manifest_file" > /dev/null; then
                    log=$(jq -c '.changelog' "$manifest_file")
                    jq --arg slug "$theme_slug" --argjson log "$log" \
                       '(.themes[] | select(.slug == $slug)) += {changelog: $log}' \
                       "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"
                fi

                printf "$T_THEME_SUCCESS\n" "$output_name"
            fi
        fi
    done

# Synchronize the newly generated marketplace.json with the database
echo "Synchronizing with Database..."
# We run this inside the container so it can resolve 'marketplace-db' by name and use the internal network
if docker-compose ps -q marketplace > /dev/null 2>&1; then
    # Upload the fresh registry and sync script to the container to ensure they are up to date
    cat "$REGISTRY_FILE" | docker-compose exec -T marketplace sh -c "cat > marketplace.json"
    cat src/sync-db.ts | docker-compose exec -T marketplace sh -c "cat > src/sync-db.ts"
    
    # Execute the sync script within the container environment
    # This allows using the internal 'marketplace-db' hostname
    docker-compose exec -T marketplace npx tsx src/sync-db.ts
else
    echo "Warning: Marketplace container is not running. Synchronization skipped."
    echo "To sync manually: docker-compose up -d && ./pack-marketplace.sh"
fi

# --- CLEANUP ---
# Remove only the temporary build subdirectories to stay safe
if [ -d "$SOURCE_DIR" ] && [[ "$SOURCE_DIR" == *"marketplace.fromcode.com/Source/source"* ]]; then
    printf "$T_FINAL_CLEANUP\n"
    rm -rf "$SOURCE_DIR/core" "$SOURCE_DIR/plugins" "$SOURCE_DIR/themes"
    rm -rf node_modules/@fromcode
fi

printf "$T_COMPLETE\n"
