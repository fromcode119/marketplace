import React from 'react';
import { Mail, Plus, Trash2 } from 'lucide-react';
import { BlockDefinition } from '../types';

export const ContactFormBlock: BlockDefinition = {
  id: 'contact-form',
  name: 'Contact Form',
  description: 'Customizable lead capture form',
  icon: <Mail size={18} />,
  layouts: ['simple', 'split', 'boxed'],
  renderSettings: ({ data, updateData }) => {
    const fields = data.fields || [
      { label: 'Name', type: 'text', placeholder: 'Your Name' },
      { label: 'Email', type: 'email', placeholder: 'your@email.com' },
      { label: 'Message', type: 'textarea', placeholder: 'How can we help?' }
    ];

    const updateField = (idx: number, key: string, val: any) => {
      const newFields = [...fields];
      newFields[idx] = { ...newFields[idx], [key]: val };
      updateData('fields', newFields);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Success Message</label>
          <input
            type="text"
            value={data.successMessage || ''}
            onChange={(e) => updateData('successMessage', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold"
            placeholder="Thank you! We will get back to you soon."
          />
        </div>

        <div className="space-y-4">
           {fields.map((field: any, idx: number) => (
             <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                   <div className="flex flex-1 gap-2">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(idx, 'label', e.target.value)}
                        className="flex-1 bg-transparent border-none p-0 text-sm font-black text-slate-900 dark:text-white focus:ring-0"
                        placeholder="Field Label"
                      />
                      <select 
                        value={field.type}
                        onChange={(e) => updateField(idx, 'type', e.target.value)}
                        className="bg-white dark:bg-slate-950 border-none rounded-lg text-[9px] font-black uppercase px-2 py-1"
                      >
                         <option value="text">Text</option>
                         <option value="email">Email</option>
                         <option value="textarea">Textarea</option>
                         <option value="tel">Phone</option>
                      </select>
                   </div>
                </div>
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(e) => updateField(idx, 'placeholder', e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border-none rounded-lg p-2 text-xs font-medium"
                  placeholder="Placeholder text"
                />
             </div>
           ))}
        </div>
      </div>
    );
  }
};
