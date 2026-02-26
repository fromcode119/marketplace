import express from 'express';
import { PluginManager } from '@fromcode119/core';
import { MarketplaceController } from '../controllers/marketplace-controller';

export function setupMarketplaceRoutes(manager: PluginManager) {
    const router = express.Router();
    const controller = new MarketplaceController(manager);

    // Dynamic Marketplace Data API
    router.get('/registry.json', controller.getMarketplaceData.bind(controller));
    router.get('/marketplace.json', controller.getMarketplaceData.bind(controller));
    router.post('/sync', controller.sync.bind(controller));
    
    // Developer Portal Submissions
    router.post('/submit', controller.submitPlugin.bind(controller));

    // Stats & Documentation
    router.get('/stats/:publisherId', controller.getStats.bind(controller));
    router.get('/docs/:slug', controller.getDocumentation.bind(controller));

    // Tracking Downloads
    router.get('/download/:slug', controller.downloadPlugin.bind(controller));
    router.get('/download-theme/:slug', controller.downloadTheme.bind(controller));

    return router;
}
