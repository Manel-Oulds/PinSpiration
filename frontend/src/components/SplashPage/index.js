import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import AnimationImages from "./AnimationImages";
import UpdateFormPage from "../UpdateProfile/UpdateProfile";
import EditProfile from "../ProfilePage/ProfilePage";

export default function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const isLoggedIn = !!sessionUser;
  return (
    <>
      <Navigation />
      {!isLoggedIn && <AnimationImages />}
    </>
  );
}
