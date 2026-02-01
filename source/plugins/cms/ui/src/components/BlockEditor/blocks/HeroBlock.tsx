import React from 'react';
import { Layers } from 'lucide-react';
import { BlockDefinition } from '../types';
import { MediaInput } from '../../MediaInput';

export const HeroBlock: BlockDefinition = {
  id: 'hero',
  name: 'Hero Section',
  icon: <Layers size={18} />,
  layouts: ['standard', 'centered', 'split', 'video-bg'],
  renderSettings: ({ data, updateData, theme }) => (
    <div className="space-y-6">
      <div>
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Heading / Title</label>
        <input 
          value={data.title || ''}
          onChange={(e) => updateData('title', e.target.value)}
          className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-all ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
          }`}
          placeholder="Headline..."
        />
      </div>
      <div>
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Subtitle / Description</label>
        <textarea 
          value={data.subtitle || ''}
          onChange={(e) => updateData('subtitle', e.target.value)}
          className={`w-full h-24 p-3 rounded-xl border text-xs font-bold outline-none transition-all ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
          }`}
          placeholder="Short description..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">CTA Text</label>
          <input 
            value={data.primaryCtaText || ''}
            onChange={(e) => updateData('primaryCtaText', e.target.value)}
            className={`w-full p-3 rounded-xl border text-[10px] font-bold outline-none transition-all ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}
            placeholder="Learn More"
          />
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">CTA Link</label>
          <input 
            value={data.primaryCtaLink || ''}
            onChange={(e) => updateData('primaryCtaLink', e.target.value)}
            className={`w-full p-3 rounded-xl border text-[10px] font-bold outline-none transition-all ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}
            placeholder="/about"
          />
        </div>
      </div>
      <MediaInput 
        label="Background Asset"
        value={data.bgUrl || ''}
        onChange={(val) => updateData('bgUrl', val)}
        type="all"
        placeholder="https://..."
      />
    </div>
  )
};
