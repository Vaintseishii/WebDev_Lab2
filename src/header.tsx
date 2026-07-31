import "./header.css"
import { useCart } from "./App"

export default function Header() {
   const { dispatch } = useCart()

   return(
      <header className="header">
         <button className="menu-button">☰</button>
         <p className="headerText">Blackout EDC</p>
         <p className="cart" onClick={() => dispatch({ type: "OPEN" })}>Cart (0)</p>
      </header>   
   )
}
