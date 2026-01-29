import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export function SecurityDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Security Audit Logs</h2>
            <p className="text-slate-500 text-sm">Monitoring critical system events and security bypasses.</p>
          </div>
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-700 dark:text-amber-400 text-sm flex gap-3">
          <Info size={18} className="shrink-0" />
          <p>This is a demo view registered via the test-feature plugin. Real-time logging of API calls and configuration changes would appear here in a production environment.</p>
        </div>
      </div>
    </div>
  );
}
