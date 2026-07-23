import "./header.css"

export default function Header() {
   return(
      <header className="header">
         <button className="menu-button">☰</button>

         <p className = "headerText">Blackout EDC</p>

         <p className="cart">Cart (0)</p>
      </header>   
   )
}
