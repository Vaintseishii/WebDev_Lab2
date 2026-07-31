import "./App.css";
import ProductBox from "./productBox";
import Header from "./header";
import FilterBox from "./filterBox";
import ShoppingCart from "./shoppingCart";
import rawProducts from "./products.json";
import { productImages } from "./productImages";
import { useMemo, useState } from "react";
import type { Filters, Product, SortBy, State } from "./types";

function resolveProducts(products: Product[]): Product[] {
   return products.map((product) => ({
      ...product,
      image: productImages[product.image] ?? product.image,
   }));
}

function App() {
   const [state, setState] = useState<State>({
      products: resolveProducts(rawProducts as Product[]),
      cart: [],
      filters: {
         searchQuery: "",
         category: "All",
         maxPrice: 10000,
         sortBy: "default",
      },
      isCartOpen: false,
   });
   const [isFilterOpen, setIsFilterOpen] = useState(false);

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
            state.filters.category === "All" ||
            product.category === state.filters.category;
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

   const cartItemCount = useMemo(
      () => state.cart.reduce((total, item) => total + item.quantity, 0),
      [state.cart],
   );

   const subtotal = useMemo(
      () => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
      [state.cart],
   );

   function updateFilters(updater: (currentFilters: Filters) => Filters) {
      setState((currentState) => ({
         ...currentState,
         filters: updater(currentState.filters),
      }));
   }

   function handleAddToCart(product: Product) {
      if (!product.inStock) {
         return;
      }

      setState((currentState) => {
         const existingItem = currentState.cart.find((item) => item.id === product.id);

         const cart = existingItem
            ? currentState.cart.map((item) =>
                 item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
              )
            : [...currentState.cart, { ...product, quantity: 1 }];

         return {
            ...currentState,
            cart,
            isCartOpen: true,
         };
      });
   }

   function handleIncrement(id: string) {
      setState((currentState) => ({
         ...currentState,
         cart: currentState.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
         ),
      }));
   }

   function handleDecrement(id: string) {
      setState((currentState) => ({
         ...currentState,
         cart: currentState.cart
            .map((item) =>
               item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
      }));
   }

   function handleRemove(id: string) {
      setState((currentState) => ({
         ...currentState,
         cart: currentState.cart.filter((item) => item.id !== id),
      }));
   }

   return (
      <div className="app">
         <div className="hero">
            <Header
               cartItemCount={cartItemCount}
               onCartClick={() => setState((currentState) => ({ ...currentState, isCartOpen: true }))}
               onMenuClick={() => setIsFilterOpen((currentOpen) => !currentOpen)}
            />
            <section className="featured-product">
               <div className="featured-text">
                  <h2>The All Dark</h2>
                  <p>
                     Premium handcrafted everyday carry wallet designed with a minimalist
                     aesthetic.
                  </p>
                  <button
                     className="add-to-cart"
                     onClick={() => handleAddToCart(state.products[5])}
                  >
                     Add Featured Item
                  </button>
               </div>
               <div className="featured-image">
                  <img src={state.products[5]?.image} alt={state.products[5]?.name ?? "Featured product"} />
               </div>
            </section>
         </div>
         <div className="separationLine"></div>
         <div className="productsGrid">
            {visibleProducts.map((product) => (
               <ProductBox key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
         </div>
         <FilterBox
            isOpen={isFilterOpen}
            categories={categories}
            filters={state.filters}
            onSearchChange={(searchQuery) =>
               updateFilters((currentFilters) => ({ ...currentFilters, searchQuery }))
            }
            onCategoryChange={(category) =>
               updateFilters((currentFilters) => ({ ...currentFilters, category }))
            }
            onMaxPriceChange={(maxPrice) =>
               updateFilters((currentFilters) => ({ ...currentFilters, maxPrice }))
            }
            onSortByChange={(sortBy: SortBy) =>
               updateFilters((currentFilters) => ({ ...currentFilters, sortBy }))
            }
            onApply={() => setIsFilterOpen(false)}
         />
         <ShoppingCart
            cart={state.cart}
            isOpen={state.isCartOpen}
            onClose={() => setState((currentState) => ({ ...currentState, isCartOpen: false }))}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
            subtotal={subtotal}
            grandTotal={subtotal}
         />
      </div>
   );
}
export default App;
