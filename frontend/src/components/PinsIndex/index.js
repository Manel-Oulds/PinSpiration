import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as pinActions from "../../store/pin";
import Modal from "../context/Modal";
import ShowPinItem from "../ShowPinItem";
import { addBoardPin, fetchAllBoardPins } from "../../store/boardPins";
import { fetchAllBoards, fetchBoards } from "../../store/board";
import { fetchUser } from "../../store/user";
import SaveDropdown from "./save-dropdown";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const getRandomSize = () => {
  const sizes = ["small", "medium", "large"];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
};

export default function PinsIndex() {
  const history = useHistory();
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const pins = useSelector((state) => state.pin);
  const allBoards = useSelector((state) => state.boards);
  const [selectedBoards, setSelectedBoards] = useState({});
  const currentUser = useSelector((state) => state.session.user);
  const boards = useSelector((state) => state.boards);
  const boardPins = useSelector((state) => state.boardpins);

  const userBoards = useSelector(
    (state) => state.users[currentUser.id]?.boardIds
  );
  const allPinId = userBoards?.find(
    (boardId) => allBoards[boardId]?.title === "All Pins"
  );

  const localStorageKey = "imageSize";
  const initialImageSize =
    localStorage.getItem(localStorageKey) || getRandomSize();

  const [imageSize, setImageSize] = useState(initialImageSize);

  useEffect(() => {
    // Save the random size to local storage on initial mount
    if (!localStorage.getItem(localStorageKey)) {
      localStorage.setItem(localStorageKey, imageSize);
    }
  }, [imageSize]);

  const handleClick = (pin) => {
    setSelectedPin(pin);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser(currentUser.id));
      await dispatch(pinActions.fetchAllPins());
      await dispatch(fetchBoards(currentUser));
      await dispatch(fetchBoards(currentUser.id));
      await dispatch(fetchAllBoardPins());

      await dispatch(fetchAllBoards());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleSavePin = (pin, selectedBoardId) => {
    if (!selectedBoardId) {
      selectedBoardId = allPinId;
    }

    dispatch(
      addBoardPin({
        board_pin: {
          board_id: selectedBoardId,
          pin_id: pin.id,
        },
      })
    );
    setIsSaved(true);
    history.push(`Users/${currentUser.id}/boards/${selectedBoardId}`);
  };

  return (
    <div className="container">
      {loading ? (
        <div
          className="loading"
          style={{
            backgroundColor: "white",
            marginTop: "600px",
            marginLeft: "600px",
          }}
        >
          <i
            className="fa-solid fa-spinner fa-spin"
            style={{ color: "#ff0000" }}
          ></i>
        </div>
      ) : (
        Object.values(pins).map((pin) => {
          const isPinSaved = userBoards.some((boardId) =>
            boardPins[boardId]?.includes(pin.id)
          );
          const board = userBoards.map((boardId) =>
            boardPins[boardId]?.includes(pin.id) ? boards[boardId].title : null
          );
          const idboard = userBoards
            .map((boardId) =>
              boardPins[boardId]?.includes(pin.id) ? boardId : null
            )
            .filter(Boolean);

          return (
            <div key={pin.id} className={`pin-container ${getRandomSize()}`}>
              <div className="pin-actions" onClick={() => handleClick(pin)}>
                {isPinSaved ? (
                  <div
                    className="custom-select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="select-board">
                      <label>
                        <NavLink
                          to={`/users/${currentUser.id}/boards/${idboard}`}
                        >
                          <span style={{ textDecoration: "none" }}>
                            {board}
                          </span>
                        </NavLink>{" "}
                      </label>
                    </div>

                    <button
                      className="save-pin"
                      style={{ background: "red" }}
                      disabled
                    >
                      Saved
                    </button>
                  </div>
                ) : (
                  <div
                    className="custom-select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      id="dropdown"
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
                      {userBoards.map((boardId) => {
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
                    <button
                      className="save-pin"
                      style={{ background: "red" }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click from propagating
                        handleSavePin(pin, selectedBoards[pin.id]);
                      }}
                      disabled={isSaved}
                    >
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </div>
                )}
              </div>

              <img
                onClick={() => handleClick(pin)}
                src={pin.imgUrl}
                alt={pin.title}
              />
            </div>
          );
        })
      )}

      {showModal && selectedPin && (
        <Modal onClose={handleModalClose}>
          <ShowPinItem pin={selectedPin} />
        </Modal>
      )}
    </div>
  );
}
