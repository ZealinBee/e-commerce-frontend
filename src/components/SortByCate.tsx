import React, { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControlLabel, RadioGroup, Radio, Typography } from "@mui/material";

import { fetchAllCategories } from "../redux/reducers/categoriesReducer";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelectors from "../redux/hooks/useAppSelectors";
import {
  fetchAllProducts,
  sortByCategory,
} from "../redux/reducers/productsReducer";

const SortByCate = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useAppDispatch();
  const categories = useAppSelectors(
    (state) => state.categoriesReducer.categories
  );

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value);
  };

  function handleSortByCategory(category: string) {
    dispatch(sortByCategory(category));
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <>
      <RadioGroup defaultValue="All" className="sort-by-cate">
        <FormControlLabel
          control={<Radio />}
          label="All"
          value="All"
          onClick={() => {
            dispatch(fetchAllProducts());
          }}
        ></FormControlLabel>
        {categories.map((category) => {
          return (
            <FormControlLabel
              control={<Radio />}
              label={category.name}
              key={category.id}
              value={category.name}
              onClick={() => handleSortByCategory(category.name)}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

export default SortByCate;
