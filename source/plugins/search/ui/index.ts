import { SearchStats } from './src/SearchStats';

export const slots = {
  'admin.plugin.search.dashboard': {
    component: SearchStats,
    priority: 1
  }
};

if (typeof window !== 'undefined' && (window as any).Fromcode) {
    const fc = (window as any).Fromcode;
    Object.entries(slots).forEach(([name, config]) => {
        if (fc.registerSlotComponent) {
            fc.registerSlotComponent(name, config.component, 'search', config.priority);
        }
    });
}
