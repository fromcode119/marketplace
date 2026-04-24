# Fromcode Marketplace

Custom marketplace hub for publishing, packaging, and serving Fromcode plugins, themes, and core releases.

This repository is not just a static registry. It runs a full marketplace stack:

- Marketplace API
- Marketplace admin
- Single-domain gateway
- Build and packaging workspace for plugins and themes
- Public catalog feed consumed by framework installations

The marketplace app builds against the public `fromcode119/framework` repository by default and serves everything behind a single local URL:

- `http://marketplace.framework.local`

## Getting Started Fast

```bash
git clone https://github.com/fromcode119/marketplace.git
cd marketplace
cp .env.example .env
docker compose up -d --build
```

## What This Repo Owns

- Public marketplace catalog via `marketplace.json`
- Marketplace API and admin UI
- Plugin/theme build orchestration
- Generated plugin and theme archives
- Runtime storage for marketplace metadata and build cache

## Key Capabilities

- Private marketplace hosting for Fromcode plugins and themes
- Single-domain admin and public catalog at `marketplace.framework.local`
- Build server flow for cloning, packaging, and publishing plugin releases
- Download endpoints for plugins, themes, and future core releases
- Public catalog feed for framework installations
- Docker-based local and server deployment

## Quick Start

### Prerequisites

- Node.js 22+
- npm 10+
- Docker + Docker Compose
- A local reverse proxy network named `proxy` if you want the `marketplace.framework.local` hostname to resolve through Traefik

---

<details open>
<summary><b>Option 1: Docker Compose</b> — Recommended local workflow</summary>

### 1. Configure environment

```bash
cp .env.example .env
```

At minimum, set:

- `JWT_SECRET`

Optional but useful:

- `GITHUB_TOKEN` for private plugin/theme source clones at runtime
- `FRAMEWORK_REF` if you want to build against a tag or commit instead of `main`

The first marketplace admin user is created through the setup flow on first run. `ADMIN_USER` and `ADMIN_PASS` are not required runtime variables for this repository.

### 2. Start the marketplace stack

```bash
docker compose up -d --build
```

### 3. Open the local surfaces

| Surface | URL |
|--------|-----|
| Public marketplace | `http://marketplace.framework.local` |
| Admin | `http://marketplace.framework.local/admin` |
| Public catalog JSON | `http://marketplace.framework.local/marketplace.json` |

### 4. Useful commands

```bash
docker compose logs -f api
docker compose logs -f admin
docker compose logs -f gateway

docker compose down
docker compose down -v
```

</details>

---

<details>
<summary><b>Option 2: Local package/build workflow</b> — For maintaining marketplace artifacts</summary>

This repo still supports the packaging workflow directly from source metadata.

### Source registry

- `sources.json` is the source-of-truth list of plugin and theme repositories to include

### Build marketplace artifacts

```bash
npm install
npm run pack:marketplace
```

This workflow updates generated marketplace assets such as:

- `marketplace.json`
- packaged plugin archives under `plugins/`
- packaged theme archives under `themes/`
- generated build output under `dist/`

</details>

---

<details>
<summary><b>Option 3: Server deployment</b> — Self-hosted Docker runtime</summary>

This repository is designed to run as its own Docker Compose application.

### Core services

| Service | Purpose |
|--------|---------|
| `gateway` | Single-domain entrypoint for public site and admin |
| `api` | Marketplace API and plugin runtime |
| `admin` | Marketplace admin UI |

### Notes

- The compose file expects an external Docker network named `proxy`
- Traefik routing is configured for `marketplace.framework.local`
- The stack uses the public framework repository as a build source by default:
  - `FRAMEWORK_REPO_URL=https://github.com/fromcode119/framework.git`
  - `FRAMEWORK_REF=main`

If you want reproducible builds, pin `FRAMEWORK_REF` to a tag or commit instead of leaving it on `main`.

</details>

---

<details>
<summary><b>Option 4: Coolify</b> — Recommended self-hosted production flow</summary>

This repo includes a dedicated Coolify compose file:

- `deploy/docker-compose.full-stack.yml`

### 1. Create the Coolify resource

