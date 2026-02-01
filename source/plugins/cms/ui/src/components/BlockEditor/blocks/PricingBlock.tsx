import React from 'react';
import { CircleDollarSign, Plus, Check, Trash2 } from 'lucide-react';
import { BlockDefinition } from '../types';

export const PricingBlock: BlockDefinition = {
  id: 'pricing',
  name: 'Pricing Plans',
  description: 'Comparison table for products or services',
  icon: <CircleDollarSign size={18} />,
  layouts: ['cards', 'table', 'minimal'],
  renderSettings: ({ data, updateData }) => {
    const plans = data.plans || [];

    const addPlan = () => {
      updateData('plans', [...plans, { 
        name: 'Basic', 
        price: '29', 
        period: 'mo',
        features: ['Feature 1', 'Feature 2'],
        buttonText: 'Get Started',
        highlight: false
      }]);
    };

    const updatePlan = (idx: number, field: string, value: any) => {
      const newPlans = [...plans];
      newPlans[idx] = { ...newPlans[idx], [field]: value };
      updateData('plans', newPlans);
    };

    const removePlan = (idx: number) => {
      const newPlans = [...plans];
      newPlans.splice(idx, 1);
      updateData('plans', newPlans);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Pricing Plans</label>
          <button 
            onClick={addPlan}
            className="flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
          >
            <Plus size={10} /> Add Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((plan: any, idx: number) => (
            <div key={idx} className={`p-4 rounded-2xl border transition-all ${plan.highlight ? 'border-indigo-500 bg-indigo-50/10' : 'bg-slate-50 dark:bg-slate-800 border-transparent'}`}>
              <div className="flex justify-between mb-4">
                 <input
                  type="text"
                  value={plan.name}
                  onChange={(e) => updatePlan(idx, 'name', e.target.value)}
                  className="bg-transparent border-none p-0 text-sm font-black text-slate-900 dark:text-white focus:ring-0"
                  placeholder="Plan Name"
                />
                <button onClick={() => removePlan(idx)} className="text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xs font-bold">$</span>
                <input
                  type="text"
                  value={plan.price}
                  onChange={(e) => updatePlan(idx, 'price', e.target.value)}
                  className="w-16 bg-transparent border-none p-0 text-2xl font-black text-slate-900 dark:text-white focus:ring-0"
                  placeholder="29"
                />
                <span className="text-[10px] text-slate-400">/</span>
                <input
                  type="text"
                  value={plan.period}
                  onChange={(e) => updatePlan(idx, 'period', e.target.value)}
                  className="w-12 bg-transparent border-none p-0 text-[10px] font-bold text-slate-400 focus:ring-0"
                  placeholder="mo"
                />
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-[8px] font-black uppercase tracking-widest text-slate-400">Highlights</label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={plan.highlight}
                    onChange={(e) => updatePlan(idx, 'highlight', e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Featured Plan</span>
                </div>
              </div>

              <div className="space-y-4">
                <textarea
                  value={plan.features?.join('\n')}
                  onChange={(e) => updatePlan(idx, 'features', e.target.value.split('\n'))}
                  className="w-full bg-white dark:bg-slate-950 border-none rounded-xl p-3 text-xs font-medium focus:ring-1 ring-indigo-500/20"
                  rows={3}
                  placeholder="Features (one per line)..."
                />
                <input
                  type="text"
                  value={plan.buttonText}
                  onChange={(e) => updatePlan(idx, 'buttonText', e.target.value)}
                  className="w-full bg-indigo-500 text-white rounded-xl py-2 text-[10px] font-black uppercase tracking-widest text-center border-none"
                  placeholder="Button Text"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
