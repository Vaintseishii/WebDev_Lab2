import { createContext, useContext, useMemo, useReducer } from "react";
import rawProducts from "./products.json";
import { productImages } from "./productImages";
import type { Action, CartItem, Product, State } from "./types";

function resolveProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    image: productImages[product.image] ?? product.image,
  }));
}

export const initialState: State = {
  products: resolveProducts(rawProducts as Product[]),
  cart: [],
  filters: {
    searchQuery: "",
    category: "All",
    maxPrice: 10000,
    sortBy: "default",
  },
  isCartOpen: false,
  isFilterOpen: false,
};

function updateCartItemQuantity(cart: CartItem[], id: string, delta: number): CartItem[] {
  return cart
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
    .filter((item) => item.quantity > 0);
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_CART":
      return { ...state, isCartOpen: true };
    case "CLOSE_CART":
      return { ...state, isCartOpen: false };
    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen };
    case "OPEN_FILTERS":
      return { ...state, isFilterOpen: true };
    case "CLOSE_FILTERS":
      return { ...state, isFilterOpen: false };
    case "TOGGLE_FILTERS":
      return { ...state, isFilterOpen: !state.isFilterOpen };
    case "ADD_TO_CART": {
      if (!action.product.inStock) {
        return state;
      }

      const existingItem = state.cart.find((item) => item.id === action.product.id);
      const cart = existingItem
        ? state.cart.map((item) =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...state.cart, { ...action.product, quantity: 1 }];

      return {
        ...state,
        cart,
        isCartOpen: true,
      };
    }
    case "INCREMENT_CART_ITEM":
      return {
        ...state,
        cart: updateCartItemQuantity(state.cart, action.id, 1),
      };
    case "DECREMENT_CART_ITEM":
      return {
        ...state,
        cart: updateCartItemQuantity(state.cart, action.id, -1),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        filters: { ...state.filters, searchQuery: action.searchQuery },
      };
    case "SET_CATEGORY":
      return {
        ...state,
        filters: { ...state.filters, category: action.category },
      };
    case "SET_MAX_PRICE":
      return {
        ...state,
        filters: { ...state.filters, maxPrice: action.maxPrice },
      };
    case "SET_SORT_BY":
      return {
        ...state,
        filters: { ...state.filters, sortBy: action.sortBy },
      };
    case "CHECKOUT":
      return {
        ...state,
        cart: [],
        isCartOpen: false,
      };
    default:
      return state;
  }
}

type ShopContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
  cartItemCount: number;
  subtotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const cartItemCount = useMemo(
    () => state.cart.reduce((total, item) => total + item.quantity, 0),
    [state.cart],
  );

  const subtotal = useMemo(
    () => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [state.cart],
  );

  const value = useMemo(
    () => ({ state, dispatch, cartItemCount, subtotal }),
    [cartItemCount, dispatch, state, subtotal],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }

  return context;
}