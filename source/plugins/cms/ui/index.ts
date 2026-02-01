import { CMSDashboard } from './src/components/CMSDashboard';
import { PostsPage, PagesPage, CategoriesPage, TagsPage } from './src/components/Pages';
import { BlockEditor } from './src/components/BlockEditor/BlockEditor';
import { CMSContentRenderer } from './src/components/CMSContentRenderer';

export const slots = {
  'admin.plugin.cms.content': {
    component: CMSDashboard,
    priority: 1
  },
  'frontend.content.display': {
    component: CMSContentRenderer,
    priority: 1
  },
  'admin.plugin.cms.page.dashboard': {
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
  },
  'admin.plugin.cms.page.tags': {
    component: TagsPage,
    priority: 1
  }
};

export const init = () => {
  console.log('[cms] Frontend Initialized');
};

// Also support legacy side-effect style
if (typeof window !== 'undefined' && (window as any).Fromcode) {
    const fc = (window as any).Fromcode;
    Object.entries(slots).forEach(([name, config]) => {
        if (fc.registerSlotComponent) {
            fc.registerSlotComponent(name, config.component, 'cms', config.priority);
        }
    });

    if (fc.registerFieldComponent) {
        fc.registerFieldComponent('BlockEditor', BlockEditor);
    }
}
