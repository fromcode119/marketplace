import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MousePointer2, Clock, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';

const useTranslation = () => {
    if (typeof window !== 'undefined' && (window as any).Fromcode?.useTranslation) {
        return (window as any).Fromcode.useTranslation();
    }
    return { t: (key: string, _params?: any, defaultValue?: string) => defaultValue || key.split('.').pop() || key };
};

export const AnalyticsDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/analytics/summary')
      .then(res => res.json())
      .then(data => {
        setStats(data);
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

  const cards = [
    { label: t('analytics.stats.visitors', {}, 'Unique Visitors'), value: stats?.visitors || '0', icon: Users, color: 'text-indigo-600', trend: 12 },
    { label: t('analytics.stats.pageviews', {}, 'Page Views'), value: stats?.pageviews || '0', icon: BarChart3, color: 'text-emerald-600', trend: 8 },
    { label: t('analytics.stats.sessions', {}, 'Avg. Session'), value: stats?.avgSession || '0m', icon: Clock, color: 'text-amber-600', trend: -3 },
    { label: t('analytics.stats.clicks', {}, 'Total Clicks'), value: stats?.clicks || '0', icon: MousePointer2, color: 'text-rose-600', trend: 15 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{t('analytics.title', {}, 'Site Intelligence')}</h1>
        <p className="text-slate-500">{t('analytics.tagline', {}, 'Real-time performance and visitor insights')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${card.color}`}>
                <card.icon size={20} />
              </div>
              <div className={`flex items-center text-xs font-medium ${card.trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {card.trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(card.trend)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{card.value}</div>
            <div className="text-sm text-slate-500">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">{t('analytics.top_pages', {}, 'Top Pages')}</h3>
          <div className="space-y-4">
            {(stats?.topPages || ['/', '/products', '/about']).map((page: string, i: number) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-slate-600 truncate max-w-[200px]">{page}</span>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full" style={{ width: `${100 - (i * 20)}%` }} />
                  </div>
                  <span className="text-xs font-medium text-slate-900">{Math.floor(Math.random() * 1000)} visits</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">{t('analytics.source', {}, 'Traffic Sources')}</h3>
          <div className="space-y-4">
            {['Direct', 'Google', 'Newsletter', 'Referral'].map((source, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{source}</span>
                <span className="font-medium text-slate-900">{25 + (i * 10)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
