import React, { useEffect } from "react";
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";

import { fetchAllCategories } from "../redux/reducers/categoriesReducer";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelectors from "../redux/hooks/useAppSelectors";
import {
  fetchAllProducts,
  filterByCategory,
  searchProduct,
  sortProductByPrice,
} from "../redux/reducers/productsReducer";

interface SortByCateProps {
  setSelectedPrice: (direction: "asc" | "desc" | "Default") => void;
}

const SortByCate = ({setSelectedPrice} : SortByCateProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelectors(
    (state) => state.categoriesReducer.categories
  );
  const hasFetched = useAppSelectors(state => state.productsReducer.hasFetched)

  function handleSortByCategory(category: string) {
    dispatch(searchProduct(""))
    dispatch(filterByCategory(category));
    dispatch(sortProductByPrice("Default"))
    setSelectedPrice("Default")
  }

  useEffect(() => {
    if(hasFetched === false) {
      dispatch(fetchAllCategories());
    }else {
      return;
    }
  }, [dispatch, hasFetched]);

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
