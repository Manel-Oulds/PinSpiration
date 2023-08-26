import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function FollowsList({ followees, onClose }) {
  const history = useHistory();

  const handleFolloweeClick = (userId) => {
    debugger;
    history.push(`/users/${userId}`);
    // onClose(); 
  };

  return (
    <div>
      {followees.map((followee) => (
        <div
          key={followee.id}
          className="follows-div"
          onClick={() => handleFolloweeClick(followee.id)}
        >
          <NavLink to={`${`/users/${followee.id}`}`}></NavLink>
          <button className="username-btn">{followee.username[0]}</button>
          {followee.username}
        </div>
      ))}
    </div>
  );
}

export default FollowsList;
