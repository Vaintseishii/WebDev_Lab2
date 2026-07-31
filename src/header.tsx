import "./header.css"
import { useCart } from "./App"

type HeaderProps = {
   onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
   const { dispatch } = useCart()

   return(
      <header className="header">
         <button className="menu-button" onClick={onMenuClick}>☰</button>
         <p className="headerText">Blackout EDC</p>
         <p className="cart" onClick={() => dispatch({ type: "OPEN" })}>Cart (0)</p>
      </header>   
   )
}
