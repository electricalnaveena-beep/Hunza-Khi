import React from 'react';
import { X, CheckCircle2, Truck, Copy, MessageSquare, ShoppingBag, MapPin, Phone } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const copyTracking = () => {
    navigator.clipboard.writeText(order.orderId);
    alert(`Order ID ${order.orderId} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[24px] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Banner */}
        <div className="p-6 bg-[#6366F1] text-white border-b-2 border-[#1A1A1A] text-center relative">
          <div className="w-16 h-16 bg-[#FFD700] border-2 border-[#1A1A1A] rounded-full flex items-center justify-center text-3xl mx-auto mb-2 shadow-[2px_2px_0px_#1A1A1A]">
            🎉
          </div>
          <h3 className="text-2xl font-black font-serif">Order Confirmed!</h3>
          <p className="text-xs font-bold text-white/90 mt-1">
            Thank you, {order.fullName}. Your organic harvest is being processed in Korangi!
          </p>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Order ID & Tracking */}
          <div className="p-4 bg-neutral-100 border-2 border-[#1A1A1A] rounded-2xl flex items-center justify-between shadow-[2px_2px_0px_#1A1A1A]">
            <div>
              <span className="text-[10px] font-black uppercase text-neutral-500 block">
                Tracking Order ID
              </span>
              <span className="text-lg font-mono font-black text-[#1A1A1A]">
                {order.orderId}
              </span>
            </div>
            <button
              onClick={copyTracking}
              className="px-3 py-1.5 bg-white hover:bg-neutral-200 border-2 border-[#1A1A1A] rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Delivery & Payment details */}
          <div className="grid grid-cols-2 gap-3 text-xs font-bold">
            <div className="p-3 bg-neutral-50 border-2 border-[#1A1A1A] rounded-xl">
              <span className="text-[10px] text-neutral-500 block uppercase font-black">
                Estimated Delivery
              </span>
              <span className="text-[#6366F1] font-black">{order.estimatedDelivery}</span>
            </div>

            <div className="p-3 bg-neutral-50 border-2 border-[#1A1A1A] rounded-xl">
              <span className="text-[10px] text-neutral-500 block uppercase font-black">
                Payment Status
              </span>
              <span className="text-black uppercase">{order.paymentMethod.toUpperCase()} (COD)</span>
            </div>
          </div>

          {/* Delivery Address Box */}
          <div className="p-3 bg-neutral-50 border-2 border-[#1A1A1A] rounded-xl text-xs font-semibold">
            <span className="text-[10px] font-black text-neutral-500 uppercase block mb-0.5">
              Shipping Destination
            </span>
            <div className="font-bold text-[#1A1A1A]">
              {order.address}, {order.city}
            </div>
            <div className="text-neutral-500 text-[11px]">Phone: {order.phone}</div>
          </div>

          {/* Itemized Receipt */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-[#1A1A1A]">
              Ordered Items
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-xs font-bold p-2 bg-neutral-100 rounded-lg border border-neutral-300"
                >
                  <div className="truncate max-w-[220px]">
                    {item.product.name} ({item.selectedWeight}) x{item.quantity}
                  </div>
                  <span>PKR {(item.unitPricePKR * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="p-3 bg-[#FFD700] border-2 border-[#1A1A1A] rounded-2xl flex justify-between items-center text-sm font-black">
            <span>Total Amount Payable</span>
            <span>PKR {order.totalPKR.toLocaleString()}</span>
          </div>

          {/* WhatsApp Notification Badge */}
          <div className="p-3 bg-green-50 border-2 border-green-700 rounded-xl flex items-center gap-2 text-xs font-bold text-green-900">
            <MessageSquare className="w-5 h-5 text-green-700 shrink-0" />
            <span>
              Order updates will be sent to WhatsApp number: <strong>{order.phone}</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#1A1A1A] hover:bg-black text-white font-black text-xs rounded-2xl border-2 border-[#1A1A1A] shadow-[3px_3px_0px_#1A1A1A] cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
