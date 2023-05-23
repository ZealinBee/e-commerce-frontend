import React, { ChangeEvent, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

interface SortByPriceProps {
  onSortByPrice: (direction: "asc" | "desc" | "Default") => void;
}
function SortByPrice({ onSortByPrice }: SortByPriceProps) {
  const [selectedPrice, setSelectedPrice] = useState<
    "asc" | "desc" | "Default"
  >("Default");

  function handleChange(e: SelectChangeEvent<string>) {
    const value = e.target.value as "asc" | "desc" | "Default";
    setSelectedPrice(value);
    onSortByPrice(selectedPrice);
  }
  return (
    <>
      <InputLabel id="price-select">Sort by Price</InputLabel>
      <Select
        labelId="price-select"
        label="Price"
        id="price-select"
        value={selectedPrice}
        style={{ marginBottom: "3rem" }}
        onChange={(e) => handleChange(e)}
      >
        <MenuItem value="Default">Default</MenuItem>
        <MenuItem value="desc">Price Low to High</MenuItem>
        <MenuItem value="asc">Price High to Low</MenuItem>
      </Select>
    </>
  );
}

export default SortByPrice;
