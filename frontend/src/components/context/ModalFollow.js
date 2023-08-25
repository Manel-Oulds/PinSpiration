// frontend/src/context/ModalFollow.js

import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./ModalFollow.css"; // Define your CSS styles for ModalFollow

const ModalFollowContext = React.createContext();

export function ModalFollowProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalFollowContext.Provider value={value}>
        {children}
      </ModalFollowContext.Provider>
      <div id="modal-follow-container" ref={modalRef} />
    </>
  );
}

export default function ModalFollow({ onClose, children }) {
  const modalNode = useContext(ModalFollowContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal-follow">
      <div id="modal-follow-background" onClick={onClose} />
      <div id="modal-follow-content">{children}</div>
    </div>,
    modalNode
  );
}
