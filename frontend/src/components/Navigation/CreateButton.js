import React, { useState, useEffect, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as boardActions from "../../store/board";
import "./CreateButton.css";

function CreateButton() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
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
  useEffect(() => {
    dispatch(boardActions.fetchBoards(sessionUser.id));
  }, []);
  const createpin = (e) => {
    history.push("/pin/edit");
  };

  return (
    // <div className="div-dropdown" ref={menuRef}>
    //   <button onClick={toggleMenu} className="dropdown">
    //     Create <i className="fa-solid fa-chevron-down"></i>
    //   </button>
    //   {showMenu && (
    //     <ul className="create-dropdown">
    //       <li>
    //         <button onClick={createpin}>Create Pin</button>
    //       </li>
    //     </ul>
    //   )}
    // </div>
    <div className="div-dropdown" ref={menuRef}>
      <button onClick={createpin} className="dropdown">
        Create Pin
      </button>
    </div>
  );
}

export default CreateButton;
