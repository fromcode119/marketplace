const Orders = {
  slug: "orders",
  name: "Orders",
  admin: { useAsTitle: "orderNumber", defaultColumns: ["orderNumber", "customerEmail", "status"], group: "E-commerce", icon: "Truck" },
  fields: [
    { name: "orderNumber", type: "text", required: true },
    { name: "customerEmail", type: "text", required: true },
    { name: "items", type: "json" },
    { name: "totalAmount", type: "number" },
    { name: "status", type: "select", defaultValue: "pending", options: [{ label: "Pending", value: "pending" }, { label: "Processing", value: "processing" }] }
  ]
};
export default Orders;
