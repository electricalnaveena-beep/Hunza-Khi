import React, { useState } from 'react';
import { Zap, BarChart2 } from 'lucide-react';

interface VelocityCardProps {
  pts: number;
  onAddPts: () => void;
}

export const VelocityCard: React.FC<VelocityCardProps> = ({ pts, onAddPts }) => {
  const [activeBar, setActiveBar] = useState<number | null>(2);

  // 5 bar heights in percentage
  const bars = [40, 70, 95, 60, 85];

  return (
    <div className="bento-card col-span-1 row-span-1 p-6 bg-white justify-between">
      <div className="flex justify-between items-start">
        <span className="text-neutral-400 text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 text-[#1A1A1A]" />
          Team Velocity
        </span>
        <button
          onClick={onAddPts}
          className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-[#FFD700] border border-[#1A1A1A] rounded-md text-[#1A1A1A] hover:bg-[#ffe033] transition-colors cursor-pointer"
        >
          +100 PTS
        </button>
      </div>

      <div className="flex items-end gap-1.5 h-14 my-2 px-1">
        {bars.map((height, idx) => {
          const isGold = idx === 2;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveBar(idx)}
              className="flex-1 group relative flex flex-col items-center cursor-pointer"
            >
              {activeBar === idx && (
                <div className="absolute -top-6 bg-[#1A1A1A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-black z-20">
                  {Math.round((pts / 1000) * (height / 100))}k
                </div>
              )}
              <div
                className={`w-full rounded-sm transition-all duration-300 ${
                  isGold
                    ? 'bg-[#FFD700] border border-[#1A1A1A] shadow-[1px_1px_0px_#1A1A1A]'
                    : 'bg-[#1A1A1A] group-hover:bg-[#6366F1]'
                }`}
                style={{ height: `${height}%` }}
              ></div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-end">
        <div className="stat-value text-2xl text-[#1A1A1A]">
          {(pts / 1000).toFixed(1)}k <span className="text-xs font-bold text-neutral-400">pts</span>
        </div>
        <span className="text-[10px] font-bold text-green-600 bg-green-100 border border-green-300 px-1.5 py-0.5 rounded">
          +18% VS LAST SPRINT
        </span>
      </div>
    </div>
  );
};
