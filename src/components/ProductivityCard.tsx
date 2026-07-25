import React from 'react';
import { TrendingUp, Plus, Minus } from 'lucide-react';

interface ProductivityCardProps {
  value: number;
  onUpdate: (newValue: number) => void;
}

export const ProductivityCard: React.FC<ProductivityCardProps> = ({ value, onUpdate }) => {
  return (
    <div className="bento-card col-span-1 row-span-1 p-6 justify-between bg-[#6366F1] text-white border-[#1A1A1A] relative group">
      <div className="flex justify-between items-start">
        <span className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" />
          Productivity
        </span>
        <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-300">LIVE</span>
        </div>
      </div>

      <div className="my-2 flex items-baseline justify-between">
        <div className="stat-value text-4xl sm:text-5xl text-white tracking-tight">
          {value}%
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onUpdate(Math.max(1, value - 1))}
            className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 border border-white/40 flex items-center justify-center text-white text-xs font-bold transition-all active:scale-95 cursor-pointer"
            title="Decrease Productivity Metric"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onUpdate(Math.min(100, value + 1))}
            className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 border border-white/40 flex items-center justify-center text-white text-xs font-bold transition-all active:scale-95 cursor-pointer"
            title="Increase Productivity Metric"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/80">
          <span>Weekly Target: 90%</span>
          <span>{value >= 90 ? 'Exceeded ⚡' : 'In Progress'}</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden border border-white/30">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
