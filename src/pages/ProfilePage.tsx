import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

import useAppSelector from "../redux/hooks/useAppSelectors";
import Header from "../components/Header";

function ProfilePage() {
  const user = useAppSelector((state) => state.usersReducer.currentUser);
  const isLoggedIn = useAppSelector((state) => state.usersReducer.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box sx={{backgroundColor:"background.default", color:"text.primary", minHeight:"100vh"}}>
      <Header></Header>
      <h1 className="page-name">Profile Page</h1>
      <div className="profile">
        <div className="profile__pfp-wrapper">
          <img src={user?.avatar} alt="" />
        </div>
        <div className="profile__information">
          <h4>Your information</h4>
          <p>Username: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      </div>
    </Box>
  );
}

export default ProfilePage;
