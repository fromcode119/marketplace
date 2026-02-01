import { FormsDashboard } from './src/FormsDashboard';

export const slots = {
  'admin.plugin.forms.dashboard': {
    component: FormsDashboard,
    priority: 1
  }
};

if (typeof window !== 'undefined' && (window as any).Fromcode) {
    const fc = (window as any).Fromcode;
    Object.entries(slots).forEach(([name, config]) => {
        if (fc.registerSlotComponent) {
            fc.registerSlotComponent(name, config.component, 'forms', config.priority);
        }
    });
}
