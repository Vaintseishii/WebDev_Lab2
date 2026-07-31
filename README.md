# Blackout EDC
Blackout EDC is a single-page React app for browsing all black everyday carry gear, filtering products, managing a cart, and processing a simulated checkout.

## Members
- Xanth Reign Palmes
- Joseph Brian Azarraga (Vigger)

## Setup
1. Install Node.js and npm if not yet installed
2. Clone the repository
3. Install dependencies with "npm install"
4. To run the website type "npm start"

Core Features and Requirements
Product Browsing & Filtering
Display a grid of products fetched from a static JSON file or mock data file.
Filter products by category, max price range, and search query.
Sort products by price (low-to-high, high-to-low) or title.
Global Cart Management
Slide-out / Drawer overlay for the Shopping Cart.
Add items, remove items, and adjust item quantities (+ / -).
Calculate real-time subtotal, and final grand total.

User Experience Details
Badge counter on the cart icon reflecting the total item count (not just distinct line items).

Initial State Shape
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string; // url to the product's image
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface State {
  products: Product[];
  cart: CartItem[];
  filters: {
    searchQuery: string;
    category: string;
    maxPrice: number;
    sortBy: 'default' | 'price-asc' | 'price-desc';
  };
  isCartOpen: boolean;
}