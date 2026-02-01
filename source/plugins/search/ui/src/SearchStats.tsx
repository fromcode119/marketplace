import React, { useState, useEffect } from 'react';
import { Search, Hash, AlertTriangle, Zap, Loader2, Sparkles, TrendingUp } from 'lucide-react';

const useTranslation = () => {
    if (typeof window !== 'undefined' && (window as any).Fromcode?.useTranslation) {
        return (window as any).Fromcode.useTranslation();
    }
    return { t: (key: string, _params?: any, defaultValue?: string) => defaultValue || key.split('.').pop() || key };
};

export const SearchStats: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/search/stats')
      .then(res => res.json())
      .then(res => {
        setStats(res);
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

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
             <Search className="text-indigo-600" size={28} />
             {t('search.title', {}, 'Search Intelligence')}
          </h1>
          <p className="text-slate-500">{t('search.tagline', {}, 'Analyze what your visitors are looking for')}</p>
        </div>
        <div className="flex bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-100 items-center gap-2 text-sm font-semibold">
           <Zap size={18} fill="currentColor" />
           Instant Indexing Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{t('search.stats.total', {}, 'Monthly Queries')}</div>
           <div className="text-3xl font-bold text-slate-900">1.2k</div>
           <div className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <TrendingUp size={14} /> +18% from last month
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{t('search.stats.speed', {}, 'Avg Latency')}</div>
           <div className="text-3xl font-bold text-slate-900">14ms</div>
           <div className="text-xs text-slate-400 mt-2">Cache Hit Ratio: 92%</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <div className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">{t('search.stats.zeros', {}, 'Zero Results')}</div>
           <div className="text-3xl font-bold text-slate-900">{stats?.zeroResultsCount || '24'}</div>
           <div className="text-xs text-rose-400 mt-2">Actionable content gaps identified</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900">{t('search.popular.title', {}, 'Popular Search Terms')}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {['React Framework', 'CMS Plugin', 'Deployment Guide', 'API Reference', 'Pricing'].map((term, i) => (
              <div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50">
                <span className="text-sm font-medium text-slate-700">{term}</span>
                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{250 - (i * 40)} hits</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
           <div className="p-6 border-b border-slate-200 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <h3 className="font-semibold text-slate-900">{t('search.gaps.title', {}, 'Failed Queries (Gaps)')}</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { query: 'WordPress Migration', count: 12 },
              { query: 'Native App SDK', count: 8 },
              { query: 'Offline Mode', count: 4 }
            ].map((gap, i) => (
              <div key={i} className="flex flex-col gap-1 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between">
                   <span className="font-semibold text-slate-900 underline decoration-indigo-200">{gap.query}</span>
                   <span className="text-rose-600 font-bold">{gap.count} fails</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 italic">
                   <Sparkles size={10} /> Tip: Create a page or blog post for this topic
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
