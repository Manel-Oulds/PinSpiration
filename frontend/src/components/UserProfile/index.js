import "./UserProfile.css";
import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "../Navigation";

import { useSelector } from "react-redux";

function UserProfile() {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <>
      <Navigation />
      <div className="info-picture">
        <button
          className="profile-picture"
          value={`${sessionUser.username[0]}`}
        >
          {sessionUser.username[0]}{" "}
        </button>
      </div>
      <div className="informations">
        <input
          type="text"
          className="user-name"
          value={`${sessionUser.username}`}
          disabled
        />
        <input
          type="text"
          className="input-email"
          value={`${sessionUser.email}`}
          disabled
        />
        <NavLink to="/edit">
          <button className="edit"> Edit Profile</button>
        </NavLink>
      </div>
    </>
  );
}

export default UserProfile;
