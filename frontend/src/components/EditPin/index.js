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
  const [selectedBoard, setSelectedBoard] = useState();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const userBoards = useSelector(
    (state) => state.users[sessionUser.id].boardIds
  );
  const boardpins = useSelector((state) => state.boardpins);
  // Finding a board Id associated with pin
  const foundBoardId = Object.entries(boardpins).find(([boardId, pinIds]) =>
    pinIds.includes(pin.id)
  );
  const [oldBoardId] = foundBoardId;

  useEffect(() => {
    dispatch(fetchAllBoardPins());
    dispatch(fetchBoards(sessionUser));
  }, [removePinFromBoard, dispatch]);

  const handleEdit = (pin) => {
    const updatedPin = {
      ...pin,
      boardId: selectedBoard,
    };

    dispatch(pinActions.updatePin(updatedPin));
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
          {sessionUser.id === pin.userId && (
            <>
              <div className="title-div">
                <label className="label-style">
                  Title
                  <input
                    className="input-title"
                    type="text"
                    value={pin.title}
                    placeholder="Add your title"
                    onChange={(e) =>
                      dispatch(
                        pinActions.updatePin({ ...pin, title: e.target.value })
                      )
                    }
                  />
                </label>
              </div>
              <div className="description-div">
                <label className="label-style">
                  {" "}
                  Description
                  <input
                    className="input-description"
                    type="text"
                    placeholder="Tell us about this pin"
                    value={pin.description}
                    onChange={(e) =>
                      dispatch(
                        pinActions.updatePin({
                          ...pin,
                          description: e.target.value,
                        })
                      )
                    }
                  />
                </label>
              </div>
            </>
          )}
        </div>
        <div className="image-pin">
          <img src={pin.imgUrl} className="user-pins" alt="Pin" />
        </div>
      </div>
      <div className="cancel-save-div">
        <button className="gray-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button className="red-btn" onClick={() => handleEdit(pin)}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditPin;
