import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllBoardPins, fetchBoardPins } from "../../store/boardPins";
import { fetchPin } from "../../store/pin";
import ShowPinItem from "../ShowPinItem";
import EditPin from "../EditPin";
import Modal from "../context/Modal";
import * as pinActions from "../../store/pin";
import Navigation from "../Navigation";
import { deleteBoard, fetchAllBoards } from "../../store/board";
import { fetchUser } from "../../store/user";
import "./BoardShowIndex.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function BoardShowIndex() {
  const buttonContainerRef = useRef();
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.session.user.id);
  const { userId } = useParams();
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const board = useSelector((state) => state.boards[boardId]);
  const boardPins = useSelector((state) => state.boardpins[boardId]);
  const pins = useSelector((state) => state.pin);
  const history = useHistory();

  useEffect(() => {
    const fetchBoardData = async () => {
      setLoading(true);
      await dispatch(fetchBoardPins(boardId)); // No board Id when removing the last pin
      await dispatch(fetchAllBoards());
      await dispatch(fetchAllBoardPins());
      await dispatch(pinActions.fetchAllPins());
      await dispatch(fetchUser(userId));
      setLoading(false);
    };
    // const fetchPins = async () => {
    //   if (boardPins) {
    //     boardPins.forEach((pinId) => {
    //       const pin = pins[pinId];
    //       if (pin) {
    //         dispatch(fetchPin(pinId));
    //       }
    //     });
    //   }
    // };

    // async function fetchData() {
    fetchBoardData();
    // await fetchPins();
    // }
    // fetchData();
  }, [boardId, dispatch]);

  function getRandomSize() {
    const sizes = ["small", "medium", "large"];
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
  }

  const handleImageClick = (pin) => (event) => {
    setSelectedPin(pin);
    if (
      buttonContainerRef.current &&
      !buttonContainerRef.current.contains(event.target)
    ) {
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleDelete = (id) => {
    dispatch(pinActions.deletePin(id));
    history.push(`/users/${currentUser}`);
  };

  const handleEditClick = (pin) => {
    setSelectedPin(pin);
    setEditModal(true);
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(boardId)).then(history.push(`/users/${currentUser}`));
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Navigation />
        <h1
          className="title-selected-board"
          style={{
            fontSize: "50px",
            margin: "5%",
            marginLeft: "45%",
          }}
        >
          {board.title}
        </h1>
        {boardPins ? boardPins.length : 0} Pin(s){" "}
        <div className="deleteboard" onClick={handleDeleteBoard}>
          {userId == currentUser && board.title !== "All Pins" && (
            <i
              className="fa-solid fa-trash fa-fade"
              style={{ fontSize: "30px", marginLeft: "95%" }}
            ></i>
          )}
        </div>
        <div className="div-pin">
          {boardPins?.map((pinId) => {
            const pin = pins[pinId];
            if (!pin) {
              return null;
            }

            const randomSize = getRandomSize();
            const pinClassName = `${randomSize}`;

            return (
              <div
                key={pin.id}
                onClick={handleImageClick(pin)}
                className="clickable-pin"
              >
                <img
                  src={pin.imgUrl}
                  className={`user-pins ${pinClassName}`}
                  alt="Pin"
                />
                <div className="button-container" ref={buttonContainerRef}>
                  {currentUser == userId && (
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(pin)}
                    >
                      <i className="fa-solid fa-pen-to-square fa-beat-fade"></i>
                    </button>
                  )}
                  {currentUser == userId && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(pin.id)}
                    >
                      <i className="fa-solid fa-trash fa-beat-fade"></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {showModal && selectedPin && (
            <Modal onClose={handleModalClose}>
              <ShowPinItem pin={selectedPin} />
            </Modal>
          )}

          {editModal && selectedPin && (
            <Modal onClose={() => setEditModal(false)}>
              <EditPin
                pin={selectedPin}
                onCloseModal={() => setEditModal(false)}
              />
            </Modal>
          )}
        </div>
      </>
    );
  }
}

export default BoardShowIndex;
