import React, { useEffect } from "react";
import Header from "../components/Header";
// import { createUser } from "../redux/reducers/usersReducer";
// import useAppSelector from "../redux/hooks/useAppSelectors";
// import useAppDispatch from "../redux/hooks/useAppDispatch";
// import { fetchAllUsers } from "../redux/reducers/usersReducer";

import ProductList from "../components/ProductList";

function HomePage() {
  // const users = useAppSelector((state) => state.usersReducer);
  // console.log(users);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchAllUsers());
  // }, []);

  return (
    <>
      <ProductList></ProductList>
    </>
  );
}

export default HomePage;
