import React from 'react';
import { Quote, Star } from 'lucide-react';

export const TestimonialsRenderer: React.FC<{ data: any; layout: string }> = ({ data, layout }) => {
  const items = data.items || [];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className={`grid gap-8 ${layout === 'single' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {items.map((item: any, idx: number) => (
          <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 flex flex-col items-start relative group">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
               <Quote size={20} fill="currentColor" />
            </div>

            <div className="flex gap-1 mb-6 text-amber-400">
               {Array.from({ length: item.rating || 5 }).map((_, i) => (
                 <Star key={i} size={14} fill="currentColor" />
               ))}
            </div>

            <p className="text-lg md:text-xl font-medium text-slate-900 dark:text-white leading-relaxed mb-10 italic">
               "{item.content}"
            </p>

            <div className="flex items-center gap-4 mt-auto">
               <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-200 shadow-lg">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black uppercase text-slate-400">JS</div>
                  )}
               </div>
               <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.author}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{item.role}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
