import { Collection } from '@fromcode/sdk';

const MarketplaceThemes: Collection = {
  slug: 'marketplace_themes',
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
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'download_url',
      type: 'text',
      required: true,
    },
    {
      name: 'preview_url',
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
      name: 'downloads',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'stripe_account_id',
      type: 'text',
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

export default MarketplaceThemes;
