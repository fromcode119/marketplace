import React, { useState } from 'react';

export const ContactFormRenderer: React.FC<{ data: any; layout: string }> = ({ data, layout }) => {
  const [submitted, setSubmitted] = useState(false);
  const fields = data.fields || [];

  if (submitted) {
    return (
      <div className="py-24 px-6 text-center">
        <div className="max-w-md mx-auto p-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-[40px] border border-emerald-100 dark:border-emerald-500/20">
           <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-500/20">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
           </div>
           <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Success!</h3>
           <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
             {data.successMessage || 'Thank you! We will get back to you soon.'}
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-24 px-6 max-w-7xl mx-auto ${layout === 'split' ? 'grid grid-cols-1 md:grid-cols-2 gap-20 items-center' : ''}`}>
      {layout === 'split' && (
        <div>
           <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6 leading-none">
             Let's start <br/>a project <br/><span className="text-indigo-500">together.</span>
           </h2>
           <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md">
             We're always looking for new opportunities and interesting people to work with. Reach out!
           </p>
        </div>
      )}

      <form 
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className={`bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-500/[0.05] ${layout === 'boxed' ? 'max-w-2xl mx-auto' : ''}`}
      >
        <div className="space-y-6">
           {fields.map((field: any, idx: number) => (
             <div key={idx}>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea 
                    placeholder={field.placeholder}
                    className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-indigo-500/20 transition-all min-h-[120px]"
                    required
                  />
                ) : (
                  <input 
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 ring-indigo-500/20 transition-all"
                    required
                  />
                )}
             </div>
           ))}
           <button 
             type="submit"
             className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1 active:translate-y-0"
           >
             Send Message
           </button>
        </div>
      </form>
    </div>
  );
};
