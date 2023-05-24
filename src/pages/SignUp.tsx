import React, { useState } from "react";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { createNewUser } from "../redux/reducers/usersReducer";
import simpleUser from "../types/simpleUser";
import Header from "../components/Header";

function SignUp() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<simpleUser>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  function signUpChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function signUpSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createNewUser(user))
    console.log(user)
  }

  return (
    <>
      <Header></Header>
      <form onSubmit={signUpSubmitHandler}>
        <input
          type="text"
          placeholder="username"
          name="name"
          onChange={signUpChangeHandler}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={signUpChangeHandler}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={signUpChangeHandler}
        />
        <input
          type="text"
          placeholder="image url"
          name="avatar"
          onChange={signUpChangeHandler}
        />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default SignUp;
