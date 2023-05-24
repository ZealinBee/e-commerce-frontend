import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  }, []);

  return (
    <>
      <Header></Header>
      <h1>Profile Page</h1>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <img src={user?.avatar} alt="" />
    </>
  );
}

export default ProfilePage;
