export const Posts = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'The URL-friendly slug used for the permalink.',
      }
    },
    {
      name: 'customPermalink',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Override the global permalink structure for this specific entry.'
      }
    },
    {
      name: 'content',
      type: 'json',
      label: 'Content Blocks',
      admin: {
        component: 'BlockEditor',
        description: 'Build your post using modular content blocks.'
      }
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Author',
      admin: {
        position: 'sidebar',
        component: 'TagField',
        sourceCollection: 'users',
        sourceField: 'username',
        description: 'Search for a system user or type a custom guest name.'
      },
      hasMany: false
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        component: 'TagField',
        sourceCollection: 'categories',
        sourceField: 'slug',
        position: 'sidebar'
      }
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        component: 'TagField',
        sourceCollection: 'tags',
        sourceField: 'slug',
        position: 'sidebar'
      }
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar'
      }
    }
  ],
};

export default Posts;
