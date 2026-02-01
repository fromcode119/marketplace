import React from 'react';
import { LayoutGrid, Plus, Trash2 } from 'lucide-react';
import { BlockDefinition } from '../types';
import { MediaInput } from '../../MediaInput';

interface GridItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export const GridBlock: BlockDefinition = {
  id: 'grid-block',
  name: 'Feature Grid',
  icon: <LayoutGrid size={18} />,
  layouts: ['two-columns', 'three-columns', 'four-columns'],
  renderSettings: ({ data, updateData, theme, layout }) => {
    const items = data.items || [];

    const addItem = () => {
      const newItem: GridItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: 'New Feature',
        description: 'Describe your feature here...'
      };
      updateData('items', [...items, newItem]);
    };

    const updateItem = (id: string, field: keyof GridItem, value: string) => {
      updateData('items', items.map((item: GridItem) => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    };

    const removeItem = (id: string) => {
      updateData('items', items.filter((item: GridItem) => item.id !== id));
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {items.map((item: GridItem, index: number) => (
            <div key={item.id} className={`p-4 rounded-2xl border transition-all ${
              theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Item #{index + 1}</span>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              
              <div className="space-y-4">
                <MediaInput 
                  label="Icon / Image"
                  value={item.image || ''}
                  onChange={(val) => updateItem(item.id, 'image', val)}
                  type="image"
                />
                
                <input 
                  type="text"
                  placeholder="Feature Title"
                  value={item.title}
                  onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                  }`}
                />
                
                <textarea 
                  placeholder="Feature Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-[11px] font-medium outline-none min-h-[80px] ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={addItem}
          className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-500 hover:border-indigo-500/50 transition-all font-bold text-xs"
        >
          <Plus size={16} />
          Add Grid Item
        </button>
      </div>
    );
  }
};
