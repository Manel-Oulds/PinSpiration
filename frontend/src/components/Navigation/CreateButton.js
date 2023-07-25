import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function CreateButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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

  const createpin = (e) => {
  };

  return (
    <div ref={menuRef}>
      <button onClick={toggleMenu}>
        Create <i class="fa-solid fa-chevron-down"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>
            <button onClick={createpin}>Create Pin</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default CreateButton;
