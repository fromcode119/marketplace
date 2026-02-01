import React from 'react';
import { Slot } from '@fromcode/react';

const ModernLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#022c22',
            color: '#ecfdf5',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <nav style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid #065f46',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(6, 78, 59, 0.5)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div style={{ fontWeight: '900', fontSize: '1.5rem', color: '#10b981', letterSpacing: '0.1em' }}>
                    EMERALD<span style={{ color: '#fff', fontWeight: '300' }}>NIGHT</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Slot name="nav-right" />
                </div>
            </nav>
            <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <Slot name="hero" />
                <div className="layout-content" style={{ marginTop: '2rem' }}>
                    {children}
                </div>
            </main>
            <footer style={{ padding: '4rem 2rem', borderTop: '1px solid #065f46', marginTop: '4rem', textAlign: 'center', color: '#065f46' }}>
                <p>&copy; {new Date().getFullYear()} Emerald Night Theme. Built with Fromcode.</p>
            </footer>
        </div>
    );
};

export default ModernLayout;
