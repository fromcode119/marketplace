import { Collection } from '@fromcode/sdk';

const MarketplaceCore: Collection = {
  slug: 'marketplace_core',
  admin: {
    useAsTitle: 'version',
    group: 'Marketplace',
  },
  fields: [
    {
      name: 'version',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'download_url',
      type: 'text',
      required: true,
    },
    {
      name: 'changelog',
      type: 'textarea',
    },
    {
      name: 'release_date',
      type: 'date',
      required: true,
    },
    {
      name: 'is_latest',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
        { label: 'Deprecated', value: 'deprecated' }
      ]
    }
  ],
};

export default MarketplaceCore;
