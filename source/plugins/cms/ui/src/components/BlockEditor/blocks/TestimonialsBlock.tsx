import React from 'react';
import { Quote, Plus, Star, Trash2 } from 'lucide-react';
import { BlockDefinition } from '../types';
import { MediaInput } from '../../MediaInput';

export const TestimonialsBlock: BlockDefinition = {
  id: 'testimonials',
  name: 'Testimonials',
  description: 'Customer reviews and success stories',
  icon: <Quote size={18} />,
  layouts: ['cards', 'single', 'carousel'],
  renderSettings: ({ data, updateData }) => {
    const items = data.items || [];

    const addItem = () => {
      updateData('items', [...items, { 
        content: 'Life-changing product! Best decision we made this year.', 
        author: 'Jane Smith',
        role: 'Marketing Director',
        rating: 5,
        avatar: ''
      }]);
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
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Customer Stories</label>
          <button 
            onClick={addItem}
            className="flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
          >
            <Plus size={10} /> Add Testimonial
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-transparent hover:border-indigo-500/30 transition-all group">
               <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 shrink-0">
                    <MediaInput 
                      value={item.avatar}
                      onChange={(val) => updateItem(idx, 'avatar', val)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.author}
                      onChange={(e) => updateItem(idx, 'author', e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-sm font-black text-slate-900 dark:text-white focus:ring-0"
                      placeholder="Author Name"
                    />
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => updateItem(idx, 'role', e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-widest text-slate-400 focus:ring-0"
                      placeholder="Role / Company"
                    />
                  </div>
                  <button onClick={() => removeItem(idx)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={14} />
                  </button>
               </div>

               <textarea
                  value={item.content}
                  onChange={(e) => updateItem(idx, 'content', e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-xs font-medium text-slate-500 dark:text-slate-400 focus:ring-0 italic"
                  rows={3}
                  placeholder="The testimonial text..."
                />

                <div className="mt-4 flex gap-1">
                   {[1,2,3,4,5].map(star => (
                     <button 
                       key={star}
                       onClick={() => updateItem(idx, 'rating', star)}
                       className={`transition-colors ${star <= (item.rating || 0) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
                     >
                       <Star size={12} fill="currentColor" />
                     </button>
                   ))}
                </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
