import "./App.css";
import { useMemo } from "react";
import FilterBox from "./filterBox";
import Header from "./header";
import ProductBox from "./productBox";
import ShoppingCart from "./shoppingCart";
import { useShop } from "./shopContext";
import type { SortBy } from "./types";

function App() {
   const { state, dispatch, cartItemCount } = useShop();

   const categories = useMemo(
      () => ["All", ...Array.from(new Set(state.products.map((product) => product.category)))],
      [state.products],
   );

   const visibleProducts = useMemo(() => {
      const query = state.filters.searchQuery.trim().toLowerCase();

      const filteredProducts = state.products.filter((product) => {
         const matchesQuery =
            query.length === 0 ||
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query);
         const matchesCategory =
            state.filters.category === "All" || product.category === state.filters.category;
         const matchesPrice = product.price <= state.filters.maxPrice;

         return matchesQuery && matchesCategory && matchesPrice;
      });

      return filteredProducts.sort((leftProduct, rightProduct) => {
         switch (state.filters.sortBy) {
            case "price-asc":
               return leftProduct.price - rightProduct.price;
            case "price-desc":
               return rightProduct.price - leftProduct.price;
            case "title":
               return leftProduct.name.localeCompare(rightProduct.name);
            default:
               return 0;
         }
      });
   }, [state.filters, state.products]);

   return (
      <div className="app">
         <div className="hero">
            <Header
               cartItemCount={cartItemCount}
               onCartClick={() => dispatch({ type: "OPEN_CART" })}
               onMenuClick={() => dispatch({ type: "TOGGLE_FILTERS" })}
            />
            <section className="featured-product">
               <div className="featured-text">
                  <h2>The All Dark</h2>
                  <p>
                     Premium handcrafted everyday carry wallet designed with a minimalist aesthetic.
                  </p>
                  <button
                     className="add-to-cart"
                     onClick={() => dispatch({ type: "ADD_TO_CART", product: state.products[5] })}
                  >
                     Add Featured Item
                  </button>
               </div>
               <div className="featured-image">
                  <img
                     src={state.products[5]?.image}
                     alt={state.products[5]?.name ?? "Featured product"}
                  />
               </div>
            </section>
         </div>
         <div className="separationLine"></div>
         <div className="productsGrid">
            {visibleProducts.map((product) => (
               <ProductBox key={product.id} product={product} />
            ))}
         </div>
         <FilterBox
            isOpen={state.isFilterOpen}
            categories={categories}
            filters={state.filters}
            onSearchChange={(searchQuery) => dispatch({ type: "SET_SEARCH_QUERY", searchQuery })}
            onCategoryChange={(category) => dispatch({ type: "SET_CATEGORY", category })}
            onMaxPriceChange={(maxPrice) => dispatch({ type: "SET_MAX_PRICE", maxPrice })}
            onSortByChange={(sortBy: SortBy) => dispatch({ type: "SET_SORT_BY", sortBy })}
            onApply={() => dispatch({ type: "CLOSE_FILTERS" })}
         />
         <ShoppingCart isOpen={state.isCartOpen} />
      </div>
   );
}

export default App;
