import { Request, Response } from 'express';
import { PluginManager } from '@fromcode/core';
import MarketplacePlugins from '../collections/MarketplacePlugins';
import MarketplaceThemes from '../collections/MarketplaceThemes';
import MarketplaceCore from '../collections/MarketplaceCore';
import MarketplaceSettings from '../collections/MarketplaceSettings';
import Reviews from '../collections/Reviews';

export class MarketplaceController {
    private db: any;

    constructor(private manager: PluginManager) {
        this.db = (manager as any).db;
    }

    /**
     * Generate the marketplace data (formerly registry.json)
     */
    public getMarketplaceData = async (req: Request, res: Response) => {
        try {
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            // Fetch marketplace settings
            const settings = await this.db.findOne(MarketplaceSettings.slug, {});
            const marketplaceVersion = settings?.marketplace_version || "1.2.0";
            const dlPrefix = settings?.download_prefix || "/api/marketplace/download";
            const themeDlPrefix = settings?.theme_download_prefix || "/api/marketplace/download-theme";
            const trendingThreshold = settings?.trending_threshold || 50;

            // Fetch all published plugins
            const plugins = await this.db.find(MarketplacePlugins.slug, {
                where: { status: 'published' }
            });

            // Fetch all published themes
            const marketplaceThemes = await this.db.find(MarketplaceThemes.slug, {
                where: { status: 'published' }
            });

            // Fetch the latest core release
            const coreReleases = await this.db.find(MarketplaceCore.slug, {
                where: { is_latest: true, status: 'published' },
                orderBy: { release_date: 'DESC' },
                limit: 1
            });
            const coreRelease = coreReleases?.[0] || null;

            // Fetch all approved reviews
            const reviews = await this.db.find(Reviews.slug, {
                where: { approved: true }
            });

            // Fetch all publishers (users) mentioned in plugins to avoid N+1 queries later
            const publisherIds = [...new Set(plugins.map((p: any) => p.publisher))].filter(id => id && id !== '0');
            let publishers: any[] = [];
            if (publisherIds.length > 0) {
                // Since our raw find only supports equality, we might need multiple calls or just one if it's a single publisher
                if (publisherIds.length === 1) {
                    const pub = await this.db.findOne('users', { id: publisherIds[0] });
                    if (pub) publishers.push(pub);
                } else {
                    // Fallback: fetch all and filter in memory if there are many publishers
                    // or just use equality for each. Given this is local dev usually one or two.
                    for (const id of publisherIds) {
                        const pub = await this.db.findOne('users', { id });
                        if (pub) publishers.push(pub);
                    }
                }
            }

            // Format for the framework client
            const formattedPlugins = plugins.map((p: any) => {
                const pluginReviews = reviews.filter((r: any) => r.plugin === p.id);
                const avgRating = pluginReviews.length > 0 
                    ? pluginReviews.reduce((acc: number, r: any) => acc + r.rating, 0) / pluginReviews.length 
                    : 0;

                const publisher = publishers.find((u: any) => u.id === p.publisher);

                return {
                    slug: p.slug,
                    name: p.name,
                    version: p.version,
                    description: p.description,
                    downloadUrl: `${baseUrl}${dlPrefix}/${p.slug}`,
                    category: p.category,
                    author: publisher?.name || 'Fromcode Official', 
                    iconUrl: p.icon_url,
                    capabilities: p.capabilities || [],
                    screenshots: p.screenshots || [],
                    isFeatured: p.is_featured,
                    isVerified: p.is_verified,
                    isTrending: (p.trending_score || 0) > trendingThreshold,
                    downloads: p.downloads,
                    rating: {
                        average: parseFloat(avgRating.toFixed(1)),
                        count: pluginReviews.length
                    }
                };
            });

            // Dynamic themes from registry database
            const themes = marketplaceThemes.map((t: any) => ({
                slug: t.slug,
                name: t.name,
                version: t.version,
                description: t.description,
                downloadUrl: `${baseUrl}${themeDlPrefix}/${t.slug}`,
                author: t.author,
                previewUrl: t.preview_url,
                screenshots: t.screenshots || [],
                isFeatured: t.is_featured,
                downloads: t.downloads
            }));

            res.json({
                version: marketplaceVersion,
                lastUpdated: new Date().toISOString(),
                core: {
                    version: coreRelease?.version || "0.1.2",
                    downloadUrl: coreRelease?.download_url || `${baseUrl}${settings?.core_download_prefix || '/api/marketplace/download-core'}/${coreRelease?.version || 'latest'}`
                },
                plugins: formattedPlugins,
                themes: themes
            });
        } catch (err) {
            console.error('[MarketplaceController] Failed to generate marketplace data:', err);
            res.status(500).json({ error: 'Failed to generate marketplace data' });
        }
    };

