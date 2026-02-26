import { Collection } from '@fromcode119/sdk';

const MarketplaceSettings: Collection = {
  slug: 'marketplace_settings',
  admin: {
    useAsTitle: 'marketplace_name',
    group: 'marketplace',
  },
  fields: [
    {
        name: 'marketplace_name',
        type: 'text',
        defaultValue: 'Fromcode Marketplace',
    },
    {
      name: 'marketplace_version',
      type: 'text',
      defaultValue: '1.2.0',
    },
    {
      name: 'download_prefix',
      type: 'text',
      defaultValue: '/api/marketplace/download',
    },
    {
      name: 'theme_download_prefix',
      type: 'text',
      defaultValue: '/api/marketplace/download-theme',
    },
    {
        name: 'core_download_prefix',
        type: 'text',
        defaultValue: '/api/marketplace/download-core',
    },
    {
        name: 'publisher_revenue_share',
        type: 'number',
        defaultValue: 0.7,
        admin: {
            description: 'Percentage of revenue (0.0 to 1.0) given to the publisher',
        }
    },
    {
        name: 'trending_threshold',
        type: 'number',
        defaultValue: 50,
        admin: {
            description: 'trendingScore must exceed this value for the "Trending" badge',
        }
    }
  ],
};

export default MarketplaceSettings;
