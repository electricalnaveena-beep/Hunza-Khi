import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleModal: React.FC<WholesaleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('0300-');
  const [city, setCity] = useState('Karachi');
  const [monthlyVolume, setMonthlyVolume] = useState('50kg - 200kg');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[24px] w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 bg-[#1A1A1A] text-white border-b-2 border-[#1A1A1A] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#FFD700]" />
            <div>
              <h3 className="text-lg font-black text-[#FFD700]">Commercial Wholesale & B2B Supply</h3>
              <p className="text-[10px] font-bold text-neutral-400">Direct Factory Rates for Restaurants & Caterers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold border border-white/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#FFD700] border-2 border-[#1A1A1A] rounded-full flex items-center justify-center text-3xl mx-auto shadow-[2px_2px_0px_#1A1A1A]">
              ✅
            </div>
            <h4 className="text-xl font-black text-[#1A1A1A]">Wholesale Inquiry Received!</h4>
            <p className="text-xs text-neutral-600 font-semibold max-w-md mx-auto">
              Our B2B Sales Executive from the Korangi Karachi plant will call you on <strong>{phone}</strong> within 2 hours with customized rate cards and free sample packs.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-black rounded-xl border border-black cursor-pointer hover:bg-black"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-3">
            <div className="p-3 bg-[#FFD700]/20 border-2 border-[#1A1A1A] rounded-2xl text-xs font-bold text-[#1A1A1A]">
              ⚡ Commercial Supply of Dehydrated Red Onion Flakes, Garlic Powder & Tomato Powder available in 5kg, 25kg & 50kg sacks.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                  Business / Restaurant Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Student Biryani / Karachi Caterers"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chef Asif"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                Estimated Monthly Requirement Volume
              </label>
              <select
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(e.target.value)}
                className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold text-[#1A1A1A]"
              >
                <option value="25kg - 50kg">25kg - 50kg per month</option>
                <option value="50kg - 200kg">50kg - 200kg per month</option>
                <option value="200kg - 1 Ton">200kg - 1 Ton per month</option>
                <option value="Above 1 Ton (Export / Industrial)">Above 1 Ton (Export / Industrial)</option>
              </select>
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
                className="px-5 py-2.5 bg-[#FFD700] border-2 border-[#1A1A1A] text-[#1A1A1A] text-xs font-black rounded-xl shadow-[2px_2px_0px_#1A1A1A] hover:bg-[#ffe033] flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-black" />
                <span>Submit B2B Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
