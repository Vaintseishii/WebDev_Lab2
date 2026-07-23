import "./App.css";
import black_wallet from "./assets/black_wallet.png";

import ProductBox from "./productBox";

function App() {
  return (
    <div className="app">
      <div className="hero">
        <header className="header">
          <button className="menu-button">☰</button>

          <h1>Blackout EDC</h1>

          <p className="cart">Cart (0)</p>
        </header>

        <section className="featured-product">
          <div className="featured-text">
            <h2>The All Dark</h2>

            <p>
              Premium handcrafted everyday carry wallet designed with a
              minimalist aesthetic.
            </p>

            <button className="add-to-cart">
              Add to Cart
            </button>
          </div>

          <div className="featured-image">
            <img src={black_wallet} alt="Black Wallet" />
          </div>

        </section>

        <div className = "productsGrid">
            <ProductBox />
        </div>

      </div>
    </div>
  );
}

export default App;
