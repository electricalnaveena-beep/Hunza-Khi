import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, MapPin, Truck, PhoneCall, HelpCircle, Building2, Flame, Palette, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenCalculator: () => void;
  onOpenStory: () => void;
  onOpenWholesale: () => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenCalculator,
  onOpenStory,
  onOpenWholesale,
  currentTheme,
  onThemeChange,
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'dried-fruits', label: 'Hunza Dried Fruits' },
    { id: 'banana-chips', label: 'Banana Chips' },
    { id: 'dehydrated-veggies', label: 'Dehydrated Veggies' },
    { id: 'gift-boxes', label: 'Gift Boxes' },
    { id: 'commercial-bulk', label: 'Wholesale / Bulk' },
  ];

  const themeOptions: { id: ThemeMode; label: string; icon: string; bgBadge: string }[] = [
    { id: 'emerald', label: 'Emerald Organic', icon: '🌿', bgBadge: 'bg-emerald-700 text-white' },
    { id: 'neubrutalist', label: 'Hunza Pop (Bento)', icon: '⚡', bgBadge: 'bg-[#FFD700] text-black' },
    { id: 'midnight', label: 'Midnight Alpine', icon: '🌙', bgBadge: 'bg-slate-900 text-amber-400' },
    { id: 'terracotta', label: 'Terracotta Sunset', icon: '🌅', bgBadge: 'bg-orange-700 text-white' },
  ];

  const currentThemeObj = themeOptions.find((t) => t.id === currentTheme) || themeOptions[0];

  return (
    <header className="flex flex-col gap-3">
      {/* Top COD Announcement Bar */}
      <div className="bg-[#1A1A1A] text-white px-4 py-2 rounded-2xl flex flex-col sm:flex-row justify-between items-center text-xs font-bold gap-2 border-2 border-black shadow-[2px_2px_0px_#1A1A1A]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#FFD700] text-black font-black text-[10px] rounded uppercase">
            EXPRESS COD
          </span>
          <span className="truncate">
            ⚡ Cash on Delivery Across Pakistan | Free Delivery on Orders Above PKR 2,500
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold text-neutral-300">
          <span className="flex items-center gap-1 text-[#FFD700]">
            <MapPin className="w-3.5 h-3.5" />
            Processed in Korangi, Karachi
          </span>
          <a href="tel:+923001234567" className="hover:text-white flex items-center gap-1 text-white">
            <PhoneCall className="w-3 h-3 text-[#FFD700]" />
            0300-HUNZA-00
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] rounded-[24px] p-4 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Brand Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedCategory('all')}>
            <div className="w-12 h-12 bg-[#FFD700] border-2 border-[#1A1A1A] rounded-2xl flex items-center justify-center font-black text-2xl shadow-[2px_2px_0px_#1A1A1A]">
              🏔️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight font-serif">
                  Hunza Harvest
                </h1>
                <span className="px-2 py-0.5 bg-[#6366F1] text-white text-[10px] font-extrabold rounded-md uppercase">
                  100% ORGANIC
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-bold tracking-tight">
                Hunza Valley Roots • Korangi Karachi Processing
              </p>
            </div>
          </div>

          {/* Mobile Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="md:hidden relative px-4 py-2 bg-[#FFD700] border-2 border-[#1A1A1A] rounded-2xl font-black text-xs flex items-center gap-2 shadow-[2px_2px_0px_#1A1A1A]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dried apricots, banana chips, dehydrated onions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl text-xs font-bold text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
        </div>

        {/* Action Buttons, Theme Switcher & Desktop Cart */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Theme Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 border-2 border-[#1A1A1A] rounded-2xl text-xs font-extrabold text-[#1A1A1A] flex items-center gap-1.5 shadow-[2px_2px_0px_#1A1A1A] cursor-pointer whitespace-nowrap"
              title="Change Visual Theme"
            >
              <Palette className="w-4 h-4 text-[#6366F1]" />
              <span className="hidden sm:inline">Theme:</span>
              <span className="font-black">{currentThemeObj.icon} {currentThemeObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Theme Dropdown Menu */}
            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_#1A1A1A] z-50 p-2 space-y-1">
                <div className="px-3 py-1 text-[10px] font-black uppercase text-neutral-400 border-b border-neutral-200">
                  Select Visual Style
                </div>
                {themeOptions.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsThemeMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                      currentTheme === theme.id
                        ? 'bg-[#1A1A1A] text-white'
                        : 'hover:bg-neutral-100 text-[#1A1A1A]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{theme.icon}</span>
                      <span>{theme.label}</span>
                    </span>
                    {currentTheme === theme.id && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenCalculator}
            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 border-2 border-[#1A1A1A] rounded-2xl text-xs font-extrabold text-[#1A1A1A] flex items-center gap-1.5 shadow-[2px_2px_0px_#1A1A1A] cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            <span>Veggie Saver Calc</span>
          </button>

          <button
            onClick={onOpenStory}
            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 border-2 border-[#1A1A1A] rounded-2xl text-xs font-extrabold text-[#1A1A1A] flex items-center gap-1.5 shadow-[2px_2px_0px_#1A1A1A] cursor-pointer whitespace-nowrap"
          >
            <span>Our Hunza Origin</span>
          </button>

          <button
            onClick={onOpenWholesale}
            className="px-3.5 py-2 bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] rounded-2xl text-xs font-extrabold flex items-center gap-1.5 shadow-[2px_2px_0px_#1A1A1A] hover:bg-black cursor-pointer whitespace-nowrap"
          >
            <Building2 className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>Bulk / Restaurant</span>
          </button>

          <button
            onClick={onOpenCart}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#FFD700] hover:bg-[#ffe033] border-2 border-[#1A1A1A] text-[#1A1A1A] font-extrabold text-xs rounded-2xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Cart</span>
            <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-black ml-1">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Category Navigation Bar & Quick Theme Bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A] transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1A1A] text-white shadow-[3px_3px_0px_#6366F1]'
                  : 'bg-white text-[#1A1A1A] hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Theme Selector Pill Bar */}
        <div className="hidden lg:flex items-center gap-1 bg-white border-2 border-[#1A1A1A] rounded-2xl p-1 shadow-[2px_2px_0px_#1A1A1A] shrink-0">
          <Palette className="w-3.5 h-3.5 text-neutral-500 ml-1.5" />
          {themeOptions.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                currentTheme === theme.id
                  ? 'bg-[#1A1A1A] text-white border-black shadow-xs'
                  : 'bg-neutral-100 text-[#1A1A1A] border-transparent hover:bg-neutral-200'
              }`}
            >
              {theme.icon} {theme.id}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
