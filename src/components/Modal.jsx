import React from "react";

const Modal = ({ title, children, toggleModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content-cstm">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={toggleModal}
          ></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
