import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Circle, Sparkles, Folder } from 'lucide-react';
import { TaskItem } from '../types';

interface FeaturedProjectCardProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  tasks,
  onToggleTask,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'deliverables'>('overview');
  
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 p-6 md:p-8 relative overflow-hidden bg-white group">
      {/* Background Decorative Rings from Design */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[16px] border-[#6366F1] rounded-full opacity-15 pointer-events-none transition-transform group-hover:scale-105"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFD700] rounded-full mix-blend-multiply opacity-25 pointer-events-none transition-transform group-hover:scale-110"></div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-[#6366F1]" />
              Featured Project
            </span>
            <span className="px-2.5 py-1 bg-[#1A1A1A] text-white text-[10px] font-black rounded-full border border-[#1A1A1A]">
              ACTIVE PHASE 2
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-[1.08] tracking-tight mb-4">
            Lumina Digital
            <br />
            <span className="text-[#6366F1]">Brand Identity</span>
          </h2>

          <p className="text-sm text-neutral-600 font-medium max-w-md mb-6 leading-relaxed">
            Next-gen design system and responsive digital footprint overhaul for Lumina AI enterprise platform.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
              DESIGN
            </span>
            <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
              DEVELOPMENT
            </span>
            <span className="px-3 py-1 bg-[#FFD700] text-[#1A1A1A] border border-[#1A1A1A] text-[10px] font-bold rounded-md uppercase tracking-wider">
              DESIGN SYSTEM
            </span>
          </div>
        </div>

        {/* Milestone Progress Section */}
        <div className="mt-auto bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl p-4 shadow-[2px_2px_0px_#1A1A1A]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase text-[#1A1A1A]">
              Milestones Progress ({completedCount}/{tasks.length})
            </span>
            <span className="stat-value text-sm text-[#6366F1]">{progressPercent}%</span>
          </div>

          <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden border border-[#1A1A1A] mb-3">
            <div
              className="h-full bg-[#6366F1] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Key Deliverables Checkable */}
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {tasks.slice(0, 3).map((task) => (
              <button
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className="w-full text-left flex items-center justify-between p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#1A1A1A] transition-all group/item text-xs font-semibold text-[#1A1A1A]"
              >
                <div className="flex items-center gap-2">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 fill-green-100 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-neutral-400 group-hover/item:text-[#1A1A1A] shrink-0" />
                  )}
                  <span className={task.completed ? 'line-through text-neutral-400' : ''}>
                    {task.title}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-neutral-200 rounded text-neutral-600 uppercase">
                  {task.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
