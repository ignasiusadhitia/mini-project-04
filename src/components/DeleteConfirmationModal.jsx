import React from "react";
import Modal from "./Modal";

const DeleteConfirmationModal = ({ toggleModal, onConfirm }) => {
  return (
    <Modal title="Confirm Deletion" toggleModal={toggleModal}>
      <p className="text-center">
        Are you sure you want to delete this student?
      </p>
      <div className="d-flex justify-content-center">
        <button onClick={onConfirm} className="btn btn-danger me-3">
          Delete
        </button>
        <button onClick={toggleModal} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