    /**
     * Handle third-party plugin/theme submissions
     */
    public submitPlugin = async (req: Request, res: Response) => {
        try {
            const { plugin, publisher, type = 'plugin' } = req.body;
            
            if (!plugin || !plugin.slug || !plugin.name) {
                return res.status(400).json({ error: 'Invalid data' });
            }

            const collectionSlug = type === 'theme' ? MarketplaceThemes.slug : MarketplacePlugins.slug;
            const existing = await this.db.findOne(collectionSlug, { slug: plugin.slug });
            
            if (existing) {
                await this.db.update(collectionSlug, { id: existing.id }, {
                    ...plugin,
                    status: 'pending' // Re-review on update
                });
                return res.json({ 
                    message: `${type === 'theme' ? 'Theme' : 'Plugin'} update submitted for review`, 
                    slug: plugin.slug,
                    status: 'pending'
                });
            }

            await this.db.insert(collectionSlug, {
                ...plugin,
                author: type === 'theme' ? (plugin.author || 'Anonymous') : undefined,
                publisher: type === 'plugin' ? (publisher || '0') : undefined,
                status: 'pending'
            });

            res.json({ 
                message: `${type === 'theme' ? 'Theme' : 'Plugin'} submission received for review`, 
                slug: plugin.slug,
                status: 'pending'
            });
        } catch (err) {
            res.status(500).json({ error: 'Submission failed' });
        }
    };

    /**
     * Increment download stats and redirect to the actual file
     */
    public downloadPlugin = async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;
            const plugin = await this.db.findOne(MarketplacePlugins.slug, { slug });
            
            if (!plugin) return res.status(404).json({ error: 'Plugin not found' });

            // Increment download count (simple atomic increment equivalent if possible, otherwise update)
            await this.db.update(MarketplacePlugins.slug, { id: plugin.id }, {
                downloads: (plugin.downloads || 0) + 1
            });

            res.redirect(plugin.download_url);
        } catch (err) {
            res.status(500).json({ error: 'Download tracking failed' });
        }
    };

    public downloadTheme = async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;
            const theme = await this.db.findOne(MarketplaceThemes.slug, { slug });
            
            if (!theme) return res.status(404).json({ error: 'Theme not found' });

            await this.db.update(MarketplaceThemes.slug, { id: theme.id }, {
                downloads: (theme.downloads || 0) + 1
            });

            res.redirect(theme.download_url);
        } catch (err) {
            res.status(500).json({ error: 'Download tracking failed' });
        }
    };

    /**
     * Get analytics stats for a specific publisher's plugins
     */
    public getStats = async (req: Request, res: Response) => {
        try {
            const { publisherId } = req.params;
            const settings = await this.db.findOne(MarketplaceSettings.slug, {});
            const share = settings?.publisher_revenue_share || 0.7;
            
            const plugins = await this.db.find(MarketplacePlugins.slug, {
                where: { publisher: publisherId }
            });

            const stats = plugins.map((p: any) => ({
                slug: p.slug,
                name: p.name,
                downloads: p.downloads || 0,
                revenue: (p.downloads || 0) * (p.price || 0) * share, 
                status: p.status
            }));

            res.json({
                totalDownloads: stats.reduce((acc: number, s: any) => acc + s.downloads, 0),
                totalRevenue: stats.reduce((acc: number, s: any) => acc + s.revenue, 0),
                plugins: stats
            });
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch stats' });
        }
    };

    /**
     * Get documentation for a specific plugin
     */
    public getDocumentation = async (req: Request, res: Response) => {
        try {
            const { slug } = req.params;
            const plugin = await this.db.findOne(MarketplacePlugins.slug, { slug });
            
            if (!plugin) return res.status(404).json({ error: 'Plugin not found' });

            res.json({
                slug: plugin.slug,
                name: plugin.name,
                content: plugin.documentation || `# ${plugin.name}\n\nNo documentation provided yet.`
            });
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch documentation' });
        }
    };
}
