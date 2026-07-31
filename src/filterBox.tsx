import { useState } from "react";
import "./filterBox.css";

type FilterBoxProps = {
  isOpen: boolean;
};

export default function FilterBox({ isOpen }: FilterBoxProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");

  const categories = ["Knives", "Flashlights", "Wallets", "Bags", "Watches"];

  return (
    <div className={isOpen ? "filterBox filterBox--open" : "filterBox"}>

      <div className="filter-header">
        <h1>Filter</h1>
      </div>

      <div className="input-group">
        <input type="text" name="search" placeholder="Search" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>

      <div className="range-group">
        <input type="text" className="range-input" />
        <span className="range-separator">To</span>
        <input type="text" className="range-input" />
      </div>


      <div className="category-group">
        <div className="category-display">
          <span>{selectedCategory}</span>
        </div>
        <button
          type="button"
          className="category-toggle"
          onClick={() => setIsCategoryOpen((open) => !open)}
          aria-label="Open category dropdown"
          aria-expanded={isCategoryOpen}
        >
          <svg className={isCategoryOpen ? "dropdown-icon dropdown-icon--open" : "dropdown-icon"} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {isCategoryOpen && (
          <div className="category-menu" role="listbox" aria-label="Category options">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="category-option"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsCategoryOpen(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

  
      <button className="apply-btn">Apply</button>
    </div>
  );
}