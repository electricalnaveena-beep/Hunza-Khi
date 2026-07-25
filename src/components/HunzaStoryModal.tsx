import React from 'react';
import { X, MapPin, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/products';

interface HunzaStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HunzaStoryModal: React.FC<HunzaStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[24px] w-full max-w-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header Banner */}
        <div className="relative h-48 border-b-2 border-[#1A1A1A]">
          <img
            src={HERO_BANNER_IMAGE}
            alt="Hunza Valley Mountain Landscape"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
            <span className="px-2.5 py-0.5 bg-[#FFD700] text-black text-[10px] font-black rounded uppercase w-fit mb-1">
              HERITAGE & CRAFT
            </span>
            <h3 className="text-2xl font-black font-serif text-[#FFD700]">
              From the Karakoram Mountains to Karachi Kitchens
            </h3>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/80 text-white hover:bg-black flex items-center justify-center font-bold border border-white/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs font-semibold leading-relaxed text-neutral-700">
          <div className="p-4 bg-[#FFD700]/20 border-2 border-[#1A1A1A] rounded-2xl">
            <h4 className="text-sm font-black text-[#1A1A1A] mb-1 font-serif">
              The Hunza Valley Longevity Secret
            </h4>
            <p>
              Tucked high in the Karakoram range of Gilgit-Baltistan, Hunza Valley is globally renowned for its centenarians and disease-free longevity. For centuries, the native diet has relied on sun-cured organic apricots, wild white mulberries, and nutrient-rich kernel seeds harvested from pesticide-free high mountain air.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl">
              <div className="flex items-center gap-2 text-sm font-black text-[#1A1A1A] mb-1">
                <MapPin className="w-4 h-4 text-[#6366F1]" />
                1. High Altitude Harvest
              </div>
              <p className="text-[11px] text-neutral-600">
                Grown in mineral-rich glacier water without synthetic pesticides or chemical fertilizers. Sun-dried traditionally on clean mountain rooftops.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl">
              <div className="flex items-center gap-2 text-sm font-black text-[#1A1A1A] mb-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                2. Korangi Karachi Processing
              </div>
              <p className="text-[11px] text-neutral-600">
                Transported directly to our state-of-the-art hygienic plant in Korangi Industrial Zone, Karachi for low-temp dehydration, strict sorting, and airtight sealing.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#6366F1] text-white border-2 border-[#1A1A1A] rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-sm font-black block">100% Express Cash on Delivery</span>
              <span className="text-[10px] text-white/80">Delivering fresh batch packages daily across Pakistan</span>
            </div>
            <span className="text-2xl">⚡</span>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-black rounded-xl border border-black cursor-pointer hover:bg-black"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
