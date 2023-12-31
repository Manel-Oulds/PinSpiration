import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <div ref={menuRef}>
      <button onClick={toggleMenu} className="dropdown">
        <i className="fa-solid fa-chevron-down"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <div className="infos">
              <div className="pic">
                <input
                  type="text"
                  className="input-username"
                  value={`${sessionUser.username[0]}`}
                  disabled
                />
              </div>
              <div className="use">
                <NavLink className="nav-prof" to={`/users/${sessionUser.id}`}>
                  {sessionUser.username}
                </NavLink>
                <NavLink className="nav-prof" to={`/users/${sessionUser.id}`}>
                  {sessionUser.email}
                </NavLink>
              </div>
            </div>
          </li>
          <li>
            <NavLink to="/edit" className="nav-prof">
              Edit Profile
            </NavLink>
          </li>
          <li>
            <button onClick={logout}>Log out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
