import React from 'react';

export const LogoCloudRenderer: React.FC<{ data: any; layout: string }> = ({ data, layout }) => {
  const logos = data.logos || [];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto border-y border-slate-50 dark:border-slate-800/50">
      {data.heading && (
        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12">
          {data.heading}
        </p>
      )}

      <div className={`flex flex-wrap items-center justify-center gap-x-16 gap-y-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700`}>
        {logos.map((logo: any, idx: number) => (
          <div key={idx} className="h-8 md:h-12 w-auto max-w-[140px] flex items-center justify-center">
            {logo.image ? (
              <img 
                src={logo.image} 
                alt={logo.name} 
                className="max-h-full w-auto object-contain" 
              />
            ) : (
              <span className="text-[10px] font-black uppercase text-slate-300">{logo.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
