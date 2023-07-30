import React, { useState, useRef, useEffect } from "react";
import "./Pin.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as pinActions from "../../store/pin";
import * as boardActions from "../../store/board";
import Navigation from "../Navigation";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Pin() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showLoad, setShowLoad] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [selectedBoard, setSelectedBoard] = useState("All Pins");
  const fileInputRef = useRef(null);
  const userBoards = useSelector((state) => state.session.user.boardIds);
  const boards = useSelector((state) => state.boards);
  let err = false;

  //  useEffect(() => {
  //   dispatch(boardActions.fetchBoards(sessionUser.id));
  // }, [dispatch, sessionUser.id]);

  useEffect(() => {
    dispatch(boardActions.fetchBoards(sessionUser.id));
  }, []);

  //Not working yet Its for the board selection
  const handleSelectChange = (event) => {
    setSelectedBoard(event.target.value);
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleCreate = async (e) => {
    setShowLoad(true);
    setErrors([]);
    e.preventDefault();
    const formData = new FormData();
    formData.append("pin[description]", description);
    formData.append("pin[user_id]", sessionUser.id);
    formData.append("pin[title]", title);
    if (image) {
      formData.append("pin[image]", image);
    }

    dispatch(pinActions.createPin(formData))
      .then((data) => {
        if (!data?.errors) {
          history.push(`/users/${sessionUser.id}`);
        }
        setShowLoad(false);
      })
      .catch(async (res) => {
        setShowLoad(false);
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }

        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setImage(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => setImageUrl(fileReader.result);
    } else setImageUrl(null);
  };

  let preview = null;

  return (
    <div className="pin-div">
      <Navigation />
      <div className="create-pin">
        <form onSubmit={handleCreate}>
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>

          <div className="information">
            <div className="image-pin">
              <div className="div-image" onClick={handleDivClick}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFile}
                />
                {image ? (
                  <img
                    src={imageUrl}
                    alt="Selected"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <p className="image-text">Click here to upload an image</p>
                )}
              </div>
            </div>
            <div className="info-pin">
              <div className="btn-div">
                <select
                  value={selectedBoard}
                  onChange={handleSelectChange}
                  className="select-board"
                >
                  <option value="All Pins" selected>
                    All Pins
                  </option>
                  {userBoards.map((boardId) => {
                    const board = boards[boardId];
                    return (
                      <option key={boardId} value={boardId}>
                        {board.title}
                      </option>
                    );
                  })}
                </select>
                <button className="pin-btn">Create Pin</button>
              </div>

              <input
                className="my-input pintitle"
                type="text"
                value={title}
                placeholder="Add your title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {title.length < 0 && (err = true) && (
                <p>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  Hmm...title can't be empty.
                </p>
              )}
              <div className="profile-infos">
                <input
                  type="text"
                  className="input-username"
                  value={`${sessionUser.username[0]}`}
                  disabled
                />
                <div className="use">
                  <NavLink className="nav-prof" to={`/${sessionUser.username}`}>
                    {sessionUser.username}
                  </NavLink>
                  <NavLink className="nav-prof" to={`/${sessionUser.username}`}>
                    {sessionUser.email}
                  </NavLink>
                </div>
              </div>
              <input
                className="my-input pindescription"
                type="text"
                placeholder="Tell everyone what your pin is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Pin;
