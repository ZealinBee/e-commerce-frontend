import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import { BeatLoader } from "react-spinners";

import loginUserI from "../types/LoginUser";
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
  let loading = useAppSelector((state) => state.usersReducer.loading);

  function formChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await dispatch(loginUser(user));
    if (response.payload === "error") {
      toast.error("Wrong email or password");
      return;
    }
    toast.success("Login successfully!");
  }

  const isLoggedIn = useAppSelector((state) => state.usersReducer.isLoggedIn);
  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <>
      <Header></Header>
      <Box
        sx={{
          backgroundColor: "background.default",
          color: "text.primary",
          minHeight: "95vh",
        }}
      >
        <h1
          className="page-name"
          style={{ marginTop: "0", paddingTop: "1rem" }}
        >
          Login
        </h1>
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
              variant="contained"
              style={{ marginBottom: "1rem" }}
            >
              Login
              {loading ? (
                <BeatLoader
                  color="black"
                  size="5"
                  style={{ marginLeft: "1rem" }}
                />
              ) : null}
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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Box>
    </>
  );
}

export default Login;
