import React, { useState } from 'react';
import { X, Terminal, CheckCircle, AlertTriangle, Info, Plus } from 'lucide-react';
import { SystemLogEntry } from '../types';

interface SystemLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: SystemLogEntry[];
  onAddLog: (msg: string, level: 'INFO' | 'SUCCESS' | 'WARN') => void;
}

export const SystemLogModal: React.FC<SystemLogModalProps> = ({
  isOpen,
  onClose,
  logs,
  onAddLog,
}) => {
  if (!isOpen) return null;

  const [filter, setFilter] = useState<'ALL' | 'INFO' | 'SUCCESS' | 'WARN'>('ALL');
  const [newMsg, setNewMsg] = useState('');
  const [newLevel, setNewLevel] = useState<'INFO' | 'SUCCESS' | 'WARN'>('INFO');

  const filteredLogs = logs.filter(
    (log) => filter === 'ALL' || log.level === filter
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    onAddLog(newMsg.trim(), newLevel);
    setNewMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[24px] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6 bg-[#FFD700] border-b-2 border-[#1A1A1A] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white">
              <Terminal className="w-4 h-4 text-[#FFD700]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#1A1A1A]">System Cluster Logs</h3>
              <p className="text-xs font-bold text-black/70">StudioOS Real-Time Audit Stream</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white hover:bg-black flex items-center justify-center font-bold border border-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="flex bg-neutral-100 border-2 border-[#1A1A1A] rounded-full p-1">
              {(['ALL', 'INFO', 'SUCCESS', 'WARN'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilter(lvl)}
                  className={`px-3 py-0.5 rounded-full text-xs font-extrabold transition-colors cursor-pointer ${
                    filter === lvl
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-[#1A1A1A] hover:bg-neutral-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-neutral-500">
              Showing {filteredLogs.length} entries
            </span>
          </div>

          <div className="bg-[#1A1A1A] text-green-400 font-mono text-xs rounded-2xl p-4 border-2 border-[#1A1A1A] h-64 overflow-y-auto space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-2 border-b border-neutral-800 pb-1.5 last:border-0"
              >
                <span className="text-neutral-500 text-[10px] shrink-0 pt-0.5">
                  [{log.timestamp}]
                </span>
                <span
                  className={`px-1.5 py-0.2 text-[9px] font-black rounded shrink-0 ${
                    log.level === 'SUCCESS'
                      ? 'bg-green-900 text-green-300'
                      : log.level === 'WARN'
                      ? 'bg-amber-900 text-amber-300'
                      : 'bg-blue-900 text-blue-300'
                  }`}
                >
                  {log.level}
                </span>
                <span className="text-neutral-200 break-words">{log.message}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value as any)}
              className="bg-white border-2 border-[#1A1A1A] font-extrabold text-xs px-3 py-2 rounded-xl"
            >
              <option value="INFO">INFO</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="WARN">WARN</option>
            </select>
            <input
              type="text"
              placeholder="Inject custom log event..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 bg-white border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFD700] border-2 border-[#1A1A1A] text-[#1A1A1A] font-extrabold text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A] hover:bg-[#ffe033] cursor-pointer shrink-0"
            >
              Add Log
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
