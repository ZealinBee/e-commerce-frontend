import React, { useEffect } from "react";
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";

import { fetchAllCategories } from "../redux/reducers/categoriesReducer";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelectors from "../redux/hooks/useAppSelectors";
import {
  fetchAllProducts,
  filterByCategory,
} from "../redux/reducers/productsReducer";

const SortByCate = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelectors(
    (state) => state.categoriesReducer.categories
  );

  function handleSortByCategory(category: string) {
    dispatch(filterByCategory(category));
  }

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <>
      <RadioGroup defaultValue="All" className="sort-by-cate" >
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
