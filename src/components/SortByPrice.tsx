import React, {  useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { sortProductByPrice } from "../redux/reducers/productsReducer";

interface SortByPriceProps {
  onSortByPrice: (direction: "asc" | "desc" | "Default") => void;
  selectedPrice: "asc" | "desc" | "Default";
  setSelectedPrice: (direction: "asc" | "desc" | "Default") => void;
}

function SortByPrice({ onSortByPrice, selectedPrice, setSelectedPrice }: SortByPriceProps) {
  const dispatch = useAppDispatch();
  function handleChange(e: SelectChangeEvent<string>) {
    const value = e.target.value as "asc" | "desc" | "Default";
    setSelectedPrice(value);
  }

  return (
    <div className="sort-by-price">
      <InputLabel id="price-select" sx={{color:"text.primary"}}>Sort by Price</InputLabel>
      <Select
        labelId="price-select"
        label="Price"
        id="price-select"
        value={selectedPrice}
        onChange={(e) => handleChange(e)}
      >
        <MenuItem  sx={{color:"black"}} value="Default" onClick={() => dispatch(sortProductByPrice("Default"))}>Default</MenuItem>
        <MenuItem sx={{color:"black"}} value="asc" onClick={() => dispatch(sortProductByPrice("asc")) }>Price Low to High</MenuItem>
        <MenuItem sx={{color:"black"}} value="desc" onClick={() => dispatch(sortProductByPrice("desc"))}>Price High to Low</MenuItem>
      </Select>
    </div>
  );
}

export default SortByPrice;
