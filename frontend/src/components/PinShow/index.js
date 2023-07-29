import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../store/pin";
import ShowPinItem from "../ShowPinItem";
import Modal from "../context/Modal";
import EditPin from "../EditPin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function PinShow({ user }) {
  const buttonContainerRef = useRef();
  const dispatch = useDispatch();
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const  currentUser = useSelector(state=>state.session.user)
  console.log(currentUser.id);
  console.log(user.id);
  const pins = useSelector((state) => {
    return user.pinIds.map((id) => {
      return state.pin[id];
    });
  });

  useEffect(() => {
    dispatch(pinActions.fetchPins(user.id));
  }, []);
  // if (!pins[0]) return null;

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
  };

  const handleEditClick = (pin) => {
    setSelectedPin(pin);
    setEditModal(true);
  };

  return (
    <div className="div-pins">
      {pins.map((pin) => {
        if (!pin) return null;
        return (
          <div
            key={pin.id}
            onClick={handleImageClick(pin)}
            className="clickable-pin"
          >
            <img src={pin.imgUrl} className="user-pins" alt="Pin" />
            <div className="button-container" ref={buttonContainerRef}>
              {currentUser.id === user.id && (
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(pin)}
                >
                  <i className="fa-solid fa-pen-to-square fa-beat-fade"></i>
                </button>
              )}
              {currentUser.id === user.id && (
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
          <EditPin pin={selectedPin} onCloseModal={() => setEditModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default PinShow;
