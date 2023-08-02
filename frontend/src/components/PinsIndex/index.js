import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as pinActions from '../../store/pin';
import Modal from '../context/Modal';
import ShowPinItem from '../ShowPinItem';


const getRandomSize = () => {
  const sizes = ['small', 'medium', 'large'];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
};

export default function PinsIndex() {
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const pins = useSelector((state) => state.pin);

  const handleClick = (pin) =>{
    setSelectedPin(pin);
    setShowModal(true)
  }

  const handleModalClose =()=>{
    setShowModal(false)
  }

  useEffect(() => {
    dispatch(pinActions.fetchAllPins());
  }, [dispatch]);

  return (
    <div className="container">

      {Object.values(pins).map((pin) => (
        <div key={pin.id} className={getRandomSize()} onClick={() => handleClick(pin)}>
          <img src={pin.imgUrl} alt={pin.title}  ></img>
        </div>
      ))}
    

     {showModal && selectedPin && (
      <Modal onClose={handleModalClose}>
        <ShowPinItem pin={selectedPin} />
      </Modal>
    )}
    </div>
  );
}
