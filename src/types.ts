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
  isFilterOpen: boolean;
};

export type Action =
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_FILTERS" }
  | { type: "CLOSE_FILTERS" }
  | { type: "TOGGLE_FILTERS" }
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "INCREMENT_CART_ITEM"; id: string }
  | { type: "DECREMENT_CART_ITEM"; id: string }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "SET_SEARCH_QUERY"; searchQuery: string }
  | { type: "SET_CATEGORY"; category: string }
  | { type: "SET_MAX_PRICE"; maxPrice: number }
  | { type: "SET_SORT_BY"; sortBy: SortBy }
  | { type: "CHECKOUT" };