import React from 'react';
import { CircleHelp, Plus, Minus, Trash2 } from 'lucide-react';
import { BlockDefinition } from '../types';

export const FAQBlock: BlockDefinition = {
  id: 'faq',
  name: 'Frequently Asked Questions',
  description: 'Accordion style questions and answers grid',
  icon: <CircleHelp size={18} />,
  layouts: ['simple', 'grid', 'vertical'],
  renderSettings: ({ data, updateData }) => {
    const items = data.items || [];

    const addItem = () => {
      updateData('items', [...items, { question: 'New Question', answer: 'Answer goes here...' }]);
    };

    const removeItem = (index: number) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      updateData('items', newItems);
    };

    const updateItem = (index: number, field: string, value: string) => {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], [field]: value };
      updateData('items', newItems);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Section Title</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => updateData('title', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold"
            placeholder="Frequently Asked Questions"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Questions</label>
            <button 
              onClick={addItem}
              className="flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
            >
              <Plus size={10} /> Add Question
            </button>
          </div>
          
          <div className="space-y-2">
            {items.map((item: any, idx: number) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-indigo-500/30 transition-all group">
                <div className="flex justify-between gap-4 mb-2">
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => updateItem(idx, 'question', e.target.value)}
                    className="flex-1 bg-transparent border-none p-0 text-sm font-black text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0"
                    placeholder="Question text..."
                  />
                  <button onClick={() => removeItem(idx)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
                <textarea
                  value={item.answer}
                  onChange={(e) => updateItem(idx, 'answer', e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-xs font-medium text-slate-500 focus:ring-0 resize-none"
                  rows={2}
                  placeholder="Answer text..."
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};
