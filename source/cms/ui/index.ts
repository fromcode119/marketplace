import { CMSDashboard } from './src/components/CMSDashboard';
import { PostsPage, PagesPage, CategoriesPage } from './src/components/Pages';

export const slots = {
  'admin.plugin.cms.content': {
    component: CMSDashboard,
    priority: 1
  },
  'admin.plugin.cms.page.posts': {
    component: PostsPage,
    priority: 1
  },
  'admin.plugin.cms.page.pages': {
    component: PagesPage,
    priority: 1
  },
  'admin.plugin.cms.page.categories': {
    component: CategoriesPage,
    priority: 1
  }
};

export const init = () => {
  console.log('[cms] Frontend Initialized');
};
