import React from 'react';
import { Columns } from 'lucide-react';
import { BlockDefinition } from '../types';

export const ColumnsBlock: BlockDefinition = {
  id: 'columns-block',
  name: 'Columns',
  icon: <Columns size={18} />,
  layouts: ['2-cols', '3-cols', '4-cols', '1-2-cols', '2-1-cols'],
  renderSettings: ({ data, updateData, theme }) => {
    return (
      <div className="space-y-6">
        <p className="text-[10px] text-slate-400 font-medium">
          Select a layout variant above to change the column structure. 
          The columns will appear as drop zones in the visual editor.
        </p>
        
        <div className="space-y-4">
           <div>
             <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Column Spacing</label>
             <input 
               type="text" 
               placeholder="2rem"
               value={data.gap || ''}
               onChange={(e) => updateData('gap', e.target.value)}
               className={`w-full p-3 rounded-xl border text-[11px] font-bold ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
             />
           </div>
        </div>
      </div>
    );
  }
};
