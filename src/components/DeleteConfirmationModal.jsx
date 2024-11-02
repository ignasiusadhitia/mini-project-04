import React from "react";
import Modal from "./Modal";

const DeleteConfirmationModal = ({ toggleModal, onConfirm }) => {
  return (
    <Modal title="Confirm Deletion" toggleModal={toggleModal}>
      <p>Are you sure you want to delete this student?</p>
      <button onClick={onConfirm} className="btn btn-danger">
        Delete
      </button>
      <button onClick={toggleModal} className="btn btn-secondary">
        Cancel
      </button>
    </Modal>
  );
};

export default DeleteConfirmationModal;
