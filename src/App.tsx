import "./App.css";
import black_wallet from "./assets/black_wallet.png";
import ProductBox from "./productBox";
import Header from "./header";
import FilterBox from "./filterBox";
import ShoppingCart from "./shoppingCart";
import { createContext, useReducer, useContext } from "react";

type CartState = { width: number };
type CartAction = { type: "OPEN" } | { type: "CLOSE" };

function cartReducer(state: CartState, action: CartAction): CartState {
   switch (action.type) {
      case "OPEN":
         return { width: 250 };
      case "CLOSE":
         return { width: 0 };
      default:
         return state;
   }
}

type CartContextType = {
   state: CartState;
   dispatch: React.Dispatch<CartAction>;
};

export const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
   const context = useContext(CartContext);
   if (!context) throw new Error("useCart must be used within CartProvider");
   return context;
}

function App() {
   const [state, dispatch] = useReducer(cartReducer, { width: 0 });

   return (
      <CartContext.Provider value={{ state, dispatch }}>
         <div className="app">
            <div className="hero">
               <Header />
               <section className="featured-product">
                  <div className="featured-text">
                     <h2>The All Dark</h2>
                     <p>
                        Premium handcrafted everyday carry wallet designed with a
                        minimalist aesthetic.
                     </p>
                     <button className="add-to-cart">Add to Cart</button>
                  </div>
                  <div className="featured-image">
                     <img src={black_wallet} alt="Black Wallet" />
                  </div>
               </section>
            </div>
            <div className="separationLine"></div>
            <div className="productsGrid">
               <FilterBox />
               <ProductBox />
               <ProductBox />
               <ProductBox />
               <ProductBox />
               <ProductBox />
               <ProductBox />
            </div>
            <ShoppingCart />
         </div>
      </CartContext.Provider>
   );
}
export default App;
