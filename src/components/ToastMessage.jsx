import React from "react";

const ToastMessage = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show position-absolute top-0 start-50 translate-middle-x mt-3`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default ToastMessage;
