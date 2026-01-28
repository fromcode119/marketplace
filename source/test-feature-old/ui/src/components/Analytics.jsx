import React from 'react';
import { ChartNoAxesColumn } from 'lucide-react';

export function Analytics() {
  return (
    <div className="p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800">
      <div className="flex items-center gap-3 mb-4">
        <ChartNoAxesColumn className="text-emerald-500" size={24} />
        <h2 className="text-xl font-bold">Plugin Analytics</h2>
      </div>
      <p className="text-slate-500">
        Detailed metrics and usage statistics for the test-feature plugin.
      </p>
    </div>
  );
}
