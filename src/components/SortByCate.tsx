import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

type SortByCateProps = {
  onSortByCategory: (category: string) => void;
};

const SortByCate: React.FC<SortByCateProps> = ({ onSortByCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value);
    onSortByCategory(selectedCategory);
  };

  return (
    <div className="sort-by-cate">
      <InputLabel id="category-select">Sort by Category:</InputLabel>
      <Select
        labelId="category-select"
        id="category-select"
        onChange={handleCategoryChange}
        value={selectedCategory}
        label="Category"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Shoes">Shoes</MenuItem>
        <MenuItem value="mmm">mmm</MenuItem>
        <MenuItem value="Nueva categoria">Nueva categoria</MenuItem>
      </Select>
    </div>
  );
};

export default SortByCate;
