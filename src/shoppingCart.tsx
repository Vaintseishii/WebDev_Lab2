import "./shoppingCart.css";
import { useCart } from "./App";

export default function ShoppingCart() {
   const { state } = useCart();

   return <div className="frame" style={{ width: state.width }}></div>;
}
