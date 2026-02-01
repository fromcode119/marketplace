import React from 'react';

export const TeamRenderer: React.FC<{ data: any; layout: string }> = ({ data, layout }) => {
  const members = data.members || [];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className={`grid gap-12 ${layout === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {members.map((member: any, idx: number) => (
          <div key={idx} className="group flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-indigo-500 rounded-[40px] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10"></div>
              <div className="relative w-48 h-48 rounded-[40px] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300">
                    <span className="text-[10px] uppercase font-black">No Photo</span>
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">
              {member.name}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4">
              {member.role}
            </p>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
