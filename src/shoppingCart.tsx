import "./shoppingCart.css";
import { useShop } from "./shopContext";

const currencyFormatter = new Intl.NumberFormat("en-PH", {
   style: "currency",
   currency: "PHP",
   minimumFractionDigits: 0,
});

export default function ShoppingCart({ isOpen }: { isOpen: boolean }) {
   const { state, dispatch, subtotal } = useShop();

   return (
      <>
         {isOpen ? (
            <button
               className="cartBackdrop"
               onClick={() => dispatch({ type: "CLOSE_CART" })}
               aria-label="Close cart overlay"
            />
         ) : null}
         <aside className={isOpen ? "frame frame--open" : "frame"} aria-hidden={!isOpen}>
            <div className="cartHeader">
               <h2>Shopping Cart</h2>
               <button
                  type="button"
                  className="closeCart"
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  aria-label="Close cart"
               >
                  ×
               </button>
            </div>

            <div className="cartItems">
               {state.cart.length === 0 ? (
                  <p className="emptyCart">Your cart is empty.</p>
               ) : (
                  state.cart.map((item) => (
                     <div key={item.id} className="cartItem">
                        <div>
                           <h3>{item.name}</h3>
                           <p>{currencyFormatter.format(item.price)}</p>
                        </div>
                        <div className="cartItemActions">
                           <button
                              type="button"
                              onClick={() => dispatch({ type: "DECREMENT_CART_ITEM", id: item.id })}
                              aria-label={`Decrease quantity of ${item.name}`}
                           >
                              -
                           </button>
                           <span>{item.quantity}</span>
                           <button
                              type="button"
                              onClick={() => dispatch({ type: "INCREMENT_CART_ITEM", id: item.id })}
                              aria-label={`Increase quantity of ${item.name}`}
                           >
                              +
                           </button>
                           <button
                              type="button"
                              className="removeItem"
                              onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: item.id })}
                           >
                              Remove
                           </button>
                        </div>
                     </div>
                  ))
               )}
            </div>

            <div className="cartTotals">
               <div>
                  <span>Subtotal</span>
                  <strong>{currencyFormatter.format(subtotal)}</strong>
               </div>
               <div>
                  <span>Grand Total</span>
                  <strong>{currencyFormatter.format(subtotal)}</strong>
               </div>
            </div>
            <button
               type="button"
               className="add-to-cart"
               onClick={() => dispatch({ type: "CHECKOUT" })}
               disabled={state.cart.length === 0}
            >
               Checkout
            </button>
         </aside>
      </>
   );
}
