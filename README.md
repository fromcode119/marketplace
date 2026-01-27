# Fromcode Plugin Registry

Internal plugins repository for the Fromcode Framework.

## Structure
- `source/`: Contains plugin source code.
- `plugins/`: Contains packaged plugin zips (generated).
- `registry.json`: Manifest of all available plugins (generated).

## Development
To add or update a plugin:
1. Edit plugin source in `source/<plugin-slug>`
2. Update `manifest.json`
3. Run `./pack-registry.sh` to generate the zips and updated registry metadata.

## Deployment
This registry is intended to be served by the Registry Service Docker container.
