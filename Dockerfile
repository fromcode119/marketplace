FROM node:22-alpine AS framework-builder

# Install build dependencies
RUN apk add --no-cache git python3 make g++

ARG FRAMEWORK_REPO_URL=https://github.com/fromcode119/framework.git
ARG FRAMEWORK_REF=main
ARG NEXT_PUBLIC_ADMIN_AI_ENABLED=true

WORKDIR /framework
RUN if git ls-remote --exit-code --heads "$FRAMEWORK_REPO_URL" "$FRAMEWORK_REF" >/dev/null 2>&1 || \
      git ls-remote --exit-code --tags "$FRAMEWORK_REPO_URL" "$FRAMEWORK_REF" >/dev/null 2>&1; then \
      git clone --depth 1 --branch "$FRAMEWORK_REF" "$FRAMEWORK_REPO_URL" .; \
    else \
      git clone "$FRAMEWORK_REPO_URL" . && git checkout "$FRAMEWORK_REF"; \
    fi
RUN find /framework -name '*.tsbuildinfo' -delete
ENV NEXT_PUBLIC_ADMIN_AI_ENABLED=${NEXT_PUBLIC_ADMIN_AI_ENABLED}

# Clean any existing npm configs that might have expired tokens
ENV NPM_CONFIG_USERCONFIG=/tmp/.npmrc
ENV NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
RUN rm -rf .npmrc ~/.npmrc /root/.npmrc && \
    npm config delete _auth && \
    npm config delete @fromcode:registry && \
    npm config set registry https://registry.npmjs.org/ && \
    npm config set update-notifier false && \
    npm config set audit false && \
    npm config set fund false

# Move to the root of the cloned framework and build the core packages
RUN npm install --loglevel error
RUN npx tsc -b packages/core packages/api packages/database packages/auth packages/sdk packages/cache packages/email packages/media packages/scheduler packages/marketplace-client packages/mcp packages/plugins packages/ai
RUN npm run build --workspace=@fromcode119/react || true
RUN npm run build --workspace=@fromcode119/frontend || npm run build:frontend || true

# Build admin Next.js here in framework-builder where monorepo siblings (../core/src, ../sdk/src etc.)
# are available for webpack alias resolution. Must use --webpack since Turbopack fails in this context.
ARG NEXT_PUBLIC_ADMIN_BASE_PATH=/admin
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_ADMIN_BASE_PATH=${NEXT_PUBLIC_ADMIN_BASE_PATH}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN cd packages/admin && npx next build --webpack

# Pack the built packages into .tgz files
RUN mkdir /framework/dist-packages && \
    for pkg in core api database auth sdk cache email media scheduler marketplace-client react frontend admin mcp plugins ai next cli; do \
      cd /framework/packages/$pkg && \
      npm pack && \
      mv *.tgz /framework/dist-packages/; \
    done

# Stage 2: Builder
FROM node:22-alpine AS builder

WORKDIR /app
# Copy the packed .tgz files from the framework stage
COPY --from=framework-builder /framework/dist-packages /app/dist-packages

# Copy the marketplace source
COPY . /app/marketplace

WORKDIR /app/marketplace

# Completely clear any npm configuration and force public registry
ENV NPM_CONFIG_USERCONFIG=/tmp/.npmrc
ENV NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
RUN rm -rf .npmrc ~/.npmrc /root/.npmrc && \
    npm config delete _auth && \
    npm config delete @fromcode:registry && \
    npm config set registry https://registry.npmjs.org/ && \
    npm config set update-notifier false && \
    npm config set audit false && \
    npm config set fund false

# Install the packed framework packages and other dependencies
# We use --no-package-lock to avoid stale registry references
RUN npm install /app/dist-packages/*.tgz --no-audit --no-package-lock --loglevel error
RUN npm install http-proxy --save --no-audit --loglevel error
RUN npm install --no-audit --no-package-lock --loglevel error

# Restore workspace config — admin's next.config.js requires('../../config/next-config-env')
# From node_modules/@fromcode119/admin, ../../config = node_modules/config
COPY --from=framework-builder /framework/config /app/marketplace/node_modules/config

# Copy the built .next directory and public assets — npm pack excludes .next because of the root .gitignore
# but next start needs both to serve the admin portal efficiently.
COPY --from=framework-builder /framework/packages/admin/.next /app/marketplace/node_modules/@fromcode119/admin/.next
COPY --from=framework-builder /framework/packages/admin/public /app/marketplace/node_modules/@fromcode119/admin/public

# Configure runtime env values used by the framework API and admin packages.
ARG NEXT_PUBLIC_ADMIN_BASE_PATH=/admin
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ADMIN_AI_ENABLED=true
ENV NEXT_PUBLIC_ADMIN_BASE_PATH=${NEXT_PUBLIC_ADMIN_BASE_PATH}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_ADMIN_AI_ENABLED=${NEXT_PUBLIC_ADMIN_AI_ENABLED}

# --- Runtime ---
FROM node:22-alpine

# git is required at runtime for the auto-builder to clone/pull plugin/theme repos
RUN apk add --no-cache git

# Coolify optimizations
LABEL coolify.managed="true"

WORKDIR /app

# Copy built app and required packages (everything is in marketplace/node_modules now)
COPY --from=builder /app/marketplace /app/marketplace

WORKDIR /app/marketplace

ARG NEXT_PUBLIC_ADMIN_AI_ENABLED=true
ENV NEXT_PUBLIC_ADMIN_AI_ENABLED=${NEXT_PUBLIC_ADMIN_AI_ENABLED}

# Create a dummy packages directory to satisfy the framework's discovery logic
RUN mkdir -p packages

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:4000/api/v1/health || exit 1

EXPOSE 80 4000 3001

CMD ["sh", "-lc", "PORT=${MARKETPLACE_PORT:-4000} node /app/marketplace/node_modules/@fromcode119/api/dist/bin.js & ADMIN_PORT=3001 node /app/marketplace/node_modules/@fromcode119/admin/scripts/admin.js & node deploy/gateway/single-domain-gateway.js"]
