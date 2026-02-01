import ModernLayout from './layouts/ModernLayout';

export const init = () => {
  console.log('[emerald-night] Theme Initialized');
  
  // Custom theme logic (e.g., body classes)
  if (typeof document !== 'undefined') {
    document.body.classList.add('emerald-dark-mode');
  }
};

// --- Self-Registration ---
if (typeof window !== 'undefined' && (window as any).Fromcode) {
  const Fromcode = (window as any).Fromcode;
  
  init();

  Fromcode.registerTheme('emerald-night', {
    layouts: {
      ModernLayout
    }
  });
}
