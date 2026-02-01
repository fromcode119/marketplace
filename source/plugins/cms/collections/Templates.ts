const Templates = {
  shortSlug: "templates",
  slug: "cms-templates",
  type: "collection",
  admin: {
    useAsTitle: "title",
    group: "Design",
    defaultColumns: ["title", "category", "updatedAt"]
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Template Name"
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Hero Sections", value: "hero" },
        { label: "Content Sections", value: "content" },
        { label: "Features", value: "features" },
        { label: "Pricing", value: "pricing" },
        { label: "Team", value: "team" },
        { label: "Contact", value: "contact" },
        { label: "Global Sections", value: "global" }
      ],
      defaultValue: "content",
      admin: {
        position: "sidebar"
      }
    },
    {
      name: "blockData",
      type: "json",
      label: "Block Data",
      required: true
    },
    {
      name: "previewImage",
      type: "upload",
      relationTo: "media",
      label: "Preview Thumbnail"
    }
  ]
};

export default Templates;
