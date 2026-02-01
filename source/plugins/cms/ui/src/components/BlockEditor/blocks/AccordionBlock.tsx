import React from 'react';
import { ChevronDown } from 'lucide-react';
import { BlockDefinition } from '../types';

export const AccordionBlock: BlockDefinition = {
  id: 'accordion-block',
  name: 'Accordion',
  icon: <ChevronDown size={18} />,
  layouts: ['clean', 'separated', 'bordered'],
  renderSettings: ({ data, updateData, theme }) => {
    const items = data.items || [];
    
    const addItem = () => {
      const newItems = [...items, { title: 'New Item', content: 'Item content goes here...' }];
      updateData('items', newItems);
    };

    const removeItem = (idx: number) => {
      updateData('items', items.filter((_: any, i: number) => i !== idx));
    };

    const updateItem = (idx: number, key: string, val: string) => {
      const newItems = [...items];
      newItems[idx] = { ...newItems[idx], [key]: val };
      updateData('items', newItems);
    };

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {items.map((item: any, idx: number) => (
            <div key={idx} className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex justify-between mb-4">
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Item #{idx + 1}</span>
                 <button onClick={() => removeItem(idx)} className="text-rose-500 hover:text-rose-600 transition-colors">
                    <ChevronDown size={14} className="rotate-45" />
                 </button>
              </div>
              <input 
                value={item.title}
                onChange={(e) => updateItem(idx, 'title', e.target.value)}
                className={`w-full p-3 rounded-xl border text-[11px] font-bold mb-3 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
                placeholder="Item Title"
              />
              <textarea 
                value={item.content}
                onChange={(e) => updateItem(idx, 'content', e.target.value)}
                className={`w-full p-3 rounded-xl border text-[11px] font-bold min-h-[80px] ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
                placeholder="Item Content"
              />
            </div>
          ))}
        </div>
        <button 
          onClick={addItem}
          className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all"
        >
          Add Accordion Item
        </button>
      </div>
    );
  }
};
