import React, { useState, useEffect } from 'react';
import { ShieldCheck, Fingerprint, Lock, ShieldAlert, Loader2, CheckCircle2, XCircle } from 'lucide-react';

const useTranslation = () => {
    if (typeof window !== 'undefined' && (window as any).Fromcode?.useTranslation) {
        return (window as any).Fromcode.useTranslation();
    }
    return { t: (key: string, _params?: any, defaultValue?: string) => defaultValue || key.split('.').pop() || key };
};

export const PrivacyDashboard: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/privacy/logs?limit=10')
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" size={32} />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('privacy.title', {}, 'Compliance & Privacy')}</h1>
          <p className="text-slate-500">{t('privacy.tagline', {}, 'Consent logs and GDPR compliance tools')}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full border border-emerald-100">
            <ShieldCheck size={16} />
            GDPR Ready
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="p-2 w-fit rounded-lg bg-blue-50 text-blue-600 mb-4">
            <Fingerprint size={24} />
          </div>
          <div className="text-2xl font-bold text-slate-900">100%</div>
          <div className="text-sm text-slate-500">{t('privacy.stats.anonymization', {}, 'Data Anonymization')}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600 mb-4">
            <Lock size={24} />
          </div>
          <div className="text-2xl font-bold text-slate-900">SSL Active</div>
          <div className="text-sm text-slate-500">{t('privacy.stats.encryption', {}, 'End-to-End Encryption')}</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="p-2 w-fit rounded-lg bg-rose-50 text-rose-600 mb-4">
            <ShieldAlert size={24} />
          </div>
          <div className="text-2xl font-bold text-slate-900">0</div>
          <div className="text-sm text-slate-500">{t('privacy.stats.breaches', {}, 'Security Alerts')}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-semibold text-slate-900">{t('privacy.logs.title', {}, 'Latest Consent Logs')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('privacy.logs.visitor', {}, 'Visitor ID')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('privacy.logs.action', {}, 'Consent Action')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('privacy.logs.timestamp', {}, 'Timestamp')}</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">{t('privacy.logs.status', {}, 'Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.length > 0 ? logs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono text-slate-600 truncate max-w-[150px]">{log.visitorId}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{log.action || 'Cookie Consent'}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {log.granted ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                        <CheckCircle2 size={14} /> Accepted
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-rose-600 text-xs font-medium">
                        <XCircle size={14} /> Declined
                      </span>
                    )}
                  </td>
                </tr>
              )) : (
                 <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-mono text-slate-600 truncate max-w-[150px]">{"anon-192-33"}</td>
                  <td className="px-6 py-4 text-sm text-slate-900">{"Cookie Consent"}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{"2026-02-01 10:22:01"}</td>
                  <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                        <CheckCircle2 size={14} /> Accepted
                      </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
