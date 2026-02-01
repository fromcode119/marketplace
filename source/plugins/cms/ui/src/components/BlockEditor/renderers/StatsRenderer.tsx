import React from 'react';

export const StatsRenderer: React.FC<{ data: any; layout: string }> = ({ data, layout }) => {
  const items = data.items || [];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8`}>
        {items.map((item: any, idx: number) => (
          <div key={idx} className="flex flex-col items-center text-center p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/20 transition-all group">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-indigo-500 transition-colors">
                {item.value}
              </span>
              <span className="text-xl font-black text-indigo-500">
                {item.suffix}
              </span>
            </div>
            <div className="h-px w-8 bg-indigo-500/20 mb-4"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
