import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateButton from "./CreateButton";
import * as pinActions from "../../store/pin";
import SearchBar from "./SearchBar";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className="nav-user">
          <NavLink exact to="/">
            <img
              src={`${process.env.PUBLIC_URL}/Frame_new.svg`}
              alt="PinSpiration"
            />
          </NavLink>
          <NavLink to="">
            <button className="home-btn btn">Home</button>
          </NavLink>
          <button className="explore-btn btn"> Explore </button>
          <CreateButton className="create-btn" />
          <SearchBar />
          {/* <input type="text" className="search-bar" placeholder=" 🔍 Search" /> */}
          <button className="notification-btn btn ">
            <a href="https://www.linkedin.com/in/manel-ould-saada-134231282/">
              <i class="fa-brands fa-linkedin fa-2xl"></i>
            </a>
          </button>
          <button className="message-btn btn ">
            <a href="https://github.com/Manel-oulds">
              {" "}
              <i class="fa-brands fa-square-github fa-2xl"></i>
            </a>
          </button>
          <NavLink to={`/users/${sessionUser.id}`}>
            <button className="profile-btn btn ">
              {sessionUser.username[0]}
            </button>
          </NavLink>
          <ProfileButton user={sessionUser} className="profile-btn" />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className="navbar">
          <NavLink exact to="/">
            <img src="Frame_new.svg" alt="PinSpiration" />
            <img src="pinspiration.svg" className="pin" alt="PinSpiration" />
          </NavLink>

          <div className="nav-right">
            <LoginFormModal className="login" />
            <SignupFormModal className="signup" />
          </div>
        </div>
      </>
    );
  }

  return <>{sessionLinks}</>;
}

export default Navigation;
