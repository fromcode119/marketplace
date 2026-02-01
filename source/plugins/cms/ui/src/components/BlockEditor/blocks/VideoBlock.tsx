import React from 'react';
import { Play } from 'lucide-react';
import { BlockDefinition } from '../types';
import { MediaInput } from '../../MediaInput';

export const VideoBlock: BlockDefinition = {
  id: 'video',
  name: 'Video Player',
  icon: <Play size={18} />,
  layouts: ['youtube', 'vimeo', 'upload'],
  renderSettings: ({ data, updateData, theme, layout }) => (
    <div className="space-y-6">
      <MediaInput 
        label={layout === 'upload' ? 'Video File' : 'Video ID / External URL'}
        value={data.url || ''}
        onChange={(val) => updateData('url', val)}
        type="video"
        placeholder={layout === 'youtube' ? 'dQw4w9WgXcQ' : 'https://...'}
      />
      <div>
         <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Caption (Optional)</label>
         <input 
           value={data.caption || ''}
           onChange={(e) => updateData('caption', e.target.value)}
           className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-all ${
             theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
           }`}
           placeholder="Explain this video..."
         />
      </div>
    </div>
  )
};
