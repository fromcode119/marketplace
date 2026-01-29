import React from 'react';
import { Columns, Copy, ExternalLink, MoreVertical, Search, Filter } from 'lucide-react';

const Pages: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pages</h1>
          <p className="text-slate-500">Create and manage your site pages</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search pages..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter size={18} className="text-slate-600" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Page Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Template</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { title: 'Home Page', slug: '/', template: 'homepage', status: 'live' },
              { title: 'About Us', slug: '/about', template: 'generic', status: 'live' },
              { title: 'Contact', slug: '/contact', template: 'contact', status: 'draft' },
            ].map((page, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{page.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-400 font-mono">{page.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    <Columns size={12} />
                    {page.template}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    page.status === 'live' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-400">
                    <button className="p-1 hover:text-indigo-600 transition-colors"><ExternalLink size={18} /></button>
                    <button className="p-1 hover:text-indigo-600 transition-colors"><Copy size={18} /></button>
                    <button className="p-1 hover:text-slate-600 transition-colors"><MoreVertical size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pages;
