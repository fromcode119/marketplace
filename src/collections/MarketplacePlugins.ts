import { Collection } from '@fromcode/sdk';

const MarketplacePlugins: Collection = {
  slug: 'marketplace_plugins',
  admin: {
    useAsTitle: 'name',
    group: 'Marketplace',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'version',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'publisher',
      type: 'relationship',
      relationTo: 'users', // Linking to system users
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Business', value: 'business' },
        { label: 'Productivity', value: 'productivity' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Legal', value: 'legal' },
        { label: 'Testing', value: 'testing' }
      ]
    },
    {
      name: 'download_url',
      type: 'text',
      required: true,
    },
    {
      name: 'icon_url',
      type: 'text',
    },
    {
      name: 'screenshots',
      type: 'array',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        }
      ]
    },
    {
      name: 'is_featured',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'is_verified',
      type: 'boolean',
      defaultValue: false,
    },
    {
      name: 'downloads',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'trending_score',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'documentation',
      type: 'code',
      admin: {
        description: 'Markdown documentation for the plugin',
      },
    },
    {
      name: 'stripe_account_id',
      type: 'text',
      admin: {
        description: 'Stripe Connect Account ID for revenue sharing',
      },
    },
    {
      name: 'price',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Published', value: 'published' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Deprecated', value: 'deprecated' }
      ]
    }
  ],
};

export default MarketplacePlugins;
