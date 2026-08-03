import { useEffect, useState } from "react";
import "./filterBox.css";
import type { Filters, SortBy } from "./types";

type FilterBoxProps = {
  isOpen: boolean;
  categories: string[];
  filters: Filters;
  onApply: (filters: Filters) => void;
};

export default function FilterBox({
  isOpen,
  categories,
  filters,
  onApply,
}: FilterBoxProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [draft, setDraft] = useState<Filters>(filters);

  useEffect(() => {
    if (isOpen) {
      setDraft(filters);
    }
  }, [isOpen, filters]);

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
          value={draft.searchQuery}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, searchQuery: event.target.value }))
          }
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
          value={draft.maxPrice}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, maxPrice: Number(event.target.value) }))
          }
        />
      </div>

      <div className="category-group">
        <select
          className="select-input"
          value={draft.category}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, category: event.target.value }))
          }
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
          value={draft.sortBy}
          onChange={(event) =>
            setDraft((prev) => ({ ...prev, sortBy: event.target.value as SortBy }))
          }
        >
          <option value="default">Sort by default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Title: A to Z</option>
        </select>
      </div>

      <button className="apply-btn" onClick={() => onApply(draft)}>Apply</button>
    </div>
  );
}
