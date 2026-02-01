import React from 'react';
import { Columns } from 'lucide-react';
import { BlockDefinition } from '../types';

export const TabsBlock: BlockDefinition = {
  id: 'tabs-block',
  name: 'Content Tabs',
  icon: <Columns size={18} />,
  layouts: ['horizontal', 'vertical', 'pills'],
  renderSettings: ({ data, updateData, theme }) => {
    const tabs = data.tabs || [];
    
    const addTab = () => {
      const newTabs = [...tabs, { label: 'New Tab', content: 'Tab content...' }];
      updateData('tabs', newTabs);
    };

    const removeTab = (idx: number) => {
      updateData('tabs', tabs.filter((_: any, i: number) => i !== idx));
    };

    const updateTab = (idx: number, key: string, val: string) => {
      const newTabs = [...tabs];
      newTabs[idx] = { ...newTabs[idx], [key]: val };
      updateData('tabs', newTabs);
    };

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {tabs.map((tab: any, idx: number) => (
            <div key={idx} className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex justify-between mb-4">
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tab #{idx + 1}</span>
                 <button onClick={() => removeTab(idx)} className="text-rose-500">
                    <Columns size={14} className="rotate-45" />
                 </button>
              </div>
              <input 
                value={tab.label}
                onChange={(e) => updateTab(idx, 'label', e.target.value)}
                className={`w-full p-3 rounded-xl border text-[11px] font-bold mb-3 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
                placeholder="Tab Label"
              />
              <textarea 
                value={tab.content}
                onChange={(e) => updateTab(idx, 'content', e.target.value)}
                className={`w-full p-3 rounded-xl border text-[11px] font-bold min-h-[80px] ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
                placeholder="Tab Content"
              />
            </div>
          ))}
        </div>
        <button 
          onClick={addTab}
          className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all"
        >
          Add New Tab
        </button>
      </div>
    );
  }
};
