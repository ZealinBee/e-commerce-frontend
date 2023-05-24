import React, { useState } from "react";

import loginUserI from "../types/loginUser";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import { loginUser } from "../redux/reducers/usersReducer";
import Header from "../components/Header"

function Login() {
  const [user, setUser] = useState<loginUserI>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

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
