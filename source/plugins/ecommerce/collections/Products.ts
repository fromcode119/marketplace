const Products = {
  slug: "products",
  name: "Product Catalog",
  admin: { useAsTitle: "name", defaultColumns: ["name", "price", "stock", "status"], group: "E-commerce", icon: "ShoppingBag" },
  fields: [
    { name: "name", type: "text", label: "Product Name", required: true },
    { name: "slug", type: "text", label: "Slug", unique: true, required: true },
    { name: "price", type: "number", label: "Price", required: true },
    { name: "stock", type: "number", label: "Stock", defaultValue: 0 },
    { name: "status", type: "select", label: "Status", defaultValue: "draft", options: [{ label: "Draft", value: "draft" }, { label: "Published", value: "published" }] }
  ]
};
export default Products;
