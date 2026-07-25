import React, { useState } from 'react';
import { ShoppingBag, Star, Check, Sparkles, Plus, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, weight: string, quantity: number) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenQuickView,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<string>(
    product.weightOptions[0] || '500g'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedWeight, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => onOpenQuickView(product)}
      className="bento-card group p-5 bg-white flex flex-col justify-between relative cursor-pointer hover:shadow-[6px_6px_0px_#1A1A1A] transition-all"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 w-full mb-4 rounded-2xl overflow-hidden border-2 border-[#1A1A1A] bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {product.organicCertified && (
            <span className="px-2 py-0.5 bg-[#FFD700] border border-[#1A1A1A] text-[#1A1A1A] text-[9px] font-black rounded uppercase shadow-[1px_1px_0px_#1A1A1A]">
              100% ORGANIC
            </span>
          )}
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-black text-white text-[9px] font-bold rounded uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rehydration badge if veggie */}
        {product.rehydrationRatio && (
          <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-[#6366F1] text-white border border-black text-[10px] font-black rounded-lg text-center shadow-[1px_1px_0px_#1A1A1A]">
            ⚡ {product.rehydrationRatio}
          </div>
        )}

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView(product);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] hover:bg-white shadow-[1px_1px_0px_#1A1A1A] transition-transform active:scale-90"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center text-xs font-bold text-neutral-500 mb-1">
            <span className="truncate max-w-[180px]">{product.origin}</span>
            <div className="flex items-center gap-1 text-[#1A1A1A]">
              <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#1A1A1A]" />
              <span className="font-black text-xs">{product.rating}</span>
              <span className="text-[10px] text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="text-base font-black text-[#1A1A1A] leading-snug mb-2 group-hover:text-[#6366F1] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-2 font-medium mb-3">
            {product.description}
          </p>
        </div>

        <div>
          {/* Weight Picker Options */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.weightOptions.map((weight) => (
              <button
                key={weight}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight(weight);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-black border border-[#1A1A1A] transition-all cursor-pointer ${
                  selectedWeight === weight
                    ? 'bg-[#1A1A1A] text-white shadow-[1px_1px_0px_#FFD700]'
                    : 'bg-neutral-50 text-[#1A1A1A] hover:bg-neutral-100'
                }`}
              >
                {weight}
              </button>
            ))}
          </div>

          {/* Price & Add to Cart Button */}
          <div className="flex items-center justify-between pt-2 border-t-2 border-neutral-100">
            <div>
              <div className="text-lg font-black text-[#1A1A1A]">
                PKR {product.pricePKR.toLocaleString()}
              </div>
              {product.originalPricePKR && (
                <div className="text-[10px] font-bold text-neutral-400 line-through">
                  PKR {product.originalPricePKR.toLocaleString()}
                </div>
              )}
            </div>

            <button
              onClick={handleAdd}
              className={`px-3.5 py-2 rounded-xl border-2 border-[#1A1A1A] text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
                addedAnimation
                  ? 'bg-green-500 text-white border-black'
                  : 'bg-[#FFD700] hover:bg-[#ffe033] text-[#1A1A1A]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add ({selectedWeight})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
