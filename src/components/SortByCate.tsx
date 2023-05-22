import React from "react";

type SortByCateProps = {
  onSortByCategory: (category: string) => void;
};

const SortByCate: React.FC<SortByCateProps> = ({ onSortByCategory }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    onSortByCategory(selectedCategory);
  };

  return (
    <div style={{ marginBottom: "3rem" }}>
      <label htmlFor="category-select">Sort by Category:</label>
      <select id="category-select" onChange={handleCategoryChange}>
        <option value="">All</option>
        <option value="Shoes">Shoes</option>
        <option value="mmm">mmm</option>
        <option value="Nueva categoria">Nueva categoria</option>
      </select>
    </div>
  );
};

export default SortByCate;
