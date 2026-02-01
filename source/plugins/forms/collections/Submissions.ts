const Submissions = {
  slug: "submissions",
  name: "User Submissions",
  admin: {
    useAsTitle: "formTitle",
    defaultColumns: ["formTitle", "status", "createdAt"],
    group: "Marketing",
    icon: "Inbox"
  },
  fields: [
    { name: "form", type: "relationship", relationTo: "forms", label: "Origin Form", required: true },
    { name: "formTitle", type: "text", label: "Form Name" },
    { name: "data", type: "json", label: "Payload Data" },
    { name: "status", type: "select", label: "Status", defaultValue: "unread", options: [{ label: "Unread", value: "unread" }, { label: "Read", value: "read" }] },
    { name: "ipAddress", type: "text", label: "Origin IP" }
  ]
};
export default Submissions;
