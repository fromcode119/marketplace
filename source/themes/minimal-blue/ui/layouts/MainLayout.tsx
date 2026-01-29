import React from 'react';
import { Slot } from '@fromcode/react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fc-theme-minimal-blue">
      <header>
        <div className="fc-container fc-header-inner">
          <div className="fc-logo">
            Minimal <span>Blue</span>
          </div>
          <nav className="fc-nav">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <Slot name="frontend.nav.right" />
          </nav>
        </div>
      </header>
      
      <main>
        <div className="fc-centered-content w-full">
          <Slot name="frontend.home.hero" />
          <div style={{ marginTop: '2rem', width: '100%' }}>
            {children}
          </div>
        </div>
      </main>

      <footer>
        <div className="fc-container">
          &copy; {new Date().getFullYear()} Minimal Blue Theme. Powered by Fromcode.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
