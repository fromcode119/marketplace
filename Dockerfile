FROM node:22-alpine AS framework-builder

# Install build dependencies
RUN apk add --no-cache git python3 make g++

# Allow passing a GitHub Token for private repository access
ARG GITHUB_TOKEN

WORKDIR /framework
# Clone the framework
RUN if [ -z "$GITHUB_TOKEN" ]; then \
      git clone --depth 1 https://github.com/fromcode119/framework . ; \
    else \
      git clone --depth 1 https://$GITHUB_TOKEN@github.com/fromcode119/framework . ; \
    fi

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

# Fix missing dependencies and types in the cloned repo before building
# (These fixes are no longer needed as they are present in the framework repo)

# Move to the root of the cloned framework and build the core packages
RUN npm install --loglevel error
RUN npx tsc -b packages/core packages/api packages/database packages/auth packages/sdk packages/cache packages/email packages/media packages/scheduler packages/marketplace-client

# Pack the built packages into .tgz files
RUN mkdir /framework/dist-packages && \
    for pkg in core api database auth sdk cache email media scheduler marketplace-client; do \
      cd /framework/packages/$pkg && \
      npm pack && \
      mv fromcode-$pkg-*.tgz /framework/dist-packages/; \
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
RUN npm install --no-audit --no-package-lock --loglevel error

RUN npm run build

# --- Runtime ---
FROM node:22-alpine

WORKDIR /app

# Copy built app and required packages (everything is in marketplace/node_modules now)
COPY --from=builder /app/marketplace /app/marketplace

WORKDIR /app/marketplace

EXPOSE 80

CMD ["npm", "start"]
