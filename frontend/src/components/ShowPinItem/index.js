import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as userActions from "../../store/user";
import { createPin } from "../../store/pin";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addBoardPin } from "../../store/boardPins";
import * as followActions from "../../store/follow";

export function ShowPinItem({ pin }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[pin.userId]);
  const userBoardIds = useSelector((state) => state.session.user.boardIds);
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);
  const allBoards = useSelector((state) => state.boards);
  const boardPins = useSelector((state) => state.boardpins);
  const allPinId = userBoardIds.find(
    (boardId) => allBoards[boardId]?.title === "All Pins"
  );
  const followees = useSelector((state) => state.follows.followees);
  const followers = useSelector((state) => state.follows.followers);
  const boards = useSelector((state) => state.boards);
  const [selectedBoards, setSelectedBoards] = useState({});

  const isPinSaved = Object.values(userBoardIds).some((boardId) =>
    boardPins[boardId]?.includes(pin.id)
  );

  useEffect(() => {
    dispatch(userActions.fetchUser(pin.userId));
  }, [dispatch, pin.userId]);

  const currentUser = useSelector((state) => state.session.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const boardId = userBoardIds
    .map((boardId) => (boardPins[boardId]?.includes(pin.id) ? boardId : null))
    .filter(Boolean);
  const board = userBoardIds.map((boardId) =>
    boardPins[boardId]?.includes(pin.id) ? boards[boardId].title : null
  );

  const handleSavePin = (pin, selectedBoardId) => {
    if (!selectedBoardId) {
      selectedBoardId = allPinId;
    }

    dispatch(
      addBoardPin({
        board_pin: {
          board_id: selectedBoardId,
          pin_id: pin?.id,
        },
      })
    );
    setIsSaved(true);
    history.push(`Users/${currentUser.id}`);
  };

  const handleSavedPin = () => {
    history.push(`users/${currentUser.id}/boards/${boardId}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleFollow = async (user) => {
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

  return (
    <div className="pin-item">
      <div className="image-pin">
        <img src={pin.imgUrl} className="user-pin" alt="Pin" />
      </div>
      <div className="pin-informations">
        <div className="title-save">
          <h2 className="title-pin">{pin.title}</h2>
          {!isPinSaved && (
            <div className="custom-select">
              {/* <select
                // id="dropdown"
                value={selectedBoards[pin.id] || ""}
                onChange={(e) =>
                  setSelectedBoards((prevSelectedBoards) => ({
                    ...prevSelectedBoards,
                    [pin.id]: e.target.value,
                  }))
                }
                className="select-board"
              >
                <option value={allPinId} className="option-allpins">
                  All Pins
                </option>
                {userBoardIds.map((boardId) => {
                  const board = allBoards[boardId];
                  if (board && boardId !== allPinId) {
                    return (
                      <option key={boardId} value={boardId}>
                        {board.title}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
              <button className="save-pin-btn" onClick={() => handleSavePin(pin, selectedBoards)}>
                Save
              </button> */}
            </div>
          )}
          {isPinSaved && (
            <div className="saved-div">
              <div style={{ margin: "15px", color: "white" }}>
                <NavLink to={`users/${currentUser.id}/boards/${boardId}`}>
                  {" "}
                  {board}
                </NavLink>
              </div>
              <button
                className="save-pin-btn"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => handleSavedPin()}
                disabled="true"
              >
                Saved
              </button>
            </div>
          )}
        </div>

        <h1 className="descr-pin">{pin.description}</h1>

        <div className="created-by">
          <NavLink to={`/users/${user.id}`}>
            <div className="first">
              <button className="circle-username">{user.username[0]}</button>
              <h1 className="user-username">{user.username}</h1>
            </div>
          </NavLink>
          <div className="second">
            {currentUser.id !== user.id && (
              <button
                className={`edit ${isFollowing ? "following" : "follow"}`}
                onClick={() => handleFollow(user)}
              >
                {followees.some((followee) => followee.id === user.id)
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
        </div>

        <div className="comments">
          <h1>Comments</h1>
          <h2>No Comments yet</h2>
        </div>
      </div>
    </div>
  );
}

export default ShowPinItem;
