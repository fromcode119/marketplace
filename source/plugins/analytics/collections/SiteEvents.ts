const SiteEvents = {
  slug: "site-events",
  name: "System Events",
  admin: {
    useAsTitle: "eventName",
    defaultColumns: ["eventName", "category", "createdAt"],
    group: "Intelligence",
    icon: "Activity"
  },
  fields: [
    { name: "eventName", type: "text", label: "Event Identifier", required: true },
    { name: "category", type: "text", label: "Category" },
    { name: "metadata", type: "json", label: "Payload / Properties" },
    { name: "visitorId", type: "text", label: "Anon Visitor ID" }
  ]
};
export default SiteEvents;
