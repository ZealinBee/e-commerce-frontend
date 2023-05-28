import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
  const errorMessage = useAppSelector((state) => state.usersReducer.error);

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
      <h1 className="page-name">Login</h1>
      <div className="auth-wrapper">
        <form onSubmit={formSubmitHandler} className="auth-form">
          <TextField
            label="Email"
            type="email"
            onChange={formChangeHandler}
            name="email"
            value={user.email}
            style={{ marginBottom: "1rem" }}
            required
            {...(errorMessage ? { error: true } : {})}
          />
          <TextField
            label="Password"
            type="password"
            onChange={formChangeHandler}
            name="password"
            value={user.password}
            style={{ marginBottom: "1rem" }}
            required
            {...(errorMessage ? { error: true } : {})}
          />
          <Button
            type="submit"
            variant="outlined"
            style={{ marginBottom: "1rem" }}
          >
            Login
          </Button>
          <Typography>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "blue" }}>
              Sign up
            </Link>
          </Typography>
          {errorMessage ? (
            <Typography color="secondary">Wrong email or password</Typography>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default Login;
