import React, { useState } from 'react';
import { X, Plus, CheckSquare } from 'lucide-react';
import { TaskItem } from '../types';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('AK');
  const [category, setCategory] = useState<'DESIGN' | 'DEVELOPMENT' | 'RESEARCH'>('DESIGN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      title: title.trim(),
      completed: false,
      assignee,
      category,
    });
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[24px] w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 bg-[#6366F1] text-white border-b-2 border-[#1A1A1A] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-white" />
            <h3 className="text-lg font-black tracking-tight">Create Studio Task</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center font-bold border border-white/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1.5">
              Task Title / Deliverable
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design System Iconography"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-50 border-2 border-[#1A1A1A] p-3 rounded-xl text-xs font-bold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-neutral-50 border-2 border-[#1A1A1A] p-2.5 rounded-xl text-xs font-bold text-[#1A1A1A]"
              >
                <option value="DESIGN">DESIGN</option>
                <option value="DEVELOPMENT">DEVELOPMENT</option>
                <option value="RESEARCH">RESEARCH</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1.5">
                Assignee Initials
              </label>
              <input
                type="text"
                maxLength={3}
                value={assignee}
                onChange={(e) => setAssignee(e.target.value.toUpperCase())}
                className="w-full bg-neutral-50 border-2 border-[#1A1A1A] p-2.5 rounded-xl text-xs font-bold text-[#1A1A1A] uppercase text-center"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border-2 border-[#1A1A1A] text-xs font-bold rounded-xl hover:bg-neutral-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#FFD700] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-black rounded-xl shadow-[2px_2px_0px_#1A1A1A] hover:bg-[#ffe033] cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
