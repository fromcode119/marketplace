import React from 'react';

export const CTARenderer = ({ data, layout }: any) => {
  const isMinimal = layout === 'minimal';
  
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className={`relative overflow-hidden p-12 md:p-24 rounded-[50px] bg-slate-900 text-white shadow-2xl ${layout === 'banner' ? 'rounded-none' : ''}`}>
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
           <span className="text-xs font-black uppercase tracking-[0.4em] text-indigo-400">Next Steps</span>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter max-w-2xl leading-none">
             {data.title || 'Ready to revolutionize your workflow?'}
           </h2>
           <p className="text-lg text-slate-400 font-medium max-w-xl">
             {data.subtitle || 'Join 5,000+ companies building for the future on the most reliable platform.'}
           </p>
           <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
             <a href={data.buttonLink || '#'} className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-indigo-500 hover:scale-[1.02] transition-all shadow-xl shadow-indigo-600/20">
               {data.buttonText || 'Get Started Now'}
             </a>
             {!isMinimal && (
               <a href="#" className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all">
                 View Documentation
               </a>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};
