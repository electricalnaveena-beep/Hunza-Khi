/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBento } from './components/HeroBento';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { VeggieCalculator } from './components/VeggieCalculator';
import { HunzaStoryModal } from './components/HunzaStoryModal';
import { WholesaleModal } from './components/WholesaleModal';
import { ReviewsSection } from './components/ReviewsSection';
import { PRODUCTS, REVIEWS } from './data/products';
import { Product, CartItem, OrderDetails, Review, ThemeMode } from './types';
import { ShieldCheck, Truck, Clock, Sparkles, MapPin, PhoneCall } from 'lucide-react';

export default function App() {
  // Theme State
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('emerald');

  // Navigation & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Modals
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isWholesaleOpen, setIsWholesaleOpen] = useState(false);

  // Reviews State
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);

  // Apply data-theme attribute on theme change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Add Item to Cart
  const handleAddToCart = (product: Product, selectedWeight: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === selectedWeight
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `${product.id}-${selectedWeight}-${Date.now()}`,
        product,
        selectedWeight,
        quantity,
        unitPricePKR: product.pricePKR,
      };
      return [...prev, newItem];
    });
  };

  // Update Cart Item Quantity
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Item from Cart
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Filtered Products List
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Calculate Subtotal
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPricePKR * item.quantity,
    0
  );
  const discountAmount = cartSubtotal * appliedDiscount;

  // Handle Order Completed
  const handleOrderPlaced = (order: OrderDetails) => {
    setPlacedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]); // Clear cart
  };

  // Handle New Review Posted
  const handleAddReview = (newRev: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const revObj: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: true,
    };
    setReviewsList((prev) => [revObj, ...prev]);
  };

  const handleSelectFeaturedProduct = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setSelectedProductForDetail(found);
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Header */}
        <Header
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenStory={() => setIsStoryOpen(true)}
          onOpenWholesale={() => setIsWholesaleOpen(true)}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />

        {/* Hero Section (Bento Grid Style) */}
        {selectedCategory === 'all' && !searchTerm && (
          <HeroBento
            onSelectFeaturedProduct={handleSelectFeaturedProduct}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenStory={() => setIsStoryOpen(true)}
          />
        )}

        {/* Catalog Header & Count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t-2 border-neutral-300">
          <div>
            <h2 className="text-2xl font-black font-serif">
              {selectedCategory === 'all'
                ? 'Harvest Product Collection'
                : selectedCategory.toUpperCase().replace('-', ' ')}
            </h2>
            <p className="text-xs font-bold opacity-75">
              Showing {filteredProducts.length} items ready for Express Cash on Delivery
            </p>
          </div>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-extrabold text-[#6366F1] underline cursor-pointer"
            >
              Clear Search "{searchTerm}"
            </button>
          )}
        </div>

        {/* Product Bento Grid Gallery */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border-2 border-[#1A1A1A] rounded-[24px] p-12 text-center space-y-3 shadow-[4px_4px_0px_#1A1A1A]">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-black">No matching items found</h3>
            <p className="text-xs font-semibold text-neutral-500">
              Try searching for "apricots", "banana chips", or "dehydrated onions".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-[#FFD700] border-2 border-[#1A1A1A] text-black font-extrabold text-xs rounded-xl shadow-[2px_2px_0px_#1A1A1A]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onOpenQuickView={setSelectedProductForDetail}
              />
            ))}
          </main>
        )}

        {/* Customer Testimonials Section */}
        <ReviewsSection reviews={reviewsList} onAddReview={handleAddReview} />

        {/* Bottom Guarantee Banner */}
        <div className="bg-[#1A1A1A] text-white border-2 border-black rounded-[24px] p-6 shadow-[4px_4px_0px_#1A1A1A] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD700] text-black rounded-xl border border-black flex items-center justify-center font-black text-lg shrink-0">
              ⚡
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-[#FFD700]">Express COD Delivery</h4>
              <p className="text-[11px] text-neutral-300 font-medium">
                24-48 Hours across Karachi, Lahore, Islamabad & All Cities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6366F1] text-white rounded-xl border border-black flex items-center justify-center font-black text-lg shrink-0">
              🏔️
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-white">Direct Hunza Origin</h4>
              <p className="text-[11px] text-neutral-300 font-medium">
                Sun-dried organic produce harvested in Karakoram valley
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 text-black rounded-xl border border-black flex items-center justify-center font-black text-lg shrink-0">
              🏭
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-green-400">Korangi Karachi Plant</h4>
              <p className="text-[11px] text-neutral-300 font-medium">
                Hygienic dehydration, sorting, & airtight pouch packaging
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 text-xs font-bold opacity-80 border-t-2 border-neutral-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black inline-block"></span>
            <span>Hunza Harvest Official Online Store • Korangi Industrial Area, Karachi</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsStoryOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Our Heritage
            </button>
            <button
              onClick={() => setIsWholesaleOpen(true)}
              className="hover:underline cursor-pointer"
            >
              Wholesale & B2B
            </button>
            <span>© 2026 Hunza Harvest Pakistan</span>
          </div>
        </footer>
      </div>

      {/* Modals & Slide-outs */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        appliedDiscount={appliedDiscount}
        setAppliedDiscount={setAppliedDiscount}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      <VeggieCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onSelectProduct={handleSelectFeaturedProduct}
      />

      <HunzaStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      <WholesaleModal
        isOpen={isWholesaleOpen}
        onClose={() => setIsWholesaleOpen(false)}
      />
    </div>
  );
}
