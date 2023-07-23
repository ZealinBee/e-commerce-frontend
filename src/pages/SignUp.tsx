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
import Box from "@mui/material/Box";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { createNewUser } from "../redux/reducers/usersReducer";
import simpleUser from "../types/SimpleUser";
import Header from "../components/Header";
import useAppSelector from "../redux/hooks/useAppSelectors";

function SignUp() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<simpleUser>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const errorMessage = useAppSelector((state) => state.usersReducer.error)

  function signUpChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function signUpSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createNewUser(user));
  }

  function showPasswordHandler() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <Header></Header>
      <Box sx={{backgroundColor:"background.default", color:"text.primary", minHeight:"95vh"}}>
      <h1 className="page-name" style={{marginTop:"0", paddingTop:"1rem"}}>Sign up</h1>
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
            {...(errorMessage ? {error: true} : {})}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            onChange={signUpChangeHandler}
            style={{ marginBottom: "1rem" }}
            required
            value={user.email}
            {...(errorMessage ? {error: true} : {})}
          />
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            sx={{ marginBottom: "1rem" }}
            value={user.password}
            onChange={signUpChangeHandler}
            {...(errorMessage ? {error: true} : {})}
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
            placeholder="more than 4 characters"
          />
          <TextField
            label="Avatar URL"
            type="text"
            placeholder="muts be image url"
            name="avatar"
            onChange={signUpChangeHandler}
            style={{ marginBottom: "1rem" }}
            required
            value={user.avatar}
            {...(errorMessage ? {error: true} : {})}
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
          {
            errorMessage ? (
              <Typography color="secondary">Please check if you have filled everything correctly</Typography>
            ) : null
          }
        </form>
      </div>
      </Box>
    </>
  );
}

export default SignUp;
