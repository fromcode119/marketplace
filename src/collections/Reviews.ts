import { Collection } from '@fromcode/sdk';

const Reviews: Collection = {
  slug: 'marketplace_reviews',
  admin: {
    useAsTitle: 'rating',
    group: 'Marketplace',
  },
  fields: [
    {
      name: 'plugin',
      type: 'relationship',
      relationTo: 'marketplace_plugins',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'comment',
      type: 'textarea',
    },
    {
      name: 'approved',
      type: 'boolean',
      defaultValue: true, // Auto-approve for now
    }
  ],
};

export default Reviews;
