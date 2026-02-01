import React from 'react';
import { FileText } from 'lucide-react';
import { BlockDefinition } from '../types';

export const TextBlock: BlockDefinition = {
  id: 'text-block',
  name: 'Text Block',
  icon: <FileText size={18} />,
  layouts: ['single-column', 'two-columns', 'three-columns', 'prose'],
  renderSettings: ({ data, updateData, theme, layout }) => {
    const columnCount = layout === 'two-columns' ? 2 : layout === 'three-columns' ? 3 : 1;
    
    return (
      <div className={`grid gap-6 ${columnCount === 2 ? 'grid-cols-2' : columnCount === 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            {columnCount > 1 ? 'Column 1 Content' : 'Content'}
          </label>
          <textarea 
            value={data.text || ''}
            onChange={(e) => updateData('text', e.target.value)}
            className={`w-full min-h-[160px] p-3 rounded-xl border text-xs font-bold outline-none transition-all ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100 focus:bg-white'
            }`}
            placeholder="Enter text..."
          />
        </div>
        {columnCount >= 2 && (
          <div className="animate-in slide-in-from-right-2 duration-300">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Column 2 Content</label>
            <textarea 
              value={data.secondaryText || ''}
              onChange={(e) => updateData('secondaryText', e.target.value)}
              className={`w-full min-h-[160px] p-3 rounded-xl border text-xs font-bold outline-none transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100 focus:bg-white'
              }`}
              placeholder="Enter text..."
            />
          </div>
        )}
        {columnCount >= 3 && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Column 3 Content</label>
            <textarea 
              value={data.thirdText || ''}
              onChange={(e) => updateData('thirdText', e.target.value)}
              className={`w-full min-h-[160px] p-3 rounded-xl border text-xs font-bold outline-none transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100 focus:bg-white'
              }`}
              placeholder="Enter text..."
            />
          </div>
        )}
      </div>
    );
  }
};
