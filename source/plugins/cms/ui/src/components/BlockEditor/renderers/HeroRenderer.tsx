import React from 'react';

export const HeroRenderer = ({ data, layout }: any) => {
  console.log('[CMS] Rendering HeroBlock:', { layout, data });
  const isCentered = layout === 'centered';
  const isSplit = layout === 'split';
  const isVideo = layout === 'video-bg';

  return (
    <section className={`relative overflow-hidden min-h-[60vh] flex items-center py-20 ${isCentered ? 'text-center' : ''} ${layout === 'parallax' ? 'bg-fixed bg-center bg-cover' : ''}`}
      style={layout === 'parallax' && data.bgUrl ? { backgroundImage: `url(${data.bgUrl})` } : {}}
    >
      {/* Background Layer */}
      {!isSplit && data.bgUrl && layout !== 'parallax' && (
        <div className="absolute inset-0 -z-10">
          {isVideo && data.bgUrl.includes('.mp4') ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={data.bgUrl} type="video/mp4" />
            </video>
          ) : (
            <img src={data.bgUrl} className="w-full h-full object-cover" alt="" />
          )}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 w-full">
        {isSplit ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
               <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                 {data.title }
               </h1>
               <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
                 {data.subtitle}
               </p>
               <div className="flex items-center gap-4">
                  {data.primaryCtaText && (
                    <a href={data.primaryCtaLink || '#'} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
                      {data.primaryCtaText}
                    </a>
                  )}
               </div>
            </div>
            <div className="relative animate-in zoom-in duration-1000">
               <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full" />
               <img src={data.bgUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'} className="relative z-10 rounded-[40px] shadow-2xl border-8 border-white/50" alt="" />
            </div>
          </div>
        ) : (
          <div className={`max-w-4xl ${isCentered ? 'mx-auto' : ''} space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000`}>
             <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] ${data.bgUrl ? 'text-white' : 'text-slate-900'}`}>
               {data.title }
             </h1>
             <p className={`text-xl font-medium max-w-2xl ${isCentered ? 'mx-auto' : ''} ${data.bgUrl ? 'text-slate-200' : 'text-slate-500'}`}>
               {data.subtitle}
             </p>
          </div>
        )}
      </div>
    </section>
  );
};
