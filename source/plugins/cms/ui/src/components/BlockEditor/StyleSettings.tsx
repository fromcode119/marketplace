import React from 'react';
import { Type, Maximize, Palette, Eye, Monitor, Smartphone, LayoutGrid, Wind } from 'lucide-react';
import { BlockStyle } from './types';

interface StyleSettingsProps {
  style?: BlockStyle;
  onChange: (style: BlockStyle) => void;
  theme: string;
}

export const StyleSettings: React.FC<StyleSettingsProps> = ({ style = {}, onChange, theme }) => {
  const updateStyle = (patch: Partial<BlockStyle>) => {
    onChange({ ...style, ...patch });
  };

  const updateNested = (key: 'margin' | 'padding', side: string, val: string) => {
    const current = style[key] || {};
    updateStyle({ [key]: { ...current, [side]: val } });
  };

  const SIDES = ['top', 'right', 'bottom', 'left'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Spacing */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Maximize size={14} className="text-indigo-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Spacing</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Padding</label>
            <div className="grid grid-cols-2 gap-2">
              {SIDES.map(side => (
                <div key={side} className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase text-slate-300">{side[0]}</span>
                  <input 
                    type="text" 
                    placeholder="0px"
                    value={style.padding?.[side as keyof typeof style.padding] || ''}
                    onChange={(e) => updateNested('padding', side, e.target.value)}
                    className={`w-full pl-5 pr-2 py-2 rounded-lg text-[10px] font-bold border outline-none transition-all ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Margin</label>
            <div className="grid grid-cols-2 gap-2">
              {SIDES.map(side => (
                <div key={side} className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase text-slate-300">{side[0]}</span>
                  <input 
                    type="text" 
                    placeholder="0px"
                    value={style.margin?.[side as keyof typeof style.margin] || ''}
                    onChange={(e) => updateNested('margin', side, e.target.value)}
                    className={`w-full pl-5 pr-2 py-2 rounded-lg text-[10px] font-bold border outline-none transition-all ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Background & Colors */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Palette size={14} className="text-indigo-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Design</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Background</label>
            <div className={`flex items-center gap-2 p-1 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <input 
                type="color" 
                value={style.background || '#ffffff'}
                onChange={(e) => updateStyle({ background: e.target.value })}
                className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
              />
              <input 
                type="text" 
                value={style.background || ''}
                onChange={(e) => updateStyle({ background: e.target.value })}
                placeholder="Transparent"
                className="flex-1 bg-transparent text-[10px] font-bold outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Text Color</label>
            <div className={`flex items-center gap-2 p-1 rounded-lg border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <input 
                type="color" 
                value={style.textColor || '#000000'}
                onChange={(e) => updateStyle({ textColor: e.target.value })}
                className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
              />
              <input 
                type="text" 
                value={style.textColor || ''}
                onChange={(e) => updateStyle({ textColor: e.target.value })}
                placeholder="Default"
                className="flex-1 bg-transparent text-[10px] font-bold outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Border Radius</label>
            <input 
              type="text" 
              placeholder="0px or 1rem"
              value={style.borderRadius || ''}
              onChange={(e) => updateStyle({ borderRadius: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg text-[10px] font-bold border outline-none transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
              }`}
            />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Backdrop Blur</label>
            <input 
              type="text" 
              placeholder="e.g. 10px"
              value={style.backdropBlur || ''}
              onChange={(e) => updateStyle({ backdropBlur: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg text-[10px] font-bold border outline-none transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
              }`}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Box Shadow</label>
            <input 
              type="text" 
              placeholder="e.g. 0 10px 30px rgba(0,0,0,0.1)"
              value={style.boxShadow || ''}
              onChange={(e) => updateStyle({ boxShadow: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg text-[10px] font-bold border outline-none transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
              }`}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Animation</label>
            <select 
              value={style.animation || ''}
              onChange={(e) => updateStyle({ animation: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg text-[10px] font-bold border outline-none transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
              }`}
            >
              <option value="">None</option>
              <option value="fade-in">Fade In</option>
              <option value="slide-up">Slide Up</option>
              <option value="slide-in-right">Slide In Right</option>
              <option value="zoom-in">Zoom In</option>
              <option value="bounce-low">Gently Bounce</option>
            </select>
          </div>
        </div>
      </section>

      {/* Visibility */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Eye size={14} className="text-indigo-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Visibility</h3>
        </div>
        
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All Devices', icon: <LayoutGrid size={12} /> },
            { id: 'desktop', label: 'Desktop Only', icon: <Monitor size={12} /> },
            { id: 'mobile', label: 'Mobile Only', icon: <Smartphone size={12} /> },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => updateStyle({ visibility: opt.id as any })}
              className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                (style.visibility || 'all') === opt.id 
                  ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg' 
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-300'
              }`}
            >
              {opt.icon}
              <span className="text-[8px] font-black uppercase tracking-widest">{opt.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Advanced */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Wind size={14} className="text-indigo-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Advanced</h3>
        </div>
        
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Custom CSS Class</label>
        <input 
          type="text" 
          placeholder="e.g. glass-morphism shadow-pro"
          value={style.customClass || ''}
          onChange={(e) => updateStyle({ customClass: e.target.value })}
          className={`w-full px-3 py-2 rounded-lg text-[10px] font-bold border outline-none transition-all ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
          }`}
        />
      </section>
    </div>
  );
};
