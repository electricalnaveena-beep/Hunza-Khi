import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, MapPin, Truck, CheckCircle2, Heart, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: string, quantity: number) => void;
  onOpenCheckout: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenCheckout,
}) => {
  if (!product) return null;

  const [selectedWeight, setSelectedWeight] = useState<string>(
    product.weightOptions[0] || '500g'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedWeight, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    onAddToCart(product, selectedWeight, quantity);
    onClose();
    onOpenCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] rounded-[24px] w-full max-w-3xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-[#FFD700] border-b-2 border-[#1A1A1A] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-black text-white text-[10px] font-black rounded uppercase">
              {product.category.replace('-', ' ')}
            </span>
            <span className="text-xs font-bold text-black flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {product.origin}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white hover:bg-black flex items-center justify-center font-bold border border-black cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Image & Highlights */}
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-2xl border-2 border-[#1A1A1A] overflow-hidden relative bg-neutral-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.organicCertified && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#1A1A1A] text-[#FFD700] text-xs font-black rounded-lg border border-[#1A1A1A]">
                  100% ORGANIC CERTIFIED
                </div>
              )}
            </div>

            {/* Nutrition Box */}
            <div className="bg-neutral-50 border-2 border-[#1A1A1A] rounded-2xl p-4 shadow-[2px_2px_0px_#1A1A1A]">
              <h4 className="text-xs font-black uppercase text-[#1A1A1A] mb-2 flex items-center justify-between">
                <span>Nutritional Facts (Per 100g)</span>
                <span className="text-[10px] text-neutral-500 font-bold">Lab Verified</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-2 bg-white rounded-lg border border-neutral-300">
                  <span className="text-neutral-500 text-[10px] block font-medium">Energy</span>
                  <span>{product.nutritionPer100g.calories} kcal</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-300">
                  <span className="text-neutral-500 text-[10px] block font-medium">Protein</span>
                  <span>{product.nutritionPer100g.protein}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-300">
                  <span className="text-neutral-500 text-[10px] block font-medium">Carbohydrates</span>
                  <span>{product.nutritionPer100g.carbs}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-neutral-300">
                  <span className="text-neutral-500 text-[10px] block font-medium">Dietary Fiber</span>
                  <span>{product.nutritionPer100g.fiber}</span>
                </div>
              </div>
              <p className="text-[10px] font-semibold text-neutral-600 mt-2 bg-yellow-100/60 p-2 rounded border border-yellow-300">
                ⭐ {product.nutritionPer100g.vitamins}
              </p>
            </div>
          </div>

          {/* Right Column: Title, Weight Selection, Add to Cart */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-[#FFD700]">
                  <Star className="w-4 h-4 fill-[#FFD700] text-black" />
                  <span className="font-black text-sm text-black ml-1">{product.rating}</span>
                </div>
                <span className="text-xs text-neutral-500 font-bold">
                  ({product.reviewCount} customer reviews across Pakistan)
                </span>
              </div>

              <h2 className="text-2xl font-black text-[#1A1A1A] leading-tight mb-2 font-serif">
                {product.name}
              </h2>

              <p className="text-xs text-neutral-700 font-medium leading-relaxed mb-4">
                {product.description}
              </p>

              {product.rehydrationRatio && (
                <div className="p-3 bg-[#6366F1]/10 border-2 border-[#6366F1] rounded-xl text-xs font-extrabold text-[#6366F1] mb-4">
                  💡 Kitchen Yield Note: {product.rehydrationRatio}
                </div>
              )}

              {/* Weight Selector */}
              <div className="mb-4">
                <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-2">
                  Select Pack Weight
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-[#1A1A1A] transition-all cursor-pointer ${
                        selectedWeight === weight
                          ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#FFD700]'
                          : 'bg-white text-[#1A1A1A] hover:bg-neutral-100'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="mb-4">
                <label className="block text-xs font-black uppercase text-[#1A1A1A] mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-[#1A1A1A] rounded-xl overflow-hidden bg-white shadow-[2px_2px_0px_#1A1A1A]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 font-black text-sm border-r-2 border-[#1A1A1A] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 font-black text-sm border-l-2 border-[#1A1A1A] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-neutral-500 font-bold">
                    Stock Available for Express Delivery
                  </span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-4 bg-neutral-100 border-2 border-[#1A1A1A] rounded-2xl mb-4">
                <span className="text-[10px] font-black uppercase text-neutral-500 block">
                  Total Price
                </span>
                <div className="text-2xl font-black text-[#1A1A1A]">
                  PKR {(product.pricePKR * quantity).toLocaleString()}
                </div>
                <span className="text-[10px] font-bold text-green-700">
                  ⚡ Cash on Delivery Available Nationwide
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-2xl border-2 border-[#1A1A1A] text-xs font-black shadow-[3px_3px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  added ? 'bg-green-500 text-white' : 'bg-[#FFD700] hover:bg-[#ffe033] text-[#1A1A1A]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Cart!' : `Add to Cart (${selectedWeight})`}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#1A1A1A] hover:bg-black text-white border-2 border-[#1A1A1A] text-xs font-black rounded-2xl shadow-[3px_3px_0px_#1A1A1A] cursor-pointer"
              >
                Instant Buy with Express COD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
