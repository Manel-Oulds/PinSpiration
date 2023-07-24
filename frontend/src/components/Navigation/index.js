import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      
      <div className="nav-right">
            <LoginFormModal className="login"/>
            <SignupFormModal className="signup"/>
      </div>
   
      
    );
  }

  return (
    <div className="navbar">
        <NavLink exact to="/">
          <img src="Frame_new.svg" alt="PinSpiration" />
        </NavLink>
        {sessionLinks}
    </div>
  );
}

export default Navigation;