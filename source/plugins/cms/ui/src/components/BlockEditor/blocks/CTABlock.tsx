import React from 'react';
import { Zap } from 'lucide-react';
import { BlockDefinition } from '../types';

export const CTABlock: BlockDefinition = {
  id: 'cta',
  name: 'Call to Action',
  icon: <Zap size={18} />,
  layouts: ['banner', 'card', 'minimal', 'floating'],
  renderSettings: ({ data, updateData, theme }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Button Text</label>
          <input 
            value={data.buttonText || ''}
            onChange={(e) => updateData('buttonText', e.target.value)}
            className={`w-full p-3 rounded-xl border text-[10px] font-bold outline-none transition-all ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}
            placeholder="Click Here"
          />
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Button Link</label>
          <input 
            value={data.buttonLink || ''}
            onChange={(e) => updateData('buttonLink', e.target.value)}
            className={`w-full p-3 rounded-xl border text-[10px] font-bold outline-none transition-all ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}
            placeholder="/path"
          />
        </div>
      </div>
    </div>
  )
};
