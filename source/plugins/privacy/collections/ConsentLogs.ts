const ConsentLogs = {
  slug: "consent-logs",
  name: "Consent Logs",
  admin: { useAsTitle: "visitorId", group: "Legal", icon: "ShieldCheck" },
  fields: [
    { name: "visitorId", type: "text", required: true },
    { name: "consentType", type: "select", options: [{ label: "Analytics", value: "analytics" }] },
    { name: "granted", type: "boolean", required: true }
  ]
};
export default ConsentLogs;
