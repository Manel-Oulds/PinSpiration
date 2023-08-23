import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as pinActions from "../../store/pin";
import Modal from "../context/Modal";
import ShowPinItem from "../ShowPinItem";
import { addBoardPin } from "../../store/boardPins";

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

  
  const userBoardIds = useSelector((state) => state.session.user.boardIds);
  const allPinId = userBoardIds.find(
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
      await dispatch(pinActions.fetchAllPins());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleSavePin = (pin) => {
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
          <div
            key={pin.id}
            className={getRandomSize()}
            onClick={() => handleClick(pin)}
          >
            <button
              className="save-pin"
              style={{ background: "red" }}
              onClick={() => handleSavePin(pin)}
              disabled={isSaved}
            >
              {isSaved ? "Saved" : "Save"}
            </button>
            <img src={pin.imgUrl} alt={pin.title}></img>
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
