import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateButton from "./CreateButton";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-user">
        <button className="home-btn"> Home </button>
        <button className="explore-btn"> Explore </button>
        <CreateButton />
        <input type="text" className="search-bar" placeholder=" 🔍 Search"/>
        <button className="notification-btn"><i class="fa-solid fa-bell"></i></button>
        <button className="message-btn"><i class="fa-regular fa-comment-dots"></i></button>
        <button className="profile-btn">{sessionUser.username[0]}</button>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className="nav-right">
          <LoginFormModal className="login" />
          <SignupFormModal className="signup" />
        </div>
      </>
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
