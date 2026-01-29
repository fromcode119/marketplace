import MainLayout from './layouts/MainLayout';

export const init = () => {
  console.log('[minimal-blue] Theme UI Initialized');
  
  // Custom theme logic here
  document.body.classList.add('theme-minimal-blue');
};

// --- Self-Registration ---
if (typeof window !== 'undefined' && (window as any).Fromcode) {
  const Fromcode = (window as any).Fromcode;
  
  // Custom theme scripts can interact with Fromcode bridge here
  init();

  Fromcode.registerTheme('minimal-blue', {
    layouts: {
      MainLayout
    }
  });
}
