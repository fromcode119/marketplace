import React from 'react';
import { Layout, FileText, Settings, BarChart3, PlusCircle } from 'lucide-react';

const CMSDashboard: React.FC = () => {
  const stats = [
    { label: 'Published Posts', value: '124', icon: FileText, color: 'text-blue-600' },
    { label: 'Active Pages', value: '42', icon: Layout, iconColor: 'text-emerald-600' },
    { label: 'Total Views', value: '12.5k', icon: BarChart3, iconColor: 'text-purple-600' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">CMS Overview</h1>
          <p className="text-slate-500">Manage your content and track performance</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <PlusCircle size={20} />
          <span>New Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${stat.iconColor}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-semibold text-slate-900">Recent Posts</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Advanced TypeScript Patterns in 2026</div>
                  <div className="text-xs text-slate-500">Published Jan 28, 2026 • 5 min read</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                Published
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CMSDashboard;
