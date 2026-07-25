import React, { useState } from 'react';
import { Calendar, AlertCircle, Clock } from 'lucide-react';

interface DeadlineCardProps {
  daysRemaining: number;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({ daysRemaining }) => {
  const [snoozed, setSnoozed] = useState(false);

  return (
    <div className="bento-card col-span-1 md:col-span-2 row-span-1 p-6 bg-white flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-neutral-400 text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]" />
          Next Deadline
        </span>
        <h4 className="text-2xl font-black text-[#1A1A1A]">
          Friday, Oct 24
        </h4>
        <p className="text-xs text-neutral-500 font-medium">
          Lumina Design System v1.0 Final Handover
        </p>
      </div>

      <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-200">
        <div className="stat-value text-3xl sm:text-4xl text-[#1A1A1A]">
          {String(daysRemaining).padStart(2, '0')}{' '}
          <span className="text-sm uppercase font-black text-neutral-500">Days</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-black text-red-600 bg-red-100 border border-red-300 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-red-600" />
            Priority Critical
          </span>
          <button
            onClick={() => setSnoozed(!snoozed)}
            className={`text-[10px] font-bold px-2 py-0.5 border border-[#1A1A1A] rounded transition-colors cursor-pointer ${
              snoozed ? 'bg-[#FFD700] text-black' : 'bg-neutral-100 hover:bg-neutral-200 text-black'
            }`}
          >
            {snoozed ? 'Snoozed +1d' : 'Remind'}
          </button>
        </div>
      </div>
    </div>
  );
};
