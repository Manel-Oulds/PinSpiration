import "./UserProfile.css";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import PinShow from "../PinShow";
import * as userActions from "../../store/user";
import Modal from "../context/Modal";
import BoardForm from "../BoardForm";

function UserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);
  const currentUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(userActions.fetchUser(userId));
  }, [userId]);

  if (!user) return null;

  const handleCreateBoard = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        {currentUser.id === user.id && (
          <NavLink to="/edit">
            <button className="edit"> Edit Profile</button>
          </NavLink>
        )}
        {currentUser.id !== user.id && (
          <NavLink to="/edit">
            <button className="edit"> Follow</button>
          </NavLink>
        )}
      </div>
      <div className="plus-btn" onClick={() => handleCreateBoard()}>
        <i class="fa-solid fa-plus fa-2xl"></i>
      </div>
      <div>
        <PinShow user={user} />
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BoardForm onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}

export default UserProfile;
