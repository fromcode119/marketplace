import React from 'react';
import { Search } from 'lucide-react';

export function GoogleAds() {
  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-4">
        <Search className="text-blue-500" size={24} />
        <h2 className="text-xl font-bold">Google Ads Manager</h2>
      </div>
      <p className="text-slate-500">
        Monitor your search engine marketing performance and keyword targeting.
      </p>
    </div>
  );
}
