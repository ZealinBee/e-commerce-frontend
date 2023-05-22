import React, { useState } from "react";

import "../styles/components/search.scss";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";

function Search() {
 
  const dispatch = useAppDispatch();

  

  return (
    <>
      
      {/* {searchResults.map((result) => {
        return (
          <div key={result.id}>{result.title}</div>
        )
      })} */}
    </>
  );
}

export default Search;
