import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as userActions from "../../store/user";
import { createPin } from "../../store/pin";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export function ShowPinItem({ pin }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[pin.userId]);

  useEffect(() => {
    dispatch(userActions.fetchUser(pin.userId));
  }, [dispatch, pin.userId]);

  const currentUser = useSelector((state) => state.session.user);

  const handleSavePin = () => {
    dispatch(
      createPin({
        imgUrl: pin.imgUrl,
        title: pin.title,
        description: pin.description,
      })
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pin-item">
      <div className="image-pin">
        <img src={pin.imgUrl} className="user-pin" alt="Pin" />
      </div>
      <div className="pin-informations">
        <div className="title-save">
          <h2 className="title-pin">{pin.title}</h2>
          <button className="save-pin-btn"
          //  onClick={handleSavePin}
           >
            save
          </button>
        </div>

        <h1 className="descr-pin">{pin.description}</h1>
        <NavLink to={`/users/${user.id}`}>
          <div className="created-by">
            <div className="first">
              <button className="circle-username">{user.username[0]}</button>
              <h1 className="user-username">{user.username}</h1>
            </div>
            <div className="second">
              <button className="gray-btn lightgray">Follow</button>
            </div>
          </div>
        </NavLink>
        <div className="comments">
          <h1>Comments</h1>
          <h2>No Comments yet</h2>
        </div>
      </div>
    </div>
  );
}

export default ShowPinItem;
