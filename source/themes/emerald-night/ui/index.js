const { React, Slot } = window.Fromcode;

function EmeraldLayout({ children }) {
    return React.createElement('div', {
        style: {
            minHeight: '100vh',
            backgroundColor: '#022c22',
            color: '#ecfdf5',
            fontFamily: 'system-ui, sans-serif'
        }
    }, [
        React.createElement('nav', {
            key: 'nav',
            style: {
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #065f46',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(6, 78, 59, 0.5)',
                backdropFilter: 'blur(10px)'
            }
        }, [
            React.createElement('div', { key: 'logo', style: { fontWeight: '900', fontSize: '1.5rem', color: '#10b981' } }, 'EMERALD'),
            React.createElement('div', { key: 'slots' }, React.createElement(Slot, { name: 'nav-right' }))
        ]),
        React.createElement('main', { 
            key: 'main',
            style: { padding: '2rem' } 
        }, [
            React.createElement(Slot, { key: 'hero', name: 'hero' }),
            React.createElement('div', { key: 'content-wrapper' }, children)
        ])
    ]);
}

window.Fromcode.registerTheme('emerald-night', {
    layouts: {
        ModernLayout: EmeraldLayout
    }
});
