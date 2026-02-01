import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQRenderer: React.FC<{ data: any; layout: string }> = ({ data, layout }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = data.items || [];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      {data.title && (
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center mb-16 tracking-tight uppercase">
          {data.title}
        </h2>
      )}

      <div className={`
        ${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'max-w-3xl mx-auto space-y-4'}
      `}>
        {items.map((item: any, idx: number) => (
          <div 
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all hover:border-indigo-500/20 shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-sm">
                {item.question}
              </span>
              <div className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`}>
                <ChevronDown size={20} />
              </div>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96' : 'max-h-0'}`}>
              <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed font-medium">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
