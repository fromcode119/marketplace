import React from 'react';
const { jsx, jsxs } = window.ReactJSXRuntime || { 
  jsx: (type, props) => React.createElement(type, props),
  jsxs: (type, props) => React.createElement(type, props)
};

// Slot component from @fromcode/react is available via window.Fromcode.Slot
const Slot = ({ name }) => {
  const { Slot: SlotComp } = window.Fromcode || {};
  return SlotComp ? jsx(SlotComp, { name }) : null;
};

function ModernLayout({ children }) {
  const React = window.React;
  
  // Inline styles to ensure it looks good even without Tailwind
  const styles = {
    layout: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--theme-font-heading, Inter, -apple-system, sans-serif)',
      backgroundColor: '#f8fafc',
      color: '#0f172a'
    },
    header: {
      height: '80px',
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'between'
    },
    logo: {
      height: '40px',
      width: '40px',
      backgroundColor: 'var(--theme-primary, #6366f1)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '900',
      boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.2)'
    },
    main: {
      flex: 1
    },
    footer: {
      padding: '48px 24px',
      borderTop: '1px solid #e2e8f0',
      marginTop: '80px',
      backgroundColor: '#f8fafc'
    }
  };

  return jsxs("div", { 
    style: styles.layout,
    children: [
      jsxs("header", { 
        key: "header",
        style: styles.header,
        children: [
          jsxs("div", { 
            key: "logo-container",
            style: { display: 'flex', alignItems: 'center', gap: '8px' }, 
            children: [
              jsx("div", { 
                key: "logo-box",
                style: styles.logo,
                children: "M" 
              }),
              jsx("span", { key: "logo-text", style: { fontSize: '20px', fontWeight: '900', letterSpacing: '-0.025em' }, children: "Modern Framework" })
            ] 
          }),
          jsx("div", { key: "slot-header-container", style: { flex: 1, display: 'flex', justifyContent: 'center' }, children: jsx(Slot, { name: "theme.modern.header.after" }) }),
          jsx("button", { 
            key: "cta-button",
            style: { 
              backgroundColor: 'var(--theme-primary, #6366f1)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '9999px',
              border: 'none',
              fontWeight: '700',
              cursor: 'pointer'
            },
            children: "Get Started" 
          })
        ] 
      }),
      jsx("main", { key: "main", style: styles.main, children }),
      jsx(Slot, { key: "footer-slot", name: "theme.modern.footer.before" }),
      jsx("footer", { 
        key: "footer",
        style: styles.footer, 
        children: jsxs("div", { 
          key: "footer-wrapper",
          style: { maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }, 
          children: [
            jsx("p", { key: "copyright", style: { fontSize: '14px', color: '#64748b' }, children: "\u00A9 2026 Fromcode Themes." }),
            jsxs("div", { 
              key: "footer-links",
              style: { display: 'flex', gap: '24px', fontSize: '14px', fontWeight: '700', color: '#475569' }, 
              children: [
                jsx("a", { key: "privacy", href: "#", children: "Privacy" }),
                jsx("a", { key: "terms", href: "#", children: "Terms" })
              ] 
            })
          ] 
        }) 
      })
    ]
  });
}

if (typeof window !== 'undefined' && window.Fromcode) {
  window.Fromcode.registerOverride('frontend.layout.main', {
    component: ModernLayout,
    priority: 10,
    pluginSlug: 'theme-modern-slate'
  });
}
