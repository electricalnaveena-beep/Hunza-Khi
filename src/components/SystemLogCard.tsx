import React, { useState, useEffect } from 'react';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

interface SystemLogCardProps {
  onOpenLogs: () => void;
  logCount: number;
}

export const SystemLogCard: React.FC<SystemLogCardProps> = ({ onOpenLogs, logCount }) => {
  const [timeStr, setTimeStr] = useState<string>('03:22');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bento-card col-span-1 row-span-1 p-6 bg-[#FFD700] text-[#1A1A1A]">
      <div className="h-full flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-[#1A1A1A]" />
            System Log
          </span>
          <span className="text-xs font-mono font-black bg-black text-[#FFD700] px-2 py-0.5 rounded border border-black">
            {timeStr}
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Shield className="w-4 h-4 text-black fill-black" />
            <span className="text-[10px] font-black uppercase tracking-wider text-black/70">
              HEALTH CHECK OK
            </span>
          </div>
          <p className="text-sm font-extrabold leading-tight">
            All clusters performing at peak efficiency.
          </p>
        </div>

        <button
          onClick={onOpenLogs}
          className="w-full py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold rounded-xl shadow-[2px_2px_0px_#1A1A1A] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>VIEW LOGS ({logCount})</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FFD700]" />
        </button>
      </div>
    </div>
  );
};
