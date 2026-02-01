const Transactions = {
  slug: "transactions",
  name: "Transactions",
  admin: { useAsTitle: "transactionId", group: "E-commerce", icon: "CreditCard" },
  fields: [
    { name: "transactionId", type: "text", required: true },
    { name: "order", type: "relationship", relationTo: "orders", required: true },
    { name: "amount", type: "number" },
    { name: "provider", type: "select", options: [{ label: "Stripe", value: "stripe" }] },
    { name: "status", type: "select", options: [{ label: "Success", value: "success" }] }
  ]
};
export default Transactions;
