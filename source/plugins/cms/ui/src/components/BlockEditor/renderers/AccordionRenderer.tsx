import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BlockWrapper } from './BlockWrapper';

export const AccordionRenderer: React.FC<{ data: any; layout: string; style?: any; id?: string }> = ({ data, layout, style, id }) => {
  const items = data.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <BlockWrapper style={style} id={id} type="accordion-block">
      <div className="max-w-4xl mx-auto">
        <div className={`space-y-4 ${layout === 'separated' ? 'gap-4': ''}`}>
          {items.map((item: any, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`overflow-hidden transition-all duration-300 ${
                  layout === 'bordered' ? 'border rounded-2xl border-slate-100 dark:border-slate-800' :
                  layout === 'separated' ? 'bg-slate-50 dark:bg-slate-900/50 rounded-2xl' :
                  'border-b border-slate-100 dark:border-slate-800'
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    {item.title}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-indigo-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 text-slate-500 dark:text-slate-400 font-medium leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BlockWrapper>
  );
};
