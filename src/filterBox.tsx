import { useState } from "react";
import "./filterBox.css";
import type { Filters, SortBy } from "./types";

type FilterBoxProps = {
  isOpen: boolean;
  categories: string[];
  filters: Filters;
  onSearchChange: (searchQuery: string) => void;
  onCategoryChange: (category: string) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onSortByChange: (sortBy: SortBy) => void;
  onApply: () => void;
};

export default function FilterBox({
  isOpen,
  categories,
  filters,
  onSearchChange,
  onCategoryChange,
  onMaxPriceChange,
  onSortByChange,
  onApply,
}: FilterBoxProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className={isOpen ? "filterBox filterBox--open" : "filterBox"}>

      <div className="filter-header">
        <h1>Filter</h1>
      </div>

      <div className="input-group">
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={filters.searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>

      <div className="range-group">
        <input
          type="number"
          className="range-input"
          min="0"
          step="1"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(event) => onMaxPriceChange(Number(event.target.value))}
        />
      </div>


      <div className="category-group">
        <select
          className="select-input"
          value={filters.category}
          onChange={(event) => onCategoryChange(event.target.value)}
          onFocus={() => setIsCategoryOpen(true)}
          onBlur={() => setIsCategoryOpen(false)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <svg className={isCategoryOpen ? "dropdown-icon dropdown-icon--open" : "dropdown-icon"} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <div className="category-group">
        <select
          className="select-input"
          value={filters.sortBy}
          onChange={(event) => onSortByChange(event.target.value as SortBy)}
        >
          <option value="default">Sort by default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Title: A to Z</option>
        </select>
      </div>

  
      <button className="apply-btn" onClick={onApply}>Apply</button>
    </div>
  );
}