import { AnalyticsDashboard } from './src/AnalyticsDashboard';

export const slots = {
  'admin.plugin.analytics.dashboard': {
    component: AnalyticsDashboard,
    priority: 1
  }
};

if (typeof window !== 'undefined' && (window as any).Fromcode) {
    const fc = (window as any).Fromcode;
    Object.entries(slots).forEach(([name, config]) => {
        if (fc.registerSlotComponent) {
            fc.registerSlotComponent(name, config.component, 'analytics', config.priority);
        }
    });
}
