import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../Navigation";
import AnimationImages from "./AnimationImages";
import PinsIndex from "../PinsIndex";
import "./signup"
import Signup from "./signup";

export default function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const isLoggedIn = !!sessionUser;
  return (
    <>
      <Navigation />
      {!isLoggedIn &&
      <div>
        <AnimationImages />
        <Signup/>
      </div> }
      {isLoggedIn && <PinsIndex />}
    </>
  );
}
