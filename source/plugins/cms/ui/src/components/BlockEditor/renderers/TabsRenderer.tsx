import React, { useState } from 'react';

export const TabsRenderer: React.FC<{ data: any; layout: string }> = ({ data, layout }) => {
  const tabs = data.tabs || [];
  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) return null;

  const isVertical = layout === 'vertical';
  const isPills = layout === 'pills';

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <div className={`flex ${isVertical ? 'flex-col md:flex-row gap-12' : 'flex-col gap-8'}`}>
        {/* Tab Headers */}
        <div className={`flex ${
          isVertical ? 'md:flex-col md:w-64 shrink-0' : 
          isPills ? 'flex-wrap gap-2 justify-center' : 
          'border-b border-slate-100 dark:border-slate-800'
        }`}>
          {tabs.map((tab: any, idx: number) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`py-4 px-6 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                  isPills ? `rounded-xl ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}` :
                  isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
                {!isPills && !isVertical && isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />
                )}
                {!isPills && isVertical && isActive && (
                  <div className="absolute right-0 top-2 bottom-2 w-1 bg-indigo-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-[300px]">
          {tabs.map((tab: any, idx: number) => (
            <div 
              key={idx} 
              className={`animate-in fade-in slide-in-from-bottom-2 duration-500 ${activeTab === idx ? 'block' : 'hidden'}`}
            >
              <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[32px] border border-slate-100 dark:border-slate-800 min-h-[300px]">
                <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 uppercase">
                  {tab.label}
                </h3>
                <div className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                  {tab.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
