import React from 'react';

export const SpacerRenderer = ({ layout }: any) => {
  const heights: Record<string, string> = {
    'small': 'h-12',
    'medium': 'h-24',
    'large': 'h-48'
  };

  if (layout === 'divider') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return <div className={heights[layout] || 'h-24'} />;
};
