import { PrivacyDashboard } from './src/PrivacyDashboard';

export const slots = {
  'admin.plugin.privacy.dashboard': {
    component: PrivacyDashboard,
    priority: 1
  }
};

if (typeof window !== 'undefined' && (window as any).Fromcode) {
    const fc = (window as any).Fromcode;
    Object.entries(slots).forEach(([name, config]) => {
        if (fc.registerSlotComponent) {
            fc.registerSlotComponent(name, config.component, 'privacy', config.priority);
        }
    });
}
