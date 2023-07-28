import "./UserProfile.css";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import PinShow from "../PinShow";
import * as userActions from "../../store/user";

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    dispatch(userActions.fetchUser(userId));
  }, [userId]);

  if (!user) return null;

  return (
    <>
      <Navigation />
      <div className="info-picture">
        <button className="profile-picture" value={`${user.username[0]}`}>
          {user.username[0]}{" "}
        </button>
      </div>
      <div className="informations">
        <input
          type="text"
          className="user-name"
          value={`${user.username}`}
          disabled
        />
        <input
          type="text"
          className="input-email"
          value={`${user.email}`}
          disabled
        />
        <NavLink to="/edit">
          <button className="edit"> Edit Profile</button>
        </NavLink>
      </div>
      <div>
        <PinShow user={user} />
      </div>
    </>
  );
}

export default UserProfile;
