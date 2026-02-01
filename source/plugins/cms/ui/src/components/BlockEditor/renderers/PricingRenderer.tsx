import React from 'react';
import { Check } from 'lucide-react';

export const PricingRenderer: React.FC<{ data: any; layout: string }> = ({ data, layout }) => {
  const plans = data.plans || [];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan: any, idx: number) => (
          <div 
            key={idx}
            className={`flex flex-col p-8 rounded-[32px] border transition-all ${
              plan.highlight 
                ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105 z-10' 
                : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white'
            }`}
          >
            <div className="mb-8">
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${plan.highlight ? 'text-indigo-400' : 'text-slate-400'}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black opacity-50">$</span>
                <span className="text-6xl font-black tracking-tighter">{plan.price}</span>
                <span className={`text-sm font-bold ${plan.highlight ? 'text-slate-400' : 'text-slate-400'}`}>/{plan.period}</span>
              </div>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              {(plan.features || []).map((feature: string, fidx: number) => (
                <div key={fidx} className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className={`text-[13px] font-medium ${plan.highlight ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
              plan.highlight
                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20'
                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
            }`}>
              {plan.buttonText || 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
