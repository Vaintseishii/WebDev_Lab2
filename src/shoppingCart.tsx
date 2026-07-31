import "./shoppingCart.css";
import type { CartItem } from "./types";

type ShoppingCartProps = {
   cart: CartItem[];
   isOpen: boolean;
   onClose: () => void;
   onIncrement: (id: string) => void;
   onDecrement: (id: string) => void;
   onRemove: (id: string) => void;
   subtotal: number;
   grandTotal: number;
};

const currencyFormatter = new Intl.NumberFormat("en-PH", {
   style: "currency",
   currency: "PHP",
   minimumFractionDigits: 0,
});

export default function ShoppingCart({
   cart,
   isOpen,
   onClose,
   onIncrement,
   onDecrement,
   onRemove,
   subtotal,
   grandTotal,
}: ShoppingCartProps) {
   return (
      <>
         {isOpen ? <button className="cartBackdrop" onClick={onClose} aria-label="Close cart overlay" /> : null}
         <aside className={isOpen ? "frame frame--open" : "frame"} aria-hidden={!isOpen}>
            <div className="cartHeader">
               <h2>Shopping Cart</h2>
               <button type="button" className="closeCart" onClick={onClose} aria-label="Close cart">×</button>
            </div>

            <div className="cartItems">
               {cart.length === 0 ? (
                  <p className="emptyCart">Your cart is empty.</p>
               ) : (
                  cart.map((item) => (
                     <div key={item.id} className="cartItem">
                        <div>
                           <h3>{item.name}</h3>
                           <p>{currencyFormatter.format(item.price)}</p>
                        </div>
                        <div className="cartItemActions">
                           <button type="button" onClick={() => onDecrement(item.id)} aria-label={`Decrease quantity of ${item.name}`}>-</button>
                           <span>{item.quantity}</span>
                           <button type="button" onClick={() => onIncrement(item.id)} aria-label={`Increase quantity of ${item.name}`}>+</button>
                           <button type="button" className="removeItem" onClick={() => onRemove(item.id)}>Remove</button>
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
                  <strong>{currencyFormatter.format(grandTotal)}</strong>
               </div>
            </div>
         </aside>
      </>
   );
}
