export type PriceTier = 6000 | 7000 | 8000;

export type Subcategory =
  | 'Running'
  | 'Football & Soccer'
  | 'Basketball'
  | 'Tennis & Indoor Court'
  | 'Training';

export type BrandLine = 'Velocity' | 'Strider Pro' | 'PitchMaster' | 'CourtLine';

export type ShoeColor = 'Black' | 'Navy Blue';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export interface ShoeProduct {
  id: string;
  sku: string;
  name: string;
  brand: BrandLine;
  subcategory: Subcategory;
  price: PriceTier;
  originalPrice: number;
  colors: ShoeColor[];
  sizes: number[];
  isNew: boolean;
  image: string;
  description: string;
  specs: {
    upper: string;
    midsole: string;
    outsole: string;
    weight: string;
  };
}

export interface CartItem {
  product: ShoeProduct;
  size: number;
  quantity: number;
}

export interface FilterState {
  prices: PriceTier[];
  subcategories: Subcategory[];
  brands: BrandLine[];
  sizes: number[];
  colors: ShoeColor[];
  searchQuery: string;
  onlySaved: boolean;
}

export interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'cod' | 'card';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  placedAt: string;
}
