import { PluginManager } from '@fromcode/core';
import MarketplacePlugins from './collections/marketplace-plugins';
import MarketplaceThemes from './collections/marketplace-themes';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';

async function sync() {
    // Only load .env if variables are missing
    if (!process.env.DATABASE_URL) {
        dotenv.config();
    }

    const manager = new PluginManager();
    
    // Register marketplace collections
    (manager as any).registeredCollections.set(MarketplacePlugins.slug, { 
        collection: MarketplacePlugins, 
        pluginSlug: 'system' 
    });
    (manager as any).registeredCollections.set(MarketplaceThemes.slug, { 
        collection: MarketplaceThemes, 
        pluginSlug: 'system' 
    });

    await manager.init();
    const db = (manager as any).db;

    const registryPath = path.resolve(process.cwd(), 'marketplace.json');
    if (!fs.existsSync(registryPath)) {
        console.error('marketplace.json not found');
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    console.log(`Syncing ${data.plugins.length} plugins and ${data.themes?.length || 0} themes to database...`);

    // 1. Sync Plugins
    for (const plugin of data.plugins) {
        const existing = await db.findOne(MarketplacePlugins.slug, { slug: plugin.slug });
        const updateData = {
            name: plugin.name,
            version: plugin.version,
            description: plugin.description,
            category: plugin.category,
            download_url: plugin.downloadUrl,
            icon_url: plugin.iconUrl,
            capabilities: JSON.stringify(plugin.capabilities || []),
            changelog: JSON.stringify(plugin.changelog || []),
            screenshots: JSON.stringify(Array.isArray(plugin.screenshots) 
                ? plugin.screenshots.map((s: any) => typeof s === 'string' ? { url: s } : s)
                : []),
            status: 'published'
        };

        if (existing) {
            await db.update(MarketplacePlugins.slug, { id: existing.id }, updateData);
            console.log(`Updated plugin: ${plugin.slug}`);
        } else {
            await db.insert(MarketplacePlugins.slug, {
                ...updateData,
                slug: plugin.slug,
                publisher: '0'
            });
            console.log(`Inserted plugin: ${plugin.slug}`);
        }
    }

    // 2. Sync Themes
    if (data.themes) {
        for (const theme of data.themes) {
            const existing = await db.findOne(MarketplaceThemes.slug, { slug: theme.slug });
            const updateData = {
                name: theme.name,
                version: theme.version,
                description: theme.description,
                author: theme.author || 'Fromcode Official',
                download_url: theme.downloadUrl,
                screenshots: JSON.stringify(Array.isArray(theme.screenshots) 
                    ? theme.screenshots.map((s: any) => typeof s === 'string' ? { url: s } : s)
                    : []),
                status: 'published'
            };

            if (existing) {
                await db.update(MarketplaceThemes.slug, { id: existing.id }, updateData);
                console.log(`Updated theme: ${theme.slug}`);
            } else {
                await db.insert(MarketplaceThemes.slug, {
                    ...updateData,
                    slug: theme.slug
                });
                console.log(`Inserted theme: ${theme.slug}`);
            }
        }
    }

    console.log('Database synchronization complete.');
    process.exit(0);
}

sync().catch(err => {
    console.error('Sync failed:', err);
    process.exit(1);
});
