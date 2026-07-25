import React from 'react';
import { Layers, Users, CheckSquare, Plus } from 'lucide-react';
import { TaskItem } from '../types';

interface ActiveSprintCardProps {
  tasks: TaskItem[];
  onOpenNewTask: () => void;
  onToggleTask: (id: string) => void;
}

export const ActiveSprintCard: React.FC<ActiveSprintCardProps> = ({
  tasks,
  onOpenNewTask,
  onToggleTask,
}) => {
  const teamMembers = [
    { initials: 'AK', bg: 'bg-orange-400' },
    { initials: 'MR', bg: 'bg-blue-400' },
    { initials: 'SL', bg: 'bg-green-400' },
    { initials: 'DR', bg: 'bg-purple-400' },
  ];

  return (
    <div className="bento-card col-span-1 md:col-span-2 row-span-1 p-6 bg-white flex-col justify-between">
      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-neutral-400 text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#1A1A1A]" />
            Active Sprint
          </span>
          <h3 className="text-xl font-extrabold text-[#1A1A1A]">
            Alpha Phase: Assets & UI Components
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-full border-2 border-[#1A1A1A] ${member.bg} flex items-center justify-center text-xs font-black text-black shadow-[1px_1px_0px_#1A1A1A]`}
                title={`Team Member ${member.initials}`}
              >
                {member.initials}
              </div>
            ))}
            <div className="w-9 h-9 rounded-full border-2 border-[#1A1A1A] bg-white flex items-center justify-center text-[10px] font-black text-[#1A1A1A] shadow-[1px_1px_0px_#1A1A1A]">
              +5
            </div>
          </div>

          <button
            onClick={onOpenNewTask}
            className="w-9 h-9 rounded-full border-2 border-[#1A1A1A] bg-[#FFD700] hover:bg-[#ffe033] flex items-center justify-center text-[#1A1A1A] shadow-[1px_1px_0px_#1A1A1A] transition-transform active:scale-95 cursor-pointer"
            title="Add Task to Sprint"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
        {tasks.slice(0, 2).map((t) => (
          <div
            key={t.id}
            onClick={() => onToggleTask(t.id)}
            className={`p-3 rounded-xl border-2 border-[#1A1A1A] cursor-pointer transition-all ${
              t.completed
                ? 'bg-neutral-100 text-neutral-400 border-neutral-300'
                : 'bg-neutral-50 hover:bg-white text-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="truncate pr-2">{t.title}</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-white border border-[#1A1A1A] rounded text-[#1A1A1A]">
                {t.assignee}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-500">
              <CheckSquare
                className={`w-3.5 h-3.5 ${
                  t.completed ? 'text-green-600' : 'text-neutral-400'
                }`}
              />
              <span>{t.completed ? 'Completed' : 'Pending Action'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
