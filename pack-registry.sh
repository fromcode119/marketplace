#!/bin/bash
# Framework Registry - Plugin Packaging Script
# Packs all plugins in source/ into plugins/ as .tar.gz files

REGISTRY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SOURCE_DIR="$REGISTRY_DIR/source"
OUTPUT_DIR="$REGISTRY_DIR/plugins"
REGISTRY_FILE="$REGISTRY_DIR/registry.json"

mkdir -p "$OUTPUT_DIR"

# Initialize registry JSON structure
echo '{"version": "1.0.0", "lastUpdated": "", "plugins": [], "themes": []}' > "$REGISTRY_FILE"
# Set current timestamp
last_updated=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
jq --arg date "$last_updated" '.lastUpdated = $date' "$REGISTRY_FILE" > "${REGISTRY_FILE}.tmp" && cat "${REGISTRY_FILE}.tmp" > "$REGISTRY_FILE" && rm "${REGISTRY_FILE}.tmp"

# --- PACK PLUGINS ---
for plugin_path in "$SOURCE_DIR"/*; do
    if [ -d "$plugin_path" ] && [ "$(basename "$plugin_path")" != "themes" ]; then
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
            download_url="./plugins/$output_name"
            
            echo "Packing plugin $plugin_slug v$version from $(basename "$plugin_path")..."
            
            # Create zip
            (cd "$plugin_path" && zip -r "$OUTPUT_DIR/$output_name" .)
            
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
            
            echo "Success: $output_name added to registry."
        else
            echo "Warning: No manifest found for $plugin_slug, skipping."
        fi
    fi
done

# --- PACK THEMES ---
THEMES_SOURCE_DIR="$SOURCE_DIR/themes"
THEMES_OUTPUT_DIR="$REGISTRY_DIR/themes"
mkdir -p "$THEMES_OUTPUT_DIR"

if [ -d "$THEMES_SOURCE_DIR" ]; then
    for theme_path in "$THEMES_SOURCE_DIR"/*; do
        if [ -d "$theme_path" ]; then
            theme_slug=$(basename "$theme_path")
            manifest_file="$theme_path/theme.json"

            if [ -f "$manifest_file" ]; then
                version=$(jq -r '.version' "$manifest_file")
                name=$(jq -r '.name' "$manifest_file")
                desc=$(jq -r '.description // ""' "$manifest_file")
                author=$(jq -r '.author // ""' "$manifest_file")
                
                output_name="${theme_slug}-${version}.zip"
                download_url="./themes/$output_name"
                
                echo "Packing theme $theme_slug v$version..."
                
                # Create zip
                (cd "$theme_path" && zip -r "$THEMES_OUTPUT_DIR/$output_name" .)
                
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

                echo "Success: $output_name added to registry."
            fi
        fi
    done
fi

echo "Registry packing and metadata update complete."
