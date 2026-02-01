import React from 'react';

export const TextRenderer = ({ data, layout }: any) => {
  console.log('[CMS] Rendering TextBlock:', { layout, data });
  const isTwoColumns = layout === 'two-columns';
  const isThreeColumns = layout === 'three-columns';
  const isProse = layout === 'prose';

  const gridCols = isThreeColumns ? 'grid-cols-1 md:grid-cols-3' : isTwoColumns ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto';

  return (
    <div className={`py-16 px-6 max-w-7xl mx-auto ${isProse ? 'prose prose-slate lg:prose-xl dark:prose-invert' : ''}`}>
      <div className={`grid gap-x-12 gap-y-8 ${gridCols}`}>
        <div className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap text-lg">
          {data.text || (layout === 'prose' ? '' : 'Write your content here...')}
        </div>
        
        {(isTwoColumns || isThreeColumns) && (
          <div className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap text-lg">
            {data.secondaryText || ''}
          </div>
        )}

        {isThreeColumns && (
          <div className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap text-lg">
            {data.thirdText || ''}
          </div>
        )}
      </div>
    </div>
  );
};
