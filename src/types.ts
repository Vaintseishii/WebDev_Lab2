export type SortBy = "default" | "price-asc" | "price-desc" | "title";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
};

export type CartItem = Product & {
  quantity: number;
};

export type Filters = {
  searchQuery: string;
  category: string;
  maxPrice: number;
  sortBy: SortBy;
};

export type State = {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  isCartOpen: boolean;
};