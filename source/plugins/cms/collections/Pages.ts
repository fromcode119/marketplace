const Pages = {
  shortSlug: "pages",
  slug: "cms-pages",
  type: "collection",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "slug", "status", "updatedAt"]
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Page Title"
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Permalink"
    },
    {
      name: "customPermalink",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
        description: "Override the global permalink structure for this specific entry."
      }
    },
    {
      name: "content",
      type: "json",
      label: "Content Blocks",
      admin: {
        component: "BlockEditor",
        description: "Build your page layout using modular blocks."
      }
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" }
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar"
      }
    },
    {
      name: "themeLayout",
      type: "ui",
      label: "Theme Layout",
      admin: {
        position: "sidebar",
        component: "ThemeLayoutSelect"
      }
    }
  ]
};

export default Pages;
