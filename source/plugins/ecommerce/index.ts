import Products from './collections/Products';
import Orders from './collections/Orders';
import Transactions from './collections/Transactions';
export interface PluginContext {
  api: any;
  collections: { register: (c: any) => void };
  db: any;
  hooks: any;
  i18n: any;
}
export const onInit = async (context: PluginContext) => {
    context.collections.register(Products);
    context.collections.register(Orders);
    context.collections.register(Transactions);
    context.api.post('/checkout', async (req: any, res: any) => {
        const { items, email } = req.body;
        const total = 0; // Logic for price calculation
        const order = await context.db.insert('orders', { orderNumber: `ORD-${Date.now()}`, customerEmail: email, totalAmount: total, status: 'pending' });
        context.hooks.emit('ecommerce:checkout_created', { order });
        return res.json({ success: true, orderId: order.id });
    });
};
export default { onInit };
