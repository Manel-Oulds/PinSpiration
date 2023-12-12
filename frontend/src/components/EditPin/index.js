import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as pinActions from "../../store/pin";
import { fetchAllBoards, fetchBoards } from "../../store/board";
import {
  addBoardPin,
  deleteBoardPin,
  fetchAllBoardPins,
  removePinFromBoard,
  updateBoardPin,
} from "../../store/boardPins";

function EditPin({ pin, onCloseModal }) {
  const [title, setTitle] = useState(pin.title);
  const [selectedBoard, setSelectedBoard] = useState();
  const [description, setDescription] = useState(pin.description);
  const history = useHistory();
  let err = false;
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const userBoards = useSelector(
    (state) => state.users[sessionUser.id].boardIds
  );
  const boardpins = useSelector((state) => state.boardpins);
  //Finding a board Id associated with pin
  const foundBoardId = Object.entries(boardpins).find(([boardId, pinIds]) =>
    pinIds.includes(pin.id)
  );
  const [oldBoardId, pinIds] = foundBoardId; // PinId is in boardId

  useEffect(
    () => {
      dispatch(fetchAllBoardPins());
      dispatch(fetchBoards(sessionUser));
    },
    [removePinFromBoard],
    dispatch
  );

  const handleEdit = (pin) => {
    dispatch(pinActions.updatePin({ ...pin, title, description }));

    if (oldBoardId !== selectedBoard) {
      dispatch(
        updateBoardPin(oldBoardId, pin.id, {
          board_id: selectedBoard,
          pin_id: pin.id,
        })
      );
    }

    onCloseModal();
  };

  const handleCancel = () => {
    onCloseModal();
  };

  const handleDelete = (id) => {
    dispatch(pinActions.deletePin(id));
  };

  return (
    <div>
      <div className="my-div-edit">
        <label className="div-ed"> Edit this Pin</label>
        <div className="edit-pin">
          <div className="inf-pin">
            <div className="board-div">
              <label className="label-style"> Board</label>
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                className="sel-board"
              >
                <option key={oldBoardId} value={oldBoardId}>
                  {boards[oldBoardId]?.title}
                </option>
                {userBoards.map((boardId) => {
                  const board = boards[boardId];
                  return (
                    oldBoardId != boardId && (
                      <option key={boardId} value={boardId}>
                        {board?.title}
                      </option>
                    )
                  );
                })}
              </select>
            </div>
            {/* {sessionUser.id == pin.userId && (
            
            <>
              <div className="title-div">
                <label className="label-style">
                  Title </label>
                  <input
                    className="input-title"
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
              </div>

              <div className="separator-div" style={{borderBottom:'1px solid lightgray', margin:"15px"}}></div>
              <div className="description-div">
                <label className="label-style">
                  {" "}
                  Description </label>
                  <textarea name="input-description" className="input-description" cols="30" rows="30" 
                  onChange={(e) => setDescription(e.target.value)} value={description}  placeholder="Tell us about this pin">
                  </textarea>
               
              </div>
            </>
          )} */}
            <div className="title-div">
              <label className="label-style">Title</label>
              <input
                className="input-title"
                type="text"
                value={
                  sessionUser.id !== pin.userId
                    ? "You can not edit the title of a saved pin"
                    : title
                }
                onChange={(e) => setTitle(e.target.value)}
                disabled={sessionUser.id !== pin.userId}
              />
            </div>

            <div
              className="separator-div"
              style={{ borderBottom: "1px solid lightgray", margin: "15px" }}
            ></div>

            <div className="description-div">
              <label className="label-style">Description</label>
              <textarea
                name="input-description"
                className="input-description"
                style={{letterSpacing:"-1.5px"}}
                cols="30"
                rows="30"
                onChange={(e) => setDescription(e.target.value)}
                value={
                  sessionUser.id !== pin.userId
                    ? "You can not edit the description of a saved pin"
                    : description
                }
                disabled={sessionUser.id !== pin.userId}
              ></textarea>
            </div>
          </div>
          <div className="image-pin">
            <img
              src={pin.imgUrl}
              className="user-pins"
              alt="Pin"
              style={{ width: "70%", height: "85%" }}
            />
          </div>
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
