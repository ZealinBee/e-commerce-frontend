import React, {  useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { sortProductByPrice } from "../redux/reducers/productsReducer";


interface SortByPriceProps {
  onSortByPrice: (direction: "asc" | "desc" | "Default") => void;
}
function SortByPrice({ onSortByPrice }: SortByPriceProps) {
  const dispatch = useAppDispatch();
  const [selectedPrice, setSelectedPrice] = useState<
    "asc" | "desc" | "Default"
  >("Default");

  function handleChange(e: SelectChangeEvent<string>) {
    const value = e.target.value as "asc" | "desc" | "Default";
    setSelectedPrice(value);
  }

  return (
    <div className="sort-by-price">
      <InputLabel id="price-select">Sort by Price</InputLabel>
      <Select
        labelId="price-select"
        label="Price"
        id="price-select"
        value={selectedPrice}
        onChange={(e) => handleChange(e)}
      >
        <MenuItem value="Default" onClick={() => dispatch(sortProductByPrice("Default"))}>Default</MenuItem>
        <MenuItem value="asc" onClick={() => dispatch(sortProductByPrice("asc")) }>Price Low to High</MenuItem>
        <MenuItem value="desc" onClick={() => dispatch(sortProductByPrice("desc"))}>Price High to Low</MenuItem>
      </Select>
    </div>
  );
}

export default SortByPrice;
