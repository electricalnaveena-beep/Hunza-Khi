import React from 'react';
import { Zap, Activity } from 'lucide-react';

interface EnergyCardProps {
  level: 'Optimal' | 'High' | 'Moderate' | 'Recharging';
  onCycleEnergy: () => void;
}

export const EnergyCard: React.FC<EnergyCardProps> = ({ level, onCycleEnergy }) => {
  return (
    <div
      onClick={onCycleEnergy}
      className="bento-card col-span-1 row-span-1 p-6 bg-[#1A1A1A] text-white justify-between items-center text-center cursor-pointer group hover:border-[#FFD700] transition-colors"
      title="Click to cycle energy state"
    >
      <div className="flex justify-between items-center w-full">
        <span className="text-[10px] font-black tracking-widest uppercase text-neutral-400 flex items-center gap-1">
          <Activity className="w-3 h-3 text-[#FFD700]" />
          ENERGY
        </span>
        <span className="text-[10px] font-mono text-[#FFD700] bg-white/10 px-1.5 py-0.5 rounded">
          SYSTEM HEALTH
        </span>
      </div>

      <div className="my-2 flex flex-col items-center">
        <div className="text-4xl mb-1 group-hover:scale-125 transition-transform">
          ⚡
        </div>
        <div className="stat-value text-2xl sm:text-3xl text-[#FFD700] tracking-tight">
          {level}
        </div>
      </div>

      <div className="w-full text-center">
        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
          TAP TO BOOST / RECALIBRATE
        </span>
      </div>
    </div>
  );
};
