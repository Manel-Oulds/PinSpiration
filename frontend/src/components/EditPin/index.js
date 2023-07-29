import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as pinActions from "../../store/pin";

function EditPin({ pin, onCloseModal }) {
  const [title, setTitle] = useState(pin.title);
  const [board, selectedBoard] = useState();
  const [description, setDescription] = useState(pin.description);
  const history = useHistory();
  let err = false;
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleEdit = (pin) => {
    console.log(pin)
    dispatch(pinActions.updatePin({ ...pin, title, description }));
    onCloseModal();
  };
  const handleCancel = () => {
    onCloseModal();
  };

  const handleDelete = (id) => {
    dispatch(pinActions.deletePin(id));
  };

  return (
    <div className="my-div-edit">
      <label className="div-ed"> Edit this Pin</label>
      <div className="edit-pin">
        <div className="inf-pin">
          <div className="board-div">
            <label className="label-style"> Board</label>
            <select value={selectedBoard} className="sel-board">
              <option value="option1" selected disabled>
                Select a board
              </option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className="title-div">
            <label className="label-style">
              Title
              <input
                className="input-title"
                type="text"
                value={title}
                placeholder="Add your title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            {title.length < 0 && (err = true) && (
              <p>
                <i className="fa-solid fa-triangle-exclamation"></i>
                Hmm...title can't be empty.
              </p>
            )}
          </div>
          <div className="description-div">
            <label className="label-style">
              {" "}
              Description
              <input
                className="input-description"
                type="text"
                placeholder="Tell us about this pin"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="image-pin">
          <img src={pin.imgUrl} className="user-pins" alt="Pin" />
        </div>
      </div>
      <div className="footer">
        <div className="dlt-btn">
          <button className="gray-btn" onClick={() => handleDelete(pin)}>
            Delete
          </button>
        </div>
        <div className="cancel-save-div">
          <button className="gray-btn" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button className="red-btn" onClick={() => handleEdit(pin)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPin;
