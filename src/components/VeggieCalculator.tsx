import React, { useState } from 'react';
import { X, Sparkles, Scale, Clock, Trash2, CheckCircle2 } from 'lucide-react';

interface VeggieCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const VeggieCalculator: React.FC<VeggieCalculatorProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [weeklyKgFreshOnions, setWeeklyKgFreshOnions] = useState<number>(5);

  const dehydratedWeightGrams = weeklyKgFreshOnions * 100; // 1kg fresh = 100g dehydrated
  const prepMinutesSaved = weeklyKgFreshOnions * 25; // ~25 mins chopping/peeling per kg
  const wasteSavedKg = (weeklyKgFreshOnions * 0.25).toFixed(1); // 25% peel waste saved

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[24px] w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 bg-[#6366F1] text-white border-b-2 border-[#1A1A1A] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
            <h3 className="text-lg font-black font-serif">Kitchen Yield & Savings Calculator</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center font-bold border border-white/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-2">
              How many kilograms of raw fresh onions does your household/kitchen use weekly?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="50"
                value={weeklyKgFreshOnions}
                onChange={(e) => setWeeklyKgFreshOnions(Number(e.target.value))}
                className="flex-1 h-3 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#6366F1]"
              />
              <span className="stat-value text-2xl font-black text-[#1A1A1A] w-16 text-right">
                {weeklyKgFreshOnions} kg
              </span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-[#FFD700] border-2 border-[#1A1A1A] rounded-2xl shadow-[2px_2px_0px_#1A1A1A]">
              <span className="text-[10px] font-black uppercase text-black block mb-1">
                Dehydrated Needed
              </span>
              <div className="stat-value text-2xl text-black">
                {dehydratedWeightGrams >= 1000
                  ? `${(dehydratedWeightGrams / 1000).toFixed(1)} kg`
                  : `${dehydratedWeightGrams} g`}
              </div>
              <span className="text-[9px] font-bold text-black/70">100% Pure Flakes</span>
            </div>

            <div className="p-4 bg-neutral-100 border-2 border-[#1A1A1A] rounded-2xl shadow-[2px_2px_0px_#1A1A1A]">
              <span className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                Chopping Time Saved
              </span>
              <div className="stat-value text-2xl text-[#1A1A1A]">
                {prepMinutesSaved >= 60
                  ? `${(prepMinutesSaved / 60).toFixed(1)} hrs`
                  : `${prepMinutesSaved} mins`}
              </div>
              <span className="text-[9px] font-bold text-neutral-500">No tears or peeling</span>
            </div>

            <div className="p-4 bg-neutral-100 border-2 border-[#1A1A1A] rounded-2xl shadow-[2px_2px_0px_#1A1A1A]">
              <span className="text-[10px] font-black uppercase text-neutral-500 block mb-1">
                Peel Waste Saved
              </span>
              <div className="stat-value text-2xl text-green-700">
                {wasteSavedKg} kg
              </div>
              <span className="text-[9px] font-bold text-neutral-500">Zero kitchen garbage</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl text-xs font-semibold leading-relaxed">
            <div className="font-black text-[#1A1A1A] mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Why Dehydrated Red Onions are Superior:
            </div>
            Dehydrated onion flakes retain 100% natural sugars and flavor compounds. When tossed into hot ghee or water, they rehydrate instantly, giving you crisp golden birishta in seconds!
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 border-2 border-[#1A1A1A] text-xs font-bold rounded-xl hover:bg-neutral-100 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectProduct('dehydrated-red-onion-flakes');
              }}
              className="px-5 py-2.5 bg-[#FFD700] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-black rounded-xl shadow-[2px_2px_0px_#1A1A1A] hover:bg-[#ffe033] cursor-pointer"
            >
              Shop Dehydrated Red Onions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
