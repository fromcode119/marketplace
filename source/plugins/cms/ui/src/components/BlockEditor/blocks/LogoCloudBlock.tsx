import React from 'react';
import { Share2, Plus, Trash2 } from 'lucide-react';
import { BlockDefinition } from '../types';
import { MediaInput } from '../../MediaInput';

export const LogoCloudBlock: BlockDefinition = {
  id: 'logo-cloud',
  name: 'Logo Cloud',
  description: 'Display partner or client logos',
  icon: <Share2 size={18} />,
  layouts: ['grid', 'ticker', 'simple'],
  renderSettings: ({ data, updateData }) => {
    const logos = data.logos || [];

    const addLogo = () => {
      updateData('logos', [...logos, { image: '', name: 'Partner Name' }]);
    };

    const updateLogo = (idx: number, field: string, value: any) => {
      const newLogos = [...logos];
      newLogos[idx] = { ...newLogos[idx], [field]: value };
      updateData('logos', newLogos);
    };

    const removeLogo = (idx: number) => {
      const newLogos = [...logos];
      newLogos.splice(idx, 1);
      updateData('logos', newLogos);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Heading (Optional)</label>
          <input
            type="text"
            value={data.heading || ''}
            onChange={(e) => updateData('heading', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold"
            placeholder="Trusted by 500+ companies"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Logos</label>
            <button 
              onClick={addLogo}
              className="flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
            >
              <Plus size={10} /> Add Logo
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {logos.map((logo: any, idx: number) => (
               <div key={idx} className="relative group p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-indigo-500/30 transition-all">
                  <div className="aspect-video mb-2">
                    <MediaInput 
                      value={logo.image}
                      onChange={(val) => updateLogo(idx, 'image', val)}
                    />
                  </div>
                  <input
                    type="text"
                    value={logo.name}
                    onChange={(e) => updateLogo(idx, 'name', e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-[9px] font-black uppercase text-center text-slate-400 focus:ring-0"
                    placeholder="Company Name"
                  />
                  <button 
                    onClick={() => removeLogo(idx)}
                    className="absolute top-2 right-2 p-1 bg-white dark:bg-slate-900 shadow-sm rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={10} />
                  </button>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }
};
