import React from 'react';
import { Slot } from '@fromcode/react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fc-theme-minimal-blue selection:bg-blue-100">
      <header className="sticky top-0 z-50 glass">
        <div className="fc-container fc-header-inner h-20">
          <div className="fc-logo flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg transform rotate-12 flex items-center justify-center text-white">
              <span className="transform -rotate-12 font-black">F</span>
            </div>
            Minimal <span className="text-blue-500">Blue</span>
          </div>
          <nav className="fc-nav items-center">
            <a href="/" className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-all">Home</a>
            <a href="/about" className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-all">About</a>
            <Slot name="frontend.nav.right" />
            <button className="ml-4 px-6 py-2.5 bg-blue-500 text-white rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Get Started
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        <Slot name="frontend.home.hero" />
        <div className="w-full">
          {children}
        </div>
      </main>

      <footer className="bg-slate-50 border-t border-slate-100">
        <div className="fc-container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
            <div className="col-span-2">
              <div className="fc-logo mb-4">Minimal <span>Blue</span></div>
              <p className="text-slate-500 font-medium max-w-sm">A professional, high-performance starting point for your next digital experience built on Fromcode.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Product</h4>
              <ul className="space-y-2 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-blue-500">Features</a></li>
                <li><a href="#" className="hover:text-blue-500">Solutions</a></li>
                <li><a href="#" className="hover:text-blue-500">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Support</h4>
              <ul className="space-y-2 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-blue-500">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-500">API</a></li>
                <li><a href="#" className="hover:text-blue-500">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            <div>&copy; {new Date().getFullYear()} Minimal Blue Theme. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-500">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
