export type ThemeMode = 'neubrutalist' | 'emerald' | 'midnight' | 'terracotta';

export interface Product {
  id: string;
  name: string;
  category: 'dried-fruits' | 'banana-chips' | 'dehydrated-veggies' | 'gift-boxes' | 'commercial-bulk';
  pricePKR: number;
  originalPricePKR?: number;
  weightOptions: string[];
  rating: number;
  reviewCount: number;
  description: string;
  origin: string;
  image: string;
  organicCertified: boolean;
  tags: string[];
  inStock: boolean;
  rehydrationRatio?: string; // e.g. "100g = 1kg Fresh"
  nutritionPer100g: {
    calories: number;
    protein: string;
    carbs: string;
    fiber: string;
    vitamins: string;
  };
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  selectedWeight: string;
  quantity: number;
  unitPricePKR: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  productTitle: string;
}

export interface RecipeGuide {
  id: string;
  title: string;
  category: string;
  prepTimeSaved: string;
  ratioNote: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image: string;
}

export interface OrderDetails {
  orderId: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank';
  notes?: string;
  items: CartItem[];
  subtotalPKR: number;
  shippingFeePKR: number;
  discountPKR: number;
  totalPKR: number;
  date: string;
  estimatedDelivery: string;
}
