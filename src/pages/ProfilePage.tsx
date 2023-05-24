import React from 'react'

import useAppSelector from '../redux/hooks/useAppSelectors'
import Header from "../components/Header"

function ProfilePage() {
  const user = useAppSelector((state) => state.usersReducer.currentUser)
  return (
    <>
      <Header></Header>
      <h1>Profile Page</h1>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <img src={user?.avatar} alt="" />
    </>
  )
}

export default ProfilePage