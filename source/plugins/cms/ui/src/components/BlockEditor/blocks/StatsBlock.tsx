import React from 'react';
import { BarChart, Plus, Trash2 } from 'lucide-react';
import { BlockDefinition } from '../types';

export const StatsBlock: BlockDefinition = {
  id: 'stats',
  name: 'Stats & Numbers',
  description: 'Display key metrics and achievements',
  icon: <BarChart size={18} />,
  layouts: ['grid', 'inline', 'minimal'],
  renderSettings: ({ data, updateData }) => {
    const items = data.items || [];

    const addItem = () => {
      updateData('items', [...items, { label: 'Active Users', value: '10K+', suffix: '' }]);
    };

    const updateItem = (idx: number, field: string, value: any) => {
      const newItems = [...items];
      newItems[idx] = { ...newItems[idx], [field]: value };
      updateData('items', newItems);
    };

    const removeItem = (idx: number) => {
      const newItems = [...items];
      newItems.splice(idx, 1);
      updateData('items', newItems);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Metrics</label>
          <button 
            onClick={addItem}
            className="flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
          >
            <Plus size={10} /> Add Counter
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-2 group relative">
               <div className="flex gap-2 items-baseline">
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateItem(idx, 'value', e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-2xl font-black text-slate-900 dark:text-white focus:ring-0"
                    placeholder="100"
                  />
                  <input
                    type="text"
                    value={item.suffix}
                    onChange={(e) => updateItem(idx, 'suffix', e.target.value)}
                    className="w-8 bg-transparent border-none p-0 text-sm font-black text-indigo-500 focus:ring-0"
                    placeholder="%"
                  />
               </div>
               <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateItem(idx, 'label', e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-widest text-slate-400 focus:ring-0"
                  placeholder="Metric Label"
                />
                <button onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={12} />
                </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
