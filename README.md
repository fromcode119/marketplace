# Fromcode Marketplace Registry

Registry and packaging workspace for Fromcode plugins, themes, and core bundles.

## Structure
- `sources.json`: Source-of-truth list of Git sources (plugins + themes).
- `deploy/gateway/`: Runtime gateway entrypoints used by local and Coolify deploys.
- `scripts/`: Workspace automation and packaging scripts.
- `plugins/`: Built plugin artifacts and extracted package folders (generated).
- `themes/`: Built theme artifacts and extracted package folders (generated).
- `core/`: Built core artifacts (generated).
- `marketplace.json`: Generated public manifest used by the marketplace service.

## Development Flow
1. Update `sources.json` with the source repositories/branches you want to include.
2. Run `npm run pack:marketplace` to fetch/build/package assets.
3. Commit generated metadata changes (including `marketplace.json`) as needed.

## Secret Management

Keep `.env` local-only and derive it from `.env.example`.

Provide `GITHUB_TOKEN`, `POSTGRES_PASSWORD`, `ADMIN_PASS`, and `JWT_SECRET` through your local environment or untracked `.env` file. Do not commit build logs, backup env files, or token-bearing clone URLs.

## Deployment
This repo is intended to be served by the Marketplace Service Docker container.
