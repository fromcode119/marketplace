import React from 'react';
import { Users, Plus, Trash2, Camera } from 'lucide-react';
import { BlockDefinition } from '../types';
import { MediaInput } from '../../MediaInput';

export const TeamBlock: BlockDefinition = {
  id: 'team',
  name: 'Our Team',
  description: 'Showcase your team members with photos',
  icon: <Users size={18} />,
  layouts: ['grid', 'list', 'minimal'],
  renderSettings: ({ data, updateData }) => {
    const members = data.members || [];

    const addMember = () => {
      updateData('members', [...members, { 
        name: 'John Doe', 
        role: 'CEO & Founder',
        image: '',
        bio: ''
      }]);
    };

    const updateMember = (idx: number, field: string, value: any) => {
      const newMembers = [...members];
      newMembers[idx] = { ...newMembers[idx], [field]: value };
      updateData('members', newMembers);
    };

    const removeMember = (idx: number) => {
      const newMembers = [...members];
      newMembers.splice(idx, 1);
      updateData('members', newMembers);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Team Members</label>
          <button 
            onClick={addMember}
            className="flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
          >
            <Plus size={10} /> Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {members.map((member: any, idx: number) => (
            <div key={idx} className="flex gap-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-indigo-500/30 transition-all group">
               <div className="w-24 h-24 shrink-0">
                  <MediaInput 
                    value={member.image}
                    onChange={(val) => updateMember(idx, 'image', val)}
                  />
               </div>
               
               <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                       <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMember(idx, 'name', e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-lg font-black text-slate-900 dark:text-white focus:ring-0"
                        placeholder="Member Name"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateMember(idx, 'role', e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-widest text-indigo-500 focus:ring-0"
                        placeholder="Job Title"
                      />
                    </div>
                    <button onClick={() => removeMember(idx)} className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <textarea
                    value={member.bio}
                    onChange={(e) => updateMember(idx, 'bio', e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-xs font-medium text-slate-500 focus:ring-0 resize-none"
                    rows={2}
                    placeholder="Short bio..."
                  />
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
