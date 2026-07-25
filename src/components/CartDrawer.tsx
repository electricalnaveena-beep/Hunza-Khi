import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  appliedDiscount: number; // e.g. 0.1 for 10%
  setAppliedDiscount: (discount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  setDiscountCode,
  appliedDiscount,
  setAppliedDiscount,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState(discountCode);
  const [couponMsg, setCouponMsg] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.unitPricePKR * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 2500;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const discountAmount = subtotal * appliedDiscount;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'HUNZA10') {
      setAppliedDiscount(0.10);
      setDiscountCode('HUNZA10');
      setCouponMsg('10% First Order Discount Applied! 🎉');
    } else {
      setCouponMsg('Invalid coupon code. Try "HUNZA10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-white border-l-2 border-[#1A1A1A] w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 bg-[#FFD700] border-b-2 border-[#1A1A1A] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1A1A1A]" />
            <h3 className="text-lg font-black text-[#1A1A1A]">Your Harvest Cart</h3>
            <span className="px-2 py-0.5 bg-black text-white text-xs font-black rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white hover:bg-black flex items-center justify-center font-bold border border-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 bg-neutral-100 border-b-2 border-[#1A1A1A]">
          <div className="flex justify-between items-center text-xs font-black mb-1">
            <span>Free Express COD Shipping Target</span>
            <span>
              {amountNeededForFreeShipping === 0
                ? 'FREE SHIPPING UNLOCKED! 🚀'
                : `Add PKR ${amountNeededForFreeShipping.toLocaleString()} More`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-neutral-200 border border-[#1A1A1A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6366F1] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500 space-y-3">
              <div className="w-16 h-16 bg-neutral-100 border-2 border-[#1A1A1A] rounded-2xl flex items-center justify-center text-2xl shadow-[2px_2px_0px_#1A1A1A]">
                🛍️
              </div>
              <h4 className="text-base font-black text-[#1A1A1A]">Your cart is empty</h4>
              <p className="text-xs font-semibold">
                Explore our Hunza sun-dried fruits, banana chips, and dehydrated vegetables.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl p-3 shadow-[2px_2px_0px_#1A1A1A] flex gap-3 items-center justify-between"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover rounded-xl border border-[#1A1A1A] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-[#1A1A1A] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] font-bold text-neutral-500">
                    Weight: <span className="text-[#1A1A1A]">{item.selectedWeight}</span>
                  </div>
                  <div className="text-xs font-black text-[#1A1A1A] mt-0.5">
                    PKR {(item.unitPricePKR * item.quantity).toLocaleString()}
                  </div>
                </div>

                {/* Quantity Manager */}
                <div className="flex items-center gap-1 border border-[#1A1A1A] rounded-lg bg-white overflow-hidden shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 font-black text-xs cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2 text-xs font-black">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 font-black text-xs cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t-2 border-[#1A1A1A] space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Discount Code (Try: HUNZA10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-neutral-50 border-2 border-[#1A1A1A] rounded-xl text-xs font-bold focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-extrabold rounded-xl border border-black cursor-pointer hover:bg-black"
              >
                Apply
              </button>
            </form>
            {couponMsg && (
              <p className="text-[10px] font-bold text-[#6366F1]">{couponMsg}</p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1 text-xs font-bold pt-2 border-t border-neutral-200">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount (10%)</span>
                  <span>- PKR {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Nationwide Shipping</span>
                <span>
                  {amountNeededForFreeShipping === 0 ? 'FREE' : 'PKR 200'}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-[#1A1A1A] pt-1 border-t-2 border-[#1A1A1A]">
                <span>Total Amount</span>
                <span>
                  PKR {(finalTotal + (amountNeededForFreeShipping === 0 ? 0 : 200)).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#FFD700] hover:bg-[#ffe033] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-sm rounded-2xl shadow-[3px_3px_0px_#1A1A1A] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <span>Proceed to Express COD Checkout</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
