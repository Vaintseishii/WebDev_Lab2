import "./header.css"

export default function Header() {
   return(
      <header className="header">
         <button className="menu-button">☰</button>

         <h1>Blackout EDC</h1>

         <p className="cart">Cart (0)</p>
      </header>   
   )
}
