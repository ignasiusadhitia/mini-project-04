import React from "react";
import Searchbar from "./Searchbar";

const StudentTable = ({
  onGetStudentDetails,
  onDeleteStudent,
  toggleUpdateStudentModal,
  students,
  onInputChange,
  onAddStudent,
  onSearch,
  isloading,
}) => {
  return (
    <div className="table-responsive">
      <Searchbar
        onInputChange={onInputChange}
        onAddStudent={onAddStudent}
        onSearch={onSearch}
      />
      {isloading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-hover table-bordered">
          <thead>
            {students.length > 0 ? (
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">NIM</th>
                <th scope="col">Actions</th>
              </tr>
            ) : (
              <tr></tr>
            )}
          </thead>

          {students.length > 0 ? (
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.name}</td>
                  <td>{student.nim}</td>
                  <td>
                    {/* Delete Button */}
                    <button
                      className="btn btn-outline-danger btn-sm float-end"
                      onClick={() => onDeleteStudent(student.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                    {/* Edit Button */}
                    <button
                      className="btn btn-outline-warning btn-sm mx-2 float-end"
                      onClick={() => toggleUpdateStudentModal(student.id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    {/* Detail Button */}
                    <button
                      className="btn btn-outline-primary btn-sm float-end"
                      onClick={() => onGetStudentDetails(student.id)}
                    >
                      <i className="bi bi-info-circle"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  No data available
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default StudentTable;
