import React from 'react';
import { BlockWrapper } from './BlockWrapper';

export const ColumnsRenderer: React.FC<{ data: any; layout: string; style?: any; id?: string }> = ({ data, layout, style, id }) => {
  const getGridClass = () => {
    switch (layout) {
      case '2-cols': return 'grid-cols-1 md:grid-cols-2';
      case '3-cols': return 'grid-cols-1 md:grid-cols-3';
      case '4-cols': return 'grid-cols-1 md:grid-cols-4';
      case '1-2-cols': return 'grid-cols-1 md:grid-cols-[1fr_2fr]';
      case '2-1-cols': return 'grid-cols-1 md:grid-cols-[2fr_1fr]';
      default: return 'grid-cols-1';
    }
  };

  return (
    <BlockWrapper style={style} id={id} type="columns-block">
      <div className={`grid gap-8 ${getGridClass()}`} style={{ gap: data.gap }}>
        {/* In a fully recursive CMS, we would map over 'children' here */}
        {/* For now, we simulate the structure */}
        <div className="flex flex-col gap-4 min-h-[100px] border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Column 1 Content</span>
        </div>
        {layout !== '1-col' && (
          <div className="flex flex-col gap-4 min-h-[100px] border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl items-center justify-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Column 2 Content</span>
          </div>
        )}
      </div>
    </BlockWrapper>
  );
};
