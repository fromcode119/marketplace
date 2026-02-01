import CMSDashboard from './components/CMSDashboard';
import { PagesPage, PostsPage, CategoriesPage, TagsPage } from './components/Pages';
import { BlockEditor } from './components/BlockEditor/BlockEditor';

declare global {
  interface Window {
    Fromcode: {
      registerSlotComponent: (slot: string, component: any) => void;
      registerFieldComponent: (name: string, component: any) => void;
    };
  }
}

if (window.Fromcode) {
  // Register main CMS dashboard
  window.Fromcode.registerSlotComponent('admin.plugin.cms.content', CMSDashboard);
  
  // Register specific pages for the CMS
  window.Fromcode.registerSlotComponent('admin.plugin.cms.page.dashboard', CMSDashboard);
  window.Fromcode.registerSlotComponent('admin.plugin.cms.page.posts', PostsPage);
  window.Fromcode.registerSlotComponent('admin.plugin.cms.page.pages', PagesPage);
  window.Fromcode.registerSlotComponent('admin.plugin.cms.page.categories', CategoriesPage);
  window.Fromcode.registerSlotComponent('admin.plugin.cms.page.tags', TagsPage);

  // Register the Block Editor as a custom field component
  if (window.Fromcode.registerFieldComponent) {
    window.Fromcode.registerFieldComponent('BlockEditor', BlockEditor);
  }
}
