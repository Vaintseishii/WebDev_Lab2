import "./header.css";

type HeaderProps = {
   onMenuClick: () => void;
   onCartClick: () => void;
   cartItemCount: number;
}

export default function Header({ onMenuClick, onCartClick, cartItemCount }: HeaderProps) {
   return(
      <header className="header">
         <button className="menu-button" onClick={onMenuClick} aria-label="Open filters">☰</button>
         <p className="headerText">Blackout EDC</p>
         <button className="cart" onClick={onCartClick}>Cart ({cartItemCount})</button>
      </header>   
   )
}
