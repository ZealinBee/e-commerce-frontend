import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { createNewUser } from "../redux/reducers/usersReducer";
import simpleUser from "../types/simpleUser";
import Header from "../components/Header";

function SignUp() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  function showPasswordHandler() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <Header></Header>
      <h1 className="page-name">Sign up</h1>
      <div className="auth-wrapper">
        <form onSubmit={signUpSubmitHandler}>
          <TextField
            label="Username"
            type="text"
            name="name"
            onChange={signUpChangeHandler}
            style={{ marginBottom: "1rem" }}
            required
            value={user.name}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            onChange={signUpChangeHandler}
            style={{ marginBottom: "1rem" }}
            required
            value={user.email}
          />
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            sx={{ marginBottom: "1rem" }}
            value={user.password}
            onChange={signUpChangeHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility" 
                  onClick={showPasswordHandler}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <TextField
            label="Avatar URL"
            type="text"
            placeholder="image url"
            name="avatar"
            onChange={signUpChangeHandler}
            style={{ marginBottom: "1rem" }}
            required
            value={user.avatar}
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
      </div>
    </>
  );
}

export default SignUp;
