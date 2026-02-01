const Forms = {
  slug: "forms",
  name: "Form Architect",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "submissionsCount"],
    group: "Marketing",
    icon: "Layout"
  },
  fields: [
    { name: "title", type: "text", label: "Form Title", required: true },
    { name: "slug", type: "text", label: "System Slug", required: true, unique: true },
    { name: "description", type: "textarea", label: "Internal Description" },
    { name: "fields", type: "json", label: "Form Fields Configuration" },
    { name: "submitLabel", type: "text", label: "Submit Button Text", defaultValue: "Send Message" },
    { name: "successMessage", type: "textarea", label: "Success Message", defaultValue: "Thank you!" },
    { name: "notifications", type: "json", label: "Email Protocol" }
  ]
};
export default Forms;
