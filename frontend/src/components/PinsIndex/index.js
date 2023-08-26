import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as pinActions from "../../store/pin";
import Modal from "../context/Modal";
import ShowPinItem from "../ShowPinItem";
import { addBoardPin } from "../../store/boardPins";
import { fetchAllBoards, fetchBoards } from "../../store/board";
import { fetchUser } from "../../store/user";

const getRandomSize = () => {
  const sizes = ["small", "medium", "large"];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
};

export default function PinsIndex() {
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const pins = useSelector((state) => state.pin);
  const allBoards = useSelector((state) => state.boards);
  const [selectedBoard, setSelectedBoard] = useState("");
  const currentUser = useSelector((state) => state.session.user);
  const boards = useSelector((state) => state.boards);

  const userBoards = useSelector(
    (state) => state.users[currentUser.id].boardIds
  );
  const allPinsBoardId = userBoards.find(
    (boardId) => boards[boardId]?.title === "All Pins"
  );

  const allPinId = userBoards.find(
    (boardId) => allBoards[boardId]?.title === "All Pins"
  );

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

      await dispatch(fetchAllBoards);
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  // const handleSavePin = (pin) => {
  //   dispatch(
  //     addBoardPin({
  //       board_pin: {
  //         board_id: allPinId,
  //         pin_id: pin.id,
  //       },
  //     })
  //   );
  //   setIsSaved(true);
  // };
  const handleSavePin = (pin, selectedBoardId) => {
    if (!selectedBoardId) {
      return; // Prevent saving if no board is selected
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
        Object.values(pins).map((pin) => (
          <div key={pin.id} className={getRandomSize()}>
            <div className="pin-actions">
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                className="select-board"
              >
                <option value={allPinId}>All Pins</option>
                {userBoards.map((boardId) => {
                  const board = allBoards[boardId];
                  if (board && boardId !== allPinId) {
                    return (
                      <option key={boardId} value={boardId}>
                        {board.title}
                      </option>
                    );
                  }
                  return null; // Return null if the condition is not met to avoid React warnings
                })}
              </select>
              <button
                className="save-pin"
                style={{ background: "red" }}
                onClick={() => handleSavePin(pin, selectedBoard)}
                disabled={isSaved}
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>
            <img src={pin.imgUrl} alt={pin.title} />
          </div>
        ))
      )}

      {showModal && selectedPin && (
        <Modal onClose={handleModalClose}>
          <ShowPinItem pin={selectedPin} />
        </Modal>
      )}
    </div>
  );
}
