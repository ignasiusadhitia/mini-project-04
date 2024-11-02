import React from "react";
import Modal from "./Modal";

const StudentDetailsModal = ({ toggleStudentDetailsModal, student }) => {
  return (
    <Modal title="Student Details" toggleModal={toggleStudentDetailsModal}>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Name</th>
            <td>{student?.name}</td>
          </tr>

          <tr>
            <th scope="row">Class</th>
            <td>{student?.class}</td>
          </tr>

          <tr>
            <th scope="row">Year</th>
            <td>{student?.year}</td>
          </tr>

          <tr>
            <th scope="row">NIM</th>
            <td>{student?.nim}</td>
          </tr>

          <tr>
            <th scope="row">Guardian Name</th>
            <td>{student?.guardian_name}</td>
          </tr>

          <tr>
            <th scope="row">Birthdate</th>
            <td>{student?.birthDate}</td>
          </tr>

          <tr>
            <th scope="row">Address</th>
            <td>{student?.address}</td>
          </tr>

          <tr>
            <th scope="row">Gender</th>
            <td>{student?.gender}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default StudentDetailsModal;
