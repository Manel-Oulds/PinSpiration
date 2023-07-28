import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../store/pin";
import UpdateFormPage from "../UpdateProfile/UpdateProfile";
import LoginFormPage from "../LoginFormPage";
import ShowPinItem from "../ShowPinItem";
import Modal from "../context/Modal";

function PinShow({ user }) {
  const buttonContainerRef = useRef();
  const dispatch = useDispatch();
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pins = useSelector((state) => {
    return user.pinIds.map((id) => {
      return state.pin[id];
    });
  });

  useEffect(() => {
    dispatch(pinActions.fetchPins(user.id));
  }, []);
  // if (!pins[0]) return null;

  const handleImageClick = (event,pin) => {
    if (buttonContainerRef.current && !buttonContainerRef.current.contains(event.target)){
        setSelectedPin(pin);
        setShowModal(true);
    }
  
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleDelete = (id) => {
    dispatch(pinActions.deletePin(id));
  };
  

  return (
    <div className="div-pins">
      {pins.map((pin) => {
        if (!pin) return null; // Check if pin is null or undefined
        return (
          <div
            key={pin.id}
            onClick={() => handleImageClick(pin)}
            className="clickable-pin"
          >
            <img src={pin.imgUrl} className="user-pins" alt="Pin" />
            <div className="button-container" ref={buttonContainerRef} >
              <button className="edit-btn">
                <i className="fa-solid fa-pen-to-square fa-beat-fade"></i>
              </button>
              <button className="delete-btn" onClick={() => handleDelete(pin.id)}>
                <i className="fa-solid fa-trash fa-beat-fade"></i>
              </button>
            </div>
          </div>
        );
      })}

      {showModal && selectedPin && (
        <Modal onClose={handleModalClose}>
          <ShowPinItem pin={selectedPin} />
        </Modal>
      )}
    </div>
  );
}

export default PinShow;
