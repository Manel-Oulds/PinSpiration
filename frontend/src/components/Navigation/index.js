import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      
      <div className="nav-right">
            <NavLink to="/login" className="login">Log in</NavLink>
            <NavLink to="/signup" className="signup">Sign up</NavLink>
      </div>
   
      
    );
  }

  return (
    <div className="navbar">
        <NavLink exact to="/">
          <img src="" alt="PinSpiration" />
        </NavLink>
        {sessionLinks}
    </div>
  );
}

export default Navigation;
