/**
 * CMS Plugin
 * Core content management functionality
 */

import Pages from './collections/Pages';
import Posts from './collections/Posts';
import Categories from './collections/Categories';
import Tags from './collections/Tags';
import Templates from './collections/Templates';

export interface PluginContext {
  api: {
    get: (path: string, ...handlers: any[]) => void;
    post: (path: string, ...handlers: any[]) => void;
    put: (path: string, ...handlers: any[]) => void;
    delete: (path: string, ...handlers: any[]) => void;
  };
  collections: {
    register: (config: any) => void;
  };
  i18n: {
    registerTranslations: (locale: string, translations: any) => void;
  };
}

export const onInit = async (context: PluginContext) => {
  console.log('CMS Plugin Initialized');
  
  // Register Translations
  context.i18n.registerTranslations('en', {
    cms: {
      dashboard: {
        title: 'CMS Overview',
        description: 'Manage your content and track performance',
        new_post: 'New Post',
        recent_posts: 'Recent Posts',
        view_all: 'View All',
        stats: {
          posts: 'Published Posts',
          pages: 'Active Pages',
          views: 'Total Views'
        }
      },
      posts: {
        title: 'Blog Posts',
        description: 'Manage your articles and news'
      },
      pages: {
        title: 'Pages',
        description: 'Create and manage your site pages'
      },
      categories: {
        title: 'Categories',
        description: 'Organize your content into topics'
      },
      table: {
        title: 'Title',
        status: 'Status',
        date: 'Date',
        slug: 'Slug',
        updated: 'Last Modified'
      }
    }
  });
  
  // Register Collections
  context.collections.register(Pages);
  context.collections.register(Posts);
  context.collections.register(Categories);
  context.collections.register(Tags);
  context.collections.register(Templates);
  
  // Register API endpoints
  context.api.get('/status', async (req, res) => {
    return res.json({ status: 'ok', version: '1.3.3' });
  });
};

export const onEnable = async (context: PluginContext) => {
  console.log('CMS Plugin Enabled');
};

const plugin = {
  onInit,
  onEnable
};

export default plugin;
