import React, { useState } from "react";
import { Navigate, useNavigate  } from "react-router-dom";

import loginUserI from "../types/loginUser";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import { loginUser } from "../redux/reducers/usersReducer";
import Header from "../components/Header";
import useAppSelector from "../redux/hooks/useAppSelectors";

function Login() {
  const [user, setUser] = useState<loginUserI>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function formChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginUser(user));
  }

  const isLoggedIn = useAppSelector((state) => state.usersReducer.isLoggedIn);
  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <>
      <Header></Header>
      <form onSubmit={formSubmitHandler}>
        <input
          type="email"
          onChange={formChangeHandler}
          name="email"
          placeholder="email"
          value={user.email}
        />
        <input
          type="password"
          onChange={formChangeHandler}
          name="password"
          placeholder="password"
          value={user.password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
