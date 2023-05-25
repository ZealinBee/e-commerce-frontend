import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
    dispatch(createNewUser(user));
    console.log(user);
  }

  return (
    <>
      <Header></Header>
      <form onSubmit={signUpSubmitHandler}>
        <TextField
          label="Username"
          type="text"
          name="name"
          onChange={signUpChangeHandler}
          style={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          onChange={signUpChangeHandler}
          style={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={signUpChangeHandler}
          style={{ marginBottom: "1rem" }}
          required
        />
        <TextField
          label="Avatar URL"
          type="text"
          placeholder="image url"
          name="avatar"
          onChange={signUpChangeHandler}
          style={{ marginBottom: "1rem" }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          style={{ marginBottom: "1rem" }}
        >
          Sign up
        </Button>
        <Typography>
          Already got an account?{" "}
          <Link to="/login" style={{ color: "blue" }}>
            Login
          </Link>
        </Typography>
      </form>
    </>
  );
}

export default SignUp;
