import "./productBox.css";
import black_wallet from "./assets/black_wallet.png";

export default function ProductBox() {
  return (
   <div className="productCard">
      <div className="boxSize">
      <img
        src={black_wallet}
        alt="Black Wallet"
        className="productImage"
      />
    </div>
    <div className="productTitle">
      <h1>Black wallet</h1>
    </div>   
   </div>
    
  );
}