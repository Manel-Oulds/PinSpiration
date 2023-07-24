import React, { useState } from 'react';
import Modal from '../context/Modal';
import SignupFormPage from '../SignupFormPage';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="signupButton">Sign up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;