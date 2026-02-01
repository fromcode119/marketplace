import React, { useState, useEffect } from 'react';
import { Columns, Copy, ExternalLink, MoreVertical, Search, Filter, FileText, Tag, Layers, Loader2 } from 'lucide-react';

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

export const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/cms/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('cms.posts.title', {}, 'Blog Posts')}</h1>
          <p className="text-slate-500">{t('cms.posts.description', {}, 'Manage your articles and news')}</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-slate-400" size={32} />
        </div>
      ) : posts.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('cms.table.title', {}, 'Title')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('cms.table.status', {}, 'Status')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('cms.table.date', {}, 'Date')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <FileText size={48} className="mx-auto text-slate-200 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No posts found</h3>
          <p className="text-slate-500">Start by creating your first blog post.</p>
        </div>
      )}
    </div>
  );
};

export const PagesPage: React.FC = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/cms/pages')
      .then(res => res.json())
      .then(data => {
        setPages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('cms.pages.title', {}, 'Pages')}</h1>
          <p className="text-slate-500">{t('cms.pages.description', {}, 'Create and manage your site pages')}</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-slate-400" size={32} />
        </div>
      ) : pages.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('cms.table.title', {}, 'Title')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('cms.table.slug', {}, 'Slug')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('cms.table.updated', {}, 'Last Modified')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pages.map(page => (
                <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{page.title}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">/{page.slug}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{new Date(page.updatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <Layers size={48} className="mx-auto text-slate-200 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No pages found</h3>
          <p className="text-slate-500">Create the structure of your website.</p>
        </div>
      )}
    </div>
  );
};

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/cms/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('cms.categories.title', {}, 'Categories')}</h1>
          <p className="text-slate-500">{t('cms.categories.description', {}, 'Organize your content into topics')}</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="animate-spin text-slate-400" size={32} />
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div key={cat.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Tag size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{cat.name}</h4>
                  <p className="text-xs text-slate-500">{cat.count || 0} posts</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <Tag size={48} className="mx-auto text-slate-200 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No categories found</h3>
          <p className="text-slate-500">Add categories to group your posts.</p>
        </div>
      )}
    </div>
  );
};

export const TagsPage: React.FC = () => {
    const [tags, setTags] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
  
    useEffect(() => {
      fetch('/api/cms/tags')
        .then(res => res.json())
        .then(data => {
          setTags(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);
  
    return (
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t('cms.tags.title', {}, 'Tags')}</h1>
            <p className="text-slate-500">{t('cms.tags.description', {}, 'Manage content labels')}</p>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-slate-400" size={32} />
          </div>
        ) : tags.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <div key={tag.id} className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                <span className="text-slate-400 font-mono">#</span>
                <span className="font-semibold text-slate-900">{tag.name}</span>
                <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{tag.count || 0}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <Tag size={48} className="mx-auto text-slate-200 mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-slate-900">No tags found</h3>
            <p className="text-slate-500">Add tags to further organize your content.</p>
          </div>
        )}
      </div>
    );
  };
