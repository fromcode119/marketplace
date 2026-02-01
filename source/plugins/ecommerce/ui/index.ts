import { EcommerceDashboard } from './src/EcommerceDashboard';

export const slots = {
  'admin.plugin.ecommerce.dashboard': {
    component: EcommerceDashboard,
    priority: 1
  }
};

if (typeof window !== 'undefined' && (window as any).Fromcode) {
    const fc = (window as any).Fromcode;
    Object.entries(slots).forEach(([name, config]) => {
        if (fc.registerSlotComponent) {
            fc.registerSlotComponent(name, config.component, 'ecommerce', config.priority);
        }
    });
}
