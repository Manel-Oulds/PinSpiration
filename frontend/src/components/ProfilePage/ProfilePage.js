import React from 'react'
import UpdateFormPage from '../UpdateProfile/UpdateProfile'
import { useSelector } from "react-redux";
import Navigation from '../Navigation';

function EditProfile() {
    const sessionUser = useSelector((state) => state.session.user);
    const isLoggedIn = !!sessionUser;
  return (
    
    <>
        <Navigation/>
        <UpdateFormPage/>
    </>
    
  )
}

export default EditProfile