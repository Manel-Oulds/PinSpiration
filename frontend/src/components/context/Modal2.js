// frontend/src/context/Modal.js

import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal2.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div id="modal-container2" ref={modalRef} />
    </>
  );
}

export default function Modal2({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal2">
      <div id="modal-background2" onClick={onClose} />
      <div id="modal-content2">{children}</div>
    </div>,
    modalNode
  );
}
