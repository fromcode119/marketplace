import React, { useState, useEffect } from 'react';
import { ClipboardList, Inbox, MessageSquare, AlertCircle, Loader2, CheckCircle, Mail } from 'lucide-react';

const useTranslation = () => {
    if (typeof window !== 'undefined' && (window as any).Fromcode?.useTranslation) {
        return (window as any).Fromcode.useTranslation();
    }
    return { t: (key: string, _params?: any, defaultValue?: string) => defaultValue || key.split('.').pop() || key };
};

export const FormsDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('/api/forms/submissions?limit=5')
      .then(res => res.json())
      .then(data => {
        setSubmissions(data);
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
          <h1 className="text-2xl font-bold text-slate-900">{t('forms.title', {}, 'Forms & Submissions')}</h1>
          <p className="text-slate-500">{t('forms.tagline', {}, 'Manage lead capture and user messages')}</p>
        </div>
        <div className="flex bg-white rounded-lg border border-slate-200 p-1 shadow-sm">
          <button className="px-4 py-1.5 text-sm font-medium bg-slate-50 text-slate-900 rounded-md">{t('forms.tabs.inbox', {}, 'Inbox')}</button>
          <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">{t('forms.tabs.templates', {}, 'Templates')}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                <Inbox size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">12</div>
                <div className="text-xs text-slate-500 uppercase font-semibold">{t('forms.stats.unreplied', {}, 'Unreplied')}</div>
              </div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-1 text-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <ClipboardList size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">4</div>
                <div className="text-xs text-slate-500 uppercase font-semibold">{t('forms.stats.active_forms', {}, 'Active Forms')}</div>
              </div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm col-span-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle size={24} />
              </div>
              <div>
                 <div className="text-sm font-semibold text-slate-900">{t('forms.status.healthy', {}, 'Submission Flow Healthy')}</div>
                 <div className="text-xs text-slate-500">Antispam: Webhook Active / ReCaptcha V3</div>
              </div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">{t('forms.recent.title', {}, 'Recent Submissions')}</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {submissions.length > 0 ? submissions.map((sub, i) => (
            <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex gap-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                <Mail size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-slate-900 truncate">{sub.formName || 'Contact Form'}</h4>
                  <span className="text-xs text-slate-500">{new Date(sub.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-slate-600 mb-2 truncate">
                  <span className="font-medium text-slate-900">{sub.author || 'Anonymous User'}:</span> {sub.excerpt || 'No message content provided...'}
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    <MessageSquare size={14} /> View Response
                  </button>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">IP: {sub.ipAddress || 'Hidden'}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center">
               <AlertCircle size={40} className="mx-auto text-slate-300 mb-4" />
               <p className="text-slate-500">No submissions found yet. Try testing your contact forms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
