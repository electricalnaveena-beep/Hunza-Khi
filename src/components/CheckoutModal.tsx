import React, { useState } from 'react';
import { X, CheckCircle2, Truck, ShieldCheck, Phone, MapPin, CreditCard, Building } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Hyderabad',
  'Gujranwala',
  'Abbottabad',
  'Gilgit',
  'Hunza',
  'Skardu',
  'Other City',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('0300-');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'bank'>('cod');
  const [notes, setNotes] = useState('');

  const shippingFee = subtotal >= 2500 ? 0 : 200;
  const totalPKR = Math.max(0, subtotal - discountAmount) + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) return;

    const orderId = `HH-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const order: OrderDetails = {
      orderId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      city,
      address: address.trim(),
      paymentMethod,
      notes: notes.trim(),
      items,
      subtotalPKR: subtotal,
      shippingFeePKR: shippingFee,
      discountPKR: discountAmount,
      totalPKR,
      date: dateStr,
      estimatedDelivery: city === 'Karachi' ? '24 Hours (Express)' : '2-3 Working Days',
    };

    onOrderPlaced(order);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[24px] w-full max-w-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-[#FFD700] border-b-2 border-[#1A1A1A] flex justify-between items-center">
          <div>
            <span className="px-2.5 py-0.5 bg-black text-white text-[10px] font-black rounded uppercase">
              EXPRESS CASH ON DELIVERY
            </span>
            <h3 className="text-xl font-black text-[#1A1A1A]">Checkout & Address Details</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white hover:bg-black flex items-center justify-center font-bold border border-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tariq Mahmood"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2.5 rounded-xl text-xs font-bold text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                Mobile / WhatsApp Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="0300-1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2.5 rounded-xl text-xs font-bold text-[#1A1A1A] focus:outline-none"
              />
            </div>
          </div>

          {/* Location & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2.5 rounded-xl text-xs font-bold text-[#1A1A1A]"
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
                Complete Street Address / House / Flat *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. House 42, Street 8, Phase 6, DHA, Karachi"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2.5 rounded-xl text-xs font-bold text-[#1A1A1A] focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1.5">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border-2 border-[#1A1A1A] text-left transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_#1A1A1A]'
                    : 'bg-white hover:bg-neutral-50 text-[#1A1A1A]'
                }`}
              >
                <Truck className="w-4 h-4 mb-1" />
                <span className="block text-xs font-black">Cash on Delivery</span>
                <span className="text-[9px] font-bold text-neutral-600">Pay when delivered</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-3 rounded-xl border-2 border-[#1A1A1A] text-left transition-all cursor-pointer ${
                  paymentMethod === 'jazzcash'
                    ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_#1A1A1A]'
                    : 'bg-white hover:bg-neutral-50 text-[#1A1A1A]'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-1" />
                <span className="block text-xs font-black">JazzCash</span>
                <span className="text-[9px] font-bold text-neutral-600">Direct wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('easypaisa')}
                className={`p-3 rounded-xl border-2 border-[#1A1A1A] text-left transition-all cursor-pointer ${
                  paymentMethod === 'easypaisa'
                    ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_#1A1A1A]'
                    : 'bg-white hover:bg-neutral-50 text-[#1A1A1A]'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-1" />
                <span className="block text-xs font-black">EasyPaisa</span>
                <span className="text-[9px] font-bold text-neutral-600">Direct wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`p-3 rounded-xl border-2 border-[#1A1A1A] text-left transition-all cursor-pointer ${
                  paymentMethod === 'bank'
                    ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_#1A1A1A]'
                    : 'bg-white hover:bg-neutral-50 text-[#1A1A1A]'
                }`}
              >
                <Building className="w-4 h-4 mb-1" />
                <span className="block text-xs font-black">Bank Transfer</span>
                <span className="text-[9px] font-bold text-neutral-600">Meezan / HBL</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-1">
              Order Notes / Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Call before delivery, leave with building gate guard..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-neutral-50 border-2 border-[#1A1A1A] px-3 py-2 rounded-xl text-xs font-bold text-[#1A1A1A]"
            />
          </div>

          {/* Order Summary Confirmation Box */}
          <div className="bg-neutral-100 border-2 border-[#1A1A1A] p-4 rounded-2xl space-y-1 text-xs font-bold">
            <div className="flex justify-between text-neutral-600">
              <span>Items Total ({items.length})</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span>- PKR {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Nationwide Express Courier Fee</span>
              <span>{shippingFee === 0 ? 'FREE' : `PKR ${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-black text-[#1A1A1A] pt-2 border-t-2 border-[#1A1A1A]">
              <span>Payable Amount</span>
              <span>PKR {totalPKR.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border-2 border-[#1A1A1A] text-xs font-bold rounded-xl hover:bg-neutral-100 cursor-pointer"
            >
              Back to Cart
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1A1A1A] hover:bg-black text-[#FFD700] text-xs font-black rounded-xl shadow-[3px_3px_0px_#1A1A1A] flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
              <span>Confirm & Place Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
