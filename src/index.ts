import express from 'express';
import { PluginManager, Logger } from '@fromcode/core';
import { AuthManager } from '@fromcode/auth';
import { APIServer } from '@fromcode/api';
import MarketplacePlugins from './collections/marketplace-plugins';
import MarketplaceThemes from './collections/marketplace-themes';
import MarketplaceCore from './collections/marketplace-core';
import MarketplaceSettings from './collections/marketplace-settings';
import Reviews from './collections/reviews';
import { setupMarketplaceRoutes } from './routes/marketplace';
import * as path from 'path';
import * as fs from 'fs';

const logger = new Logger({ namespace: 'MarketplaceHub' });

async function startMarketplaceHub() {
    logger.info('Starting Fromcode Marketplace Hub...');

    // Initialize core components
    const manager = new PluginManager();
    const auth = new AuthManager();
    
    // Register our marketplace-specific collections BEFORE init
    // Since this is a specialized "hub", we register these as 'system' collections 
    // for this instance so the SchemaManager picks them up during init.
    (manager as any).registeredCollections.set(MarketplacePlugins.slug, { 
        collection: MarketplacePlugins, 
        pluginSlug: 'system' 
    });
    (manager as any).registeredCollections.set(MarketplaceThemes.slug, { 
        collection: MarketplaceThemes, 
        pluginSlug: 'system' 
    });
    (manager as any).registeredCollections.set(MarketplaceCore.slug, { 
        collection: MarketplaceCore, 
        pluginSlug: 'system' 
    });
    (manager as any).registeredCollections.set(MarketplaceSettings.slug, { 
        collection: MarketplaceSettings, 
        pluginSlug: 'system' 
    });
    (manager as any).registeredCollections.set(Reviews.slug, { 
        collection: Reviews, 
        pluginSlug: 'system' 
    });
    
    await manager.init();

    // Create the server
    // Note: In a real-world multi-tenant scenario, we might want to isolate this further.
    // For now, it's a specialized instance of the Fromcode framework.
    const server = new APIServer(manager, null as any, auth);
    await server.initialize();

    // Serve static plugin and theme files (ZIPs)
    const publicDir = path.resolve(__dirname, '../');
    server.app.use('/plugins', express.static(path.join(publicDir, 'plugins')));
    server.app.use('/themes', express.static(path.join(publicDir, 'themes')));
    server.app.use('/core', express.static(path.join(publicDir, 'core')));

    // Setup legacy and dynamic registry routes
    const marketplaceRouter = setupMarketplaceRoutes(manager);
    server.app.use('/api/marketplace', marketplaceRouter);
    server.app.use('/', marketplaceRouter);

    // Setup routes
    const port = Number(process.env.MARKETPLACE_PORT || process.env.REGISTRY_PORT) || 4000;
    server.start(port);

    logger.info(`Marketplace Hub is live at http://localhost:${port}`);
    
    // Seed existing data if the collection is empty
    await seedMarketplace(manager);
}

async function seedMarketplace(manager: PluginManager) {
    const db = (manager as any).db;
    const existing = await db.find(MarketplacePlugins.slug, { limit: 1 });
    
    if (existing && existing.length > 0) {
        logger.info('Marketplace already contains data, skipping seed.');
        return;
    }

    const registryPath = path.resolve(__dirname, '../marketplace.json');
    if (!fs.existsSync(registryPath)) {
        logger.warn('marketplace.json not found, skipping initial seed.');
        return;
    }

    try {
        const raw = fs.readFileSync(registryPath, 'utf8');
        const data = JSON.parse(raw);
        
        logger.info(`Seeding ${data.plugins.length} plugins from marketplace.json...`);
        
        // Find or create a default "Fromcode Core" user for these plugins
        const systemUser = await db.findOne('users', { email: 'system@fromcode.com' });
        let userId = systemUser?.id;
        
        if (!userId) {
            // This is a bit recursive since 'users' is a core collection
            // In a real bootstrap, we'd ensure a system user exists
            userId = '0'; // Placeholder for system
        }

        for (const plugin of data.plugins) {
            await db.insert(MarketplacePlugins.slug, {
                name: plugin.name,
                slug: plugin.slug,
                version: plugin.version,
                description: plugin.description,
                publisher: userId,
                category: plugin.category,
                download_url: plugin.downloadUrl,
                icon_url: plugin.iconUrl,
                capabilities: JSON.stringify(plugin.capabilities || []),
                screenshots: JSON.stringify(Array.isArray(plugin.screenshots) 
                    ? plugin.screenshots.map((s: any) => typeof s === 'string' ? { url: s } : s)
                    : []),
                status: 'published'
            });
        }

        if (data.themes) {
            for (const theme of data.themes) {
                await db.insert(MarketplaceThemes.slug, {
                    name: theme.name,
                    slug: theme.slug,
                    version: theme.version,
                    description: theme.description,
                    author: theme.author || 'Fromcode Design Team',
                    download_url: theme.downloadUrl,
                    screenshots: JSON.stringify(Array.isArray(theme.screenshots) 
                        ? theme.screenshots.map((s: any) => typeof s === 'string' ? { url: s } : s)
                        : []),
                    status: 'published'
                });
            }
        }

        if (data.core) {
            await db.insert(MarketplaceCore.slug, {
                version: data.core.version,
                download_url: data.core.downloadUrl,
                release_date: new Date(),
                is_latest: true,
                status: 'published'
            });
        }

        // Initialize default settings
        await db.insert(MarketplaceSettings.slug, {
            marketplace_name: 'Fromcode Marketplace',
            marketplace_version: data.version || '1.2.0',
            download_prefix: '/download',
            theme_download_prefix: '/download-theme',
            core_download_prefix: '/download-core'
        });
        
        logger.info('Seeding completed successfully.');
    } catch (err) {
        logger.error('Failed to seed marketplace data:', err);
    }
}

startMarketplaceHub().catch(err => {
    logger.error('Failed to start Marketplace Hub:', err);
    process.exit(1);
});