1. In Coolify, create a new **Docker Compose** resource from the public repository `https://github.com/fromcode119/marketplace`
2. Set **Docker Compose Location** to `deploy/docker-compose.full-stack.yml`
3. Configure your domain to point at the Coolify proxy

### 2. Set the required environment variables

At minimum, set:

- `MARKETPLACE_URL`
- `MARKETPLACE_ADMIN_URL`
- `JWT_SECRET`

Recommended:

- `EXTERNAL_PROXY_NETWORK`
- `CORS_ALLOWED_DOMAINS`
- `FRAMEWORK_REF`
- `NEXT_PUBLIC_ADMIN_AI_ENABLED=false`

Optional:

- `GITHUB_TOKEN`
- `AUTO_BUILD_INTERVAL_MINUTES`

### 3. Proxy network notes

The Coolify compose file joins the external proxy network with:

```env
EXTERNAL_PROXY_NETWORK=${COOLIFY proxy network name}
```

If `EXTERNAL_PROXY_NETWORK` is wrong, the containers may start but Coolify routing will not attach correctly.

### 4. Typical production values

```env
MARKETPLACE_URL=https://marketplace.fromcode.com
MARKETPLACE_ADMIN_URL=https://marketplace.fromcode.com/admin
CORS_ALLOWED_DOMAINS=marketplace.fromcode.com
NEXT_PUBLIC_ADMIN_AI_ENABLED=false
FRAMEWORK_REPO_URL=https://github.com/fromcode119/framework.git
FRAMEWORK_REF=main
```

### 5. What Coolify runs

| Service | Purpose |
|--------|---------|
| `gateway` | Public site and `/admin` entrypoint |
| `api` | Marketplace API, registry routes, downloads, build-server runtime |
| `admin` | Marketplace admin UI |

### 6. Deploy

After the environment is configured, deploy from Coolify. The stack will build the marketplace image, pull the configured framework ref during Docker build, and serve the marketplace behind the single-domain gateway.

</details>

## Repository Structure

- `sources.json`
  Source list for plugin and theme repositories.
- `marketplace.json`
  Public marketplace feed consumed by framework installations.
- `plugins/`
  Packaged plugin outputs and plugin runtime code mounted into the marketplace API.
- `themes/`
  Packaged theme outputs.
- `core/`
  Core release artifacts.
- `deploy/gateway/`
  Gateway entrypoints for single-domain routing.
- `dist/`
  Generated build output.
- `uploads/`
  Runtime uploads.

## Environment Variables

Key values from `.env.example`:

- `NODE_ENV`
- `MARKETPLACE_PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `MARKETPLACE_URL`
- `MARKETPLACE_ADMIN_URL`
- `CORS_ALLOWED_DOMAINS`
- `NEXT_PUBLIC_ADMIN_AI_ENABLED`
- `FRAMEWORK_REPO_URL`
- `FRAMEWORK_REF`
- `EXTERNAL_PROXY_NETWORK`
- `AUTO_BUILD_INTERVAL_MINUTES`
- `GITHUB_TOKEN`

For SQLite, use a URL-style path such as `file:./data/marketplace.db` locally or `file:/app/marketplace/data/marketplace.db` in containers.

## Integration With Framework

Framework installations should point their marketplace client to the public marketplace URL, not to an internal admin endpoint.

Typical local value:

```env
MARKETPLACE_URL=http://marketplace.framework.local
```

The framework then reads plugin and theme data from:

- `http://marketplace.framework.local/marketplace.json`

## Security Notes

- Keep `.env` untracked and local-only
- Do not commit tokens or token-bearing clone URLs
- `GITHUB_TOKEN` is optional and only needed for private runtime clones
- Use a strong `JWT_SECRET`
- The first admin account is created from the setup screen, not from `ADMIN_USER` / `ADMIN_PASS`
- Treat generated archives and build outputs as deploy artifacts, not secrets

## Current Architecture Notes

- The marketplace admin is mounted under `/admin`
- The stack currently assumes an HTTP local development setup
- The runtime pulls framework packages from the configured framework Git repository during Docker build

## License

See the repository license terms in GitHub for `fromcode119/marketplace`.
