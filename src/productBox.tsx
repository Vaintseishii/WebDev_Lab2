import "./productBox.css";
import { useShop } from "./shopContext";
import type { Product } from "./types";

type ProductBoxProps = {
  product: Product;
};

const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 0,
});

export default function ProductBox({ product }: ProductBoxProps) {
  const { dispatch } = useShop();

  return (
    <article className="productCard">
      <div className="productContent">
        <div className="boxSize">
          <img
            src={product.image}
            alt={product.name}
            className="productImage"
          />
        </div>

        <div className="productInfo">
          <div>
            <h2 className="productTitle">{product.name}</h2>
            <p className="productCategory">{product.category}</p>
          </div>
          <p className="productPrice">{currencyFormatter.format(product.price)}</p>
        </div>
      </div>

      <div className="productOverlay">
        <button
          type="button"
          className="productAction"
          onClick={() => dispatch({ type: "ADD_TO_CART", product })}
          disabled={!product.inStock}
        >
          <span className="plus">+</span>
          <span className="productActionLabel">
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </span>
        </button>
      </div>
    </article>
  );
}