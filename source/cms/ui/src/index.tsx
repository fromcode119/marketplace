import CMSDashboard from './components/CMSDashboard';
import Pages from './components/Pages';

declare global {
  interface Window {
    Fromcode: {
      registerSlotComponent: (slot: string, component: any) => void;
    };
  }
}

if (window.Fromcode) {
  // Register main CMS dashboard
  window.Fromcode.registerSlotComponent('admin.plugin.cms.content', CMSDashboard);
  
  // Register specific pages for the CMS
  window.Fromcode.registerSlotComponent('admin.plugin.cms.page.posts', CMSDashboard);
  window.Fromcode.registerSlotComponent('admin.plugin.cms.page.pages', Pages);
}
