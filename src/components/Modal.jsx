import React from 'react';
import '../styles/modal.scss';

function Modal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Confirmation</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="confirm-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
