import React from 'react';
import { Share2 } from 'lucide-react';

export function SocialCampaigns() {
  return (
    <div className="p-8 bg-pink-50 dark:bg-pink-900/10 rounded-2xl border border-pink-100 dark:border-pink-800">
      <div className="flex items-center gap-3 mb-4">
        <Share2 className="text-pink-500" size={24} />
        <h2 className="text-xl font-bold">Social Media Campaigns</h2>
      </div>
      <p className="text-slate-500">
        Track engagement across Facebook, Instagram, and LinkedIn.
      </p>
    </div>
  );
}
