import React from 'react';

export const ImageRenderer = ({ data, layout }: any) => {
  const isFull = layout === 'full-width';
  const isContain = layout === 'contain';
  const isSideBySide = layout === 'side-by-side';

  return (
    <div className={`py-12 ${isFull ? 'w-full' : 'max-w-7xl mx-auto px-6'}`}>
      {isSideBySide ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <img src={data.imageUrl} className="w-full h-80 object-cover rounded-[32px] shadow-lg" alt="" />
           <img src={data.secondaryImageUrl || data.imageUrl} className="w-full h-80 object-cover rounded-[32px] shadow-lg" alt="" />
        </div>
      ) : (
        <figure className="group relative overflow-hidden rounded-[40px]">
          <img 
            src={data.imageUrl || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop'} 
            className={`w-full transition-transform duration-700 group-hover:scale-105 ${isContain ? 'max-h-[70vh] object-contain bg-slate-50' : 'h-[60vh] object-cover'}`} 
            alt={data.caption} 
          />
          {data.caption && (
            <div className="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-sm">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-1">Image Insight</p>
               <p className="text-sm font-bold text-slate-900">{data.caption}</p>
            </div>
          )}
        </figure>
      )}
    </div>
  );
};
