import React, { useState, useEffect } from 'react';
import { ShoppingBag, DollarSign, Package, TrendingUp, ShoppingCart, Loader2, ArrowRight } from 'lucide-react';

const useTranslation = () => {
    if (typeof window !== 'undefined' && (window as any).Fromcode?.useTranslation) {
        return (window as any).Fromcode.useTranslation();
    }
    return { t: (key: string, _params?: any, defaultValue?: string) => defaultValue || key.split('.').pop() || key };
};

export const EcommerceDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/ecommerce/dashboard')
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  const stats = [
    { label: t('ecommerce.stats.revenue', {}, 'Total Revenue'), value: `$${data?.revenue || '0.00'}`, icon: DollarSign, color: 'text-emerald-600' },
    { label: t('ecommerce.stats.orders', {}, 'Total Orders'), value: data?.ordersCount || '0', icon: ShoppingBag, color: 'text-blue-600' },
    { label: t('ecommerce.stats.products', {}, 'Products'), value: data?.productsCount || '0', icon: Package, color: 'text-purple-600' },
    { label: t('ecommerce.stats.conversion', {}, 'Conversion'), value: `${data?.conversionRate || '0.0'}%`, icon: TrendingUp, color: 'text-amber-600' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('ecommerce.title', {}, 'Store Overview')}</h1>
          <p className="text-slate-500">{t('ecommerce.tagline', {}, 'Managed your catalog and sales performance')}</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <ShoppingCart size={18} />
          <span>{t('ecommerce.view_store', {}, 'Go to Storefront')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className={`p-2 w-fit rounded-lg bg-slate-50 ${stat.color} mb-4`}>
              <stat.icon size={24} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-semibold text-slate-900">{t('ecommerce.recent_orders', {}, 'Recent Orders')}</h3>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {(data?.recentOrders || [
              { id: 'ORD-1234', customer: 'John Doe', status: 'Pending', total: '$149.00' },
              { id: 'ORD-1233', customer: 'Jane Smith', status: 'Paid', total: '$89.50' },
              { id: 'ORD-1232', customer: 'Robert Brown', status: 'Shipped', total: '$210.00' }
            ]).map((order: any, i: number) => (
              <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-medium text-slate-900">{order.customer}</div>
                  <div className="text-xs text-slate-500">{order.id}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">{order.total}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${
                    order.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 
                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
           <div className="p-6 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">{t('ecommerce.top_products', {}, 'Best Selling Products')}</h3>
          </div>
          <div className="p-6 space-y-6">
            {(data?.topProducts || [
              { name: 'Developer Pro Bundle', sales: 42, color: 'bg-indigo-500' },
              { name: 'Standard Subscription', sales: 38, color: 'bg-emerald-500' },
              { name: 'Consulting Hour', sales: 12, color: 'bg-amber-500' }
            ]).map((product: any, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-900">{product.name}</span>
                  <span className="text-slate-500">{product.sales} sales</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${product.color}`} style={{ width: `${(product.sales / 50) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
