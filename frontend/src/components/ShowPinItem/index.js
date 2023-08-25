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
  const allPinId = userBoardIds.find(
    (boardId) => allBoards[boardId]?.title === "All Pins"
  );
  const followees = useSelector((state) => state.follows.followees);
  const followers = useSelector((state) => state.follows.followers);

  useEffect(() => {
    dispatch(userActions.fetchUser(pin.userId));
  }, [dispatch, pin.userId]);

  const currentUser = useSelector((state) => state.session.user);

  const handleSavePin = () => {
    dispatch(
      addBoardPin({
        board_pin: {
          board_id: allPinId,
          pin_id: pin.id,
        },
      })
    );
    setIsSaved(true);
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
    } else {
      await dispatch(followActions.followUser(followerId, followee));
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
          {/* <button
            className="save-pin-btn"
            onClick={handleSavePin}
            disabled={isSaved}
          >
            {isSaved ? "Saved" : "Save"}
          </button> */}
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
                className="gray-btn lightgray"
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
