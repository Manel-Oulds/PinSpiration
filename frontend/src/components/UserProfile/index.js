import "./UserProfile.css";
import React, { useEffect, useState } from "react";
import {
  NavLink,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import { useDispatch, useSelector } from "react-redux";
import PinShow from "../PinShow";
import * as userActions from "../../store/user";
import Modal from "../context/Modal";
import BoardForm from "../BoardForm";
import BoardShow from "../BoardShow";
import { fetchAllBoards, fetchBoards } from "../../store/board";
import { fetchAllBoardPins } from "../../store/boardPins";
import { fetchAllPins } from "../../store/pin";
import UserError from "../../components/UserEror/index.js";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import * as followActions from "../../store/follow";
import ModalFollow from "../context/ModalFollow";

function UserProfile() {
  const history = useHistory();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);
  const currentUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const userBoards = useSelector((state) => state.users[userId]?.boardIds);
  const boardPins = useSelector((state) => state.boardPins);
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const followees = useSelector((state) => state.follows.followees);
  const followers = useSelector((state) => state.follows.followers);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFolloweesModal, setShowFolloweesModal] = useState(false);

  useEffect(() => {
    // Fetch user data and boards
    const fetchUserAndBoards = async () => {
      setLoading(true);
      try {
        await dispatch(userActions.fetchUser(userId));
        await dispatch(fetchAllBoards());
        await dispatch(fetchAllBoardPins());
        await dispatch(fetchAllPins());
        await dispatch(fetchBoards(userId));
        await dispatch(followActions.fetchFollowees(currentUser.id));
        await dispatch(followActions.fetchFollowers(currentUser.id));
        // await dispatch(followActions.fetchFollowees(userId));
        // await dispatch(followActions.fetchFollowees(userId));
        setLoading(false);
      } catch {
        setUserExists(false);
        setLoading(false);
      }
    };

    const res = dispatch(fetchAllBoardPins());

    fetchUserAndBoards();
  }, [userId, dispatch]);

  const handleFollow = async () => {
    const followerId = currentUser.id;
    const followee = user;

    if (followees.some((followee) => followee.id === user.id)) {
      // Unfollow if already following
      await dispatch(followActions.deleteFollow(followerId, followee.id));
      setIsFollowing(false);
    } else {
      await dispatch(followActions.followUser(followerId, followee));
      setIsFollowing(true);
    }
  };

  const handleOpenFollowersModal = () => {
    setShowFollowersModal(true);
  };

  const handleCloseFollowersModal = () => {
    setShowFollowersModal(false);
  };

  const handleOpenFolloweesModal = () => {
    setShowFolloweesModal(true);
  };

  const handleCloseFolloweesModal = () => {
    setShowFolloweesModal(false);
  };

  if (!loading && !userExists) {
    return <Redirect to="/users/error" />;
  }

  if (!user) return null;

  const handleCreateBoard = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <i
          className="fa-solid fa-spinner fa-spin"
          style={{ color: "#ff0000" }}
        ></i>
      </div>
    );
  }
  const handleFolloweeClick = (userId) => {
    history.push(`/users/${userId}`);
    // handleCloseFollowersModal();
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

        <div>
          {currentUser.id === user.id && (
            <div>
              <button
                className="input-email"
                onClick={handleOpenFollowersModal}
              >
                {followers.length} Followers
              </button>
              <button
                className="input-email"
                onClick={handleOpenFolloweesModal}
              >
                {followees.length} Followees
              </button>
            </div>
          )}
        </div>

        {currentUser.id === user.id && (
          <NavLink to="/edit">
            <button className="edit"> Edit Profile</button>
          </NavLink>
        )}
        {currentUser.id !== user.id && (
          <button className="edit" onClick={handleFollow}>
            {isFollowing ||
            followees.some((followee) => followee.id === user.id)
              ? "Following"
              : "Follow"}
          </button>
        )}
      </div>

      {userId == currentUser.id && (
        <div className="plus-btn" onClick={() => handleCreateBoard()}>
          <i className="fa-solid fa-plus fa-2xl"></i>
        </div>
      )}

      <div>
        <BoardShow user={user} />
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <BoardForm onClose={handleCloseModal} />
        </Modal>
      )}
      <div>
        {showFollowersModal && (
          <ModalFollow onClose={handleCloseFollowersModal}>
            {followers.map((follower) => (
              <div
                key={follower.id}
                className="follows-div"
                onClick={() => handleFolloweeClick(follower.id)}
              >
                <button className="username-btn">{follower.username[0]}</button>
                {follower.username}
              </div>
            ))}
          </ModalFollow>
        )}
      </div>

      <div>
        {showFolloweesModal && (
          <ModalFollow onClose={handleCloseFolloweesModal}>
            {followees.map((followee) => (
              <div
                key={followee.id}
                className="follows-div"
                onClick={() => handleFolloweeClick(followee.id)}
              >
                <button className="username-btn">{followee.username[0]}</button>
                {followee.username}
              </div>
            ))}
          </ModalFollow>
        )}
      </div>
    </>
  );
}

export default UserProfile;
