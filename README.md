# Fromcode Plugin Marketplace

Internal plugins repository for the Fromcode Framework.

## Structure
- `source/`: Contains plugin source code.
- `plugins/`: Contains packaged plugin zips (generated).
- `marketplace.json`: Manifest of all available plugins (generated).

## Development
To add or update a plugin:
1. Edit plugin source in `source/<plugin-slug>`
2. Update `manifest.json`
3. Run `./pack-marketplace.sh` to generate the zips and updated marketplace metadata.

## Deployment
This marketplace is intended to be served by the Marketplace Service Docker container.
