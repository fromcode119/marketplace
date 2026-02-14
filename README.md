# Fromcode Marketplace Registry

Registry and packaging workspace for Fromcode plugins, themes, and core bundles.

## Structure
- `sources.json`: Source-of-truth list of Git sources (plugins + themes).
- `plugins/`: Built plugin artifacts and extracted package folders (generated).
- `themes/`: Built theme artifacts and extracted package folders (generated).
- `core/`: Built core artifacts (generated).
- `marketplace.json`: Generated public manifest used by the marketplace service.

## Development Flow
1. Update `sources.json` with the source repositories/branches you want to include.
2. Run `./pack-marketplace.sh` to fetch/build/package assets.
3. Commit generated metadata changes (including `marketplace.json`) as needed.

## Deployment
This repo is intended to be served by the Marketplace Service Docker container.
