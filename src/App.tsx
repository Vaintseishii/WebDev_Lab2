import "./App.css";
import black_wallet from "./assets/black_wallet.png";

import ProductBox from "./productBox";
import Header from "./header"

function App() {
  return (
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

            <button className="add-to-cart">
              Add to Cart
            </button>
          </div>

          <div className="featured-image">
            <img src={black_wallet} alt="Black Wallet" />
          </div>

        </section>
      </div>
      <div className = "separationLine"></div>
      <div className = "productsGrid">
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
      </div>

    </div>
  );
}

export default App;
