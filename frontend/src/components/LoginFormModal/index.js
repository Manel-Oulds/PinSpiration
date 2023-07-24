import React, { useState } from 'react';
import Modal from '../context/Modal';
import LoginFormPage from '../LoginFormPage';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="loginButton">Log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;