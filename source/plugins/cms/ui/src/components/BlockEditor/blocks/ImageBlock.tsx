import React from 'react';
import { Image } from 'lucide-react';
import { BlockDefinition } from '../types';
import { MediaInput } from '../../MediaInput';

export const ImageBlock: BlockDefinition = {
  id: 'image-block',
  name: 'Image & Media',
  icon: <Image size={18} />,
  layouts: ['full-width', 'contain', 'side-by-side', 'parallax'],
  renderSettings: ({ data, updateData, theme, layout }) => (
    <div className="space-y-6">
      <MediaInput 
        label={layout === 'side-by-side' ? 'First Image' : 'Image Asset'}
        value={data.imageUrl || ''}
        onChange={(val) => updateData('imageUrl', val)}
        type="image"
      />
      {layout === 'side-by-side' && (
        <MediaInput 
          label="Second Image"
          value={data.secondaryImageUrl || ''}
          onChange={(val) => updateData('secondaryImageUrl', val)}
          type="image"
        />
      )}
      <div>
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Caption</label>
        <input 
          value={data.caption || ''}
          onChange={(e) => updateData('caption', e.target.value)}
          className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-all ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
          }`}
          placeholder="Image description..."
        />
      </div>
    </div>
  )
};
