import "./productBox.css";
import black_wallet from "./assets/black_wallet.png";

export default function ProductBox() {
  return (
    <div className="productCard">
      <div className="productContent">
        <div className="boxSize">
          <img
            src={black_wallet}
            alt="Black Wallet"
            className="productImage"
          />
        </div>

        <div className="productInfo">
          <h2 className="productTitle">Black Wallet</h2>
          <p className="productPrice">₱799</p>
        </div>
      </div>

      <div className="productOverlay">
        <span className="plus">+</span>
      </div>
    </div>
  );
}