import React from 'react';
import { Maximize } from 'lucide-react';
import { BlockDefinition } from '../types';

export const SpacerBlock: BlockDefinition = {
  id: 'spacer',
  name: 'Spacer / Divider',
  icon: <Maximize size={18} />,
  layouts: ['small', 'medium', 'large', 'divider'],
  renderSettings: ({ data, updateData, theme }) => (
    <div className="space-y-4">
      <p className="text-[10px] text-slate-500 font-bold italic">
        This block adds vertical space or a visual divider between sections.
      </p>
    </div>
  )
};
