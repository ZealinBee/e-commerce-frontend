import React, { ChangeEvent, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

interface SortByPriceProps {
  onSortByPrice: (direction: "asc" | "desc") => void;
}
function SortByPrice({ onSortByPrice }: SortByPriceProps) {
  const [selectedPrice, setSelectedPrice] = useState("Default");

  function handleChange(e: SelectChangeEvent<string>) {
    setSelectedPrice(e.target.value);
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
        <MenuItem value="Price Low to High">Price Low to High</MenuItem>
        <MenuItem value="Price High to Low">Price High to Low</MenuItem>
      </Select>
    </>
  );
}

export default SortByPrice;
