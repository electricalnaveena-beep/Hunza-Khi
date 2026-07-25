import React from 'react';
import { ShieldCheck, Truck, Clock, Sparkles, ArrowRight, HeartPulse, Award, Flame } from 'lucide-react';
import { HERO_BANNER_IMAGE, VEGGIE_PACK_IMAGE } from '../data/products';
import { Product } from '../types';

interface HeroBentoProps {
  onSelectFeaturedProduct: (productId: string) => void;
  onOpenCalculator: () => void;
  onOpenStory: () => void;
}

export const HeroBento: React.FC<HeroBentoProps> = ({
  onSelectFeaturedProduct,
  onOpenCalculator,
  onOpenStory,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Main Large Hero Card (2x2 on Desktop) */}
      <div className="bento-card col-span-1 md:col-span-2 row-span-1 md:row-span-2 p-6 sm:p-8 relative overflow-hidden bg-white group min-h-[360px]">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-25 transition-opacity">
          <img
            src={HERO_BANNER_IMAGE}
            alt="Hunza Valley Sun Dried Fruits"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Decorative Floating Circles */}
        <div className="absolute -bottom-12 -right-12 w-64 h-64 border-[18px] border-[#6366F1] rounded-full opacity-10 pointer-events-none"></div>
        <div className="absolute top-8 right-8 w-28 h-28 bg-[#FFD700] rounded-full mix-blend-multiply opacity-30 pointer-events-none"></div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                DIRECT FROM HUNZA VALLEY
              </span>
              <span className="px-2.5 py-1 bg-[#FFD700] border border-[#1A1A1A] text-black text-[10px] font-black rounded-full uppercase tracking-wider">
                PROCESSED IN KORANGI, KARACHI
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-[1.08] tracking-tight mb-4 font-serif">
              Pure Mountain Harvest.
              <br />
              <span className="text-[#6366F1]">Zero Preservatives.</span>
            </h2>

            <p className="text-sm text-neutral-700 font-semibold max-w-md leading-relaxed mb-6">
              Sun-dried organic apricots, crunchy banana chips, and high-yield dehydrated vegetables. Hygienically packed in Karachi & delivered express COD across Pakistan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t-2 border-[#1A1A1A]">
            <button
              onClick={() => onSelectFeaturedProduct('hunza-apricots-sun-dried')}
              className="px-6 py-3 bg-[#FFD700] hover:bg-[#ffe033] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-xs rounded-2xl shadow-[3px_3px_0px_#1A1A1A] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <span>Shop Sun-Dried Apricots</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={onOpenStory}
              className="px-5 py-3 bg-white hover:bg-neutral-100 border-2 border-[#1A1A1A] text-[#1A1A1A] font-extrabold text-xs rounded-2xl shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Our Hunza Heritage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card 2: Express COD Guarantee (1x1 Indigo) */}
      <div className="bento-card col-span-1 row-span-1 p-6 bg-[#6366F1] text-white border-[#1A1A1A] justify-between relative">
        <div className="flex justify-between items-start">
          <span className="text-white/80 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            LOGISTICS
          </span>
          <span className="px-2 py-0.5 bg-green-400 text-black text-[9px] font-black rounded uppercase">
            NATIONWIDE
          </span>
        </div>

        <div className="my-2">
          <div className="stat-value text-3xl font-black text-white mb-1">
            Express COD
          </div>
          <p className="text-xs font-semibold text-white/90 leading-tight">
            24-48 Hour Delivery in Karachi, Lahore, Islamabad, & All Cities across Pakistan.
          </p>
        </div>

        <div className="pt-2 border-t border-white/20 flex justify-between items-center text-[10px] font-extrabold text-white/90">
          <span>Free Ship &gt; PKR 2,500</span>
          <span>Cash On Delivery ⚡</span>
        </div>
      </div>

      {/* Card 3: Dehydrated Veggie Efficiency Saver (1x1 White Bar/Stat) */}
      <div className="bento-card col-span-1 row-span-1 p-6 bg-white justify-between">
        <div className="flex justify-between items-start">
          <span className="text-neutral-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
            KITCHEN YIELD
          </span>
          <span className="px-2 py-0.5 bg-[#FFD700] border border-[#1A1A1A] text-black text-[9px] font-black rounded">
            10x YIELD
          </span>
        </div>

        <div className="my-1">
          <div className="stat-value text-4xl font-black text-[#1A1A1A]">
            100g = 1kg
          </div>
          <p className="text-xs font-bold text-neutral-600">
            Dehydrated Red Onion Flakes replace 1kg fresh produce. Zero crying or prep!
          </p>
        </div>

        <button
          onClick={onOpenCalculator}
          className="w-full py-2 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold rounded-xl shadow-[2px_2px_0px_#1A1A1A] cursor-pointer"
        >
          Calculate Your Savings
        </button>
      </div>

      {/* Card 4: Organic & Quality Certified (1x1 Yellow) */}
      <div className="bento-card col-span-1 row-span-1 p-6 bg-[#FFD700] text-[#1A1A1A] justify-between">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#1A1A1A]" />
            HYGIENE & PURITY
          </span>
          <span className="text-xs font-extrabold bg-black text-white px-2 py-0.5 rounded">
            KORANGI PLANT
          </span>
        </div>

        <div className="my-2">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-black" />
            <span className="text-base font-black">100% Sulfur-Free</span>
          </div>
          <p className="text-xs font-extrabold text-black/80">
            Processed in airtight stainless-steel dehydration chambers under strict food safety standards.
          </p>
        </div>

        <div className="flex items-center justify-between text-[10px] font-black uppercase border-t border-black/20 pt-2">
          <span>Lab Tested</span>
          <span>18-Month Shelf Life</span>
        </div>
      </div>

      {/* Card 5: Flash Deal Spotlight (1x1 Black) */}
      <div
        onClick={() => onSelectFeaturedProduct('dehydrated-red-onion-flakes')}
        className="bento-card col-span-1 row-span-1 p-6 bg-[#1A1A1A] text-white justify-between cursor-pointer group hover:border-[#FFD700] transition-colors"
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] font-black tracking-widest uppercase text-neutral-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#FFD700]" />
            HOT ITEM
          </span>
          <span className="text-[10px] font-mono text-[#FFD700] bg-white/10 px-2 py-0.5 rounded font-black">
            SAVE 20%
          </span>
        </div>

        <div className="my-2 flex items-center gap-3">
          <img
            src={VEGGIE_PACK_IMAGE}
            alt="Dehydrated Red Onion Flakes"
            className="w-16 h-16 rounded-xl border-2 border-white/20 object-cover shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="text-sm font-black text-[#FFD700] group-hover:underline">
              Red Onion Flakes
            </h4>
            <p className="text-[11px] text-neutral-300 font-semibold line-clamp-2">
              Grade A Korangi dehydrated onion flakes for quick curries & biryani.
            </p>
            <div className="text-xs font-extrabold text-white mt-1">
              PKR 650 <span className="line-through text-neutral-500 text-[10px]">PKR 800</span>
            </div>
          </div>
        </div>

        <div className="w-full text-right text-[10px] font-black text-[#FFD700] uppercase tracking-wider">
          TAP TO VIEW & BUY →
        </div>
      </div>
    </section>
  );
};
