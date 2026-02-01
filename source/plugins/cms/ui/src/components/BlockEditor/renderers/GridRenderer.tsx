import React from 'react';

export const GridRenderer = ({ data, layout }: any) => {
  const items = data.items || [];
  
  const gridCols = {
    'two-columns': 'md:grid-cols-2',
    'three-columns': 'md:grid-cols-2 lg:grid-cols-3',
    'four-columns': 'md:grid-cols-2 lg:grid-cols-4'
  }[layout as string] || 'md:grid-cols-3';

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className={`grid gap-8 ${gridCols}`}>
        {items.map((item: any, idx: number) => (
          <div key={item.id || idx} className="flex flex-col gap-6 p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl shadow-slate-200/50">
            {item.image && (
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center overflow-hidden">
                <img src={item.image} className="w-10 h-10 object-contain" alt="" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
            {item.link && (
               <a href={item.link} className="text-indigo-500 font-bold text-xs uppercase tracking-widest mt-auto hover:text-indigo-600">
                  Learn More &rarr;
               </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
