
import { PluginManager } from '@fromcode119/core';
import MarketplacePlugins from './src/collections/MarketplacePlugins';

async function test() {
    const manager = new PluginManager();
    await manager.init();
    const db = (manager as any).db;
    const plugins = await db.find(MarketplacePlugins.slug, {});
    console.log('Plugins in DB:', JSON.stringify(plugins, null, 2));
    process.exit(0);
}

test();
