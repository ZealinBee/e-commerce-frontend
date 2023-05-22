import React, { ChangeEvent } from "react";

interface SortByPriceProps {
  onSortByPrice: (direction: "asc" | "desc") => void;
}
function SortByPrice({ onSortByPrice }: SortByPriceProps) {
  return (
    <>
      <label htmlFor="price-select">Sort by Price</label>
      <select id="price-select" style={{ marginBottom: "3rem" }}>
        <option value="">Default</option>
        <option value="Price Low to High">Price Low to High</option>
        <option value="Price High to Low">Price High to Low</option>
      </select>
    </>
  );
}

export default SortByPrice;
