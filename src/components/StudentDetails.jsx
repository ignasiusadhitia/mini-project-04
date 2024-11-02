import React from "react";
import Modal from "./Modal";

const StudentDetails = ({ toggleModalDetails, student }) => {
  return (
    <Modal title="Student Detail" toggleModal={toggleModalDetails}>
      <p>
        <strong>Name: </strong> {student?.name}
      </p>
      <p>
        <strong>NIM: </strong> {student?.nim}
      </p>
      <p>
        <strong>Address: </strong> {student?.address}
      </p>
      <p>
        <strong>Guardian Name: </strong> {student?.guardian_name}
      </p>
    </Modal>
  );
};

export default StudentDetails;
