import React from "react";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { createUser } from "../redux/reducers/UsersReducer";
import useAppSelector from "../redux/hooks/useAppSelectors";
import useAppDispatch from "../redux/hooks/useAppDispatch";

function HomePage() {
  const users = useAppSelector((state) => state.usersReducer);
  console.log(users);
  const dispatch = useAppDispatch();
  const addUser = () => {
    dispatch(createUser({}));
  };
  return (
    <div>
      <button onClick={addUser}>Create User</button>
    </div>
  );
}

export default HomePage;
