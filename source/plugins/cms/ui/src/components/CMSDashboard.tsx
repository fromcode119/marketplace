import React, { useState, useEffect } from 'react';
import { Layout, FileText, Settings, BarChart3, PlusCircle, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    Fromcode: {
      useTranslation: () => { t: (key: string, params?: any, defaultValue?: string) => string };
    };
  }
}

// Helper to use the host's translation hook if available, otherwise fallback
const useTranslation = () => {
    if (typeof window !== 'undefined' && (window as any).Fromcode?.useTranslation) {
        return (window as any).Fromcode.useTranslation();
    }
    return { t: (key: string, _params?: any, defaultValue?: string) => defaultValue || key.split('.').pop() || key };
};

export const CMSDashboard: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    Promise.all([
      fetch('/api/cms/stats').then(res => res.json()),
      fetch('/api/cms/posts?limit=5').then(res => res.json())
    ]).then(([statsData, postsData]) => {
      setStats([
        { label: t('cms.dashboard.stats.posts', {}, 'Published Posts'), value: statsData.publishedCount || '0', icon: FileText, iconColor: 'text-blue-600', trend: statsData.publishedTrend },
        { label: t('cms.dashboard.stats.pages', {}, 'Active Pages'), value: statsData.pagesCount || '0', icon: Layout, iconColor: 'text-emerald-600', trend: statsData.pagesTrend },
        { label: t('cms.dashboard.stats.views', {}, 'Total Views'), value: statsData.viewsCount || '0', icon: BarChart3, iconColor: 'text-purple-600', trend: statsData.viewsTrend },
      ]);
      setRecentPosts(Array.isArray(postsData) ? postsData : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [t]);

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
          <h1 className="text-2xl font-bold text-slate-900">{t('cms.dashboard.title', {}, 'CMS Overview')}</h1>
          <p className="text-slate-500">{t('cms.dashboard.description', {}, 'Manage your content and track performance')}</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <PlusCircle size={20} />
          <span>{t('cms.dashboard.new_post', {}, 'New Post')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${stat.iconColor}`}>
                <stat.icon size={24} />
              </div>
              {stat.trend && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                  {stat.trend >= 0 ? '+' : ''}{stat.trend}%
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-semibold text-slate-900">{t('cms.dashboard.recent_posts', {}, 'Recent Posts')}</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">{t('cms.dashboard.view_all', {}, 'View All')}</button>
        </div>
        <div className="divide-y divide-slate-100">
          {recentPosts.length > 0 ? recentPosts.map((post, i) => (
            <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{post.title}</div>
                  <div className="text-xs text-slate-500">
                    {post.status} • {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${post.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-700 border-slate-100'}`}>
                {post.status}
              </div>
            </div>
          )) : (
            <div className="p-12 text-center text-slate-500">No recent posts</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CMSDashboard;
