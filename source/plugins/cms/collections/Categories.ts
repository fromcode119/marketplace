export const Categories = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
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
      name: 'customPermalink',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Override the global permalink structure for this category.'
      }
    }
  ],
};

export default Categories;
