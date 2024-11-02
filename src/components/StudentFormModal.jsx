import React from "react";
import { getFieldErrorMessage } from "../utils/getFieldErrorMessage";
import Modal from "./Modal";
import { getAgeLimit } from "../utils/getAgeLimit";
import { classOptions } from "../data/classOptions";

const StudentFormModal = ({
  isEditing,
  toggleModal,
  onSubmit,
  student,
  errors,
  onInputChange,
}) => {
  return (
    <Modal
      title={`Form ${isEditing ? "Edit" : "New"} Student`}
      toggleModal={toggleModal}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${
              getFieldErrorMessage(errors, "name") ? "is-invalid" : ""
            }`}
            id="name"
            name="name"
            value={student.name || ""}
            onChange={onInputChange}
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "name")}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="class" className="form-label">
            Class
          </label>
          <select
            className={`form-select ${
              getFieldErrorMessage(errors, "class") ? "is-invalid" : ""
            }`}
            id="class"
            name="class"
            value={student.class || ""}
            onChange={onInputChange}
          >
            <option value="">Choose Class</option>
            {classOptions.map((classItem, index) => (
              <option key={index} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "class") || "Class must be a string"}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="text"
            className={`form-control ${
              getFieldErrorMessage(errors, "year") ? "is-invalid" : ""
            }`}
            id="year"
            name="year"
            value={student.year || ""}
            onChange={onInputChange}
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "year")}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="nim" className="form-label">
            NIM
          </label>
          <input
            type="text"
            className={`form-control ${
              getFieldErrorMessage(errors, "nim") ? "is-invalid" : ""
            }`}
            id="nim"
            name="nim"
            value={student.nim || ""}
            disabled
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "nim")}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="guardian_name" className="form-label">
            Guardian Name
          </label>
          <input
            type="text"
            className={`form-control ${
              getFieldErrorMessage(errors, "guardian_name") ? "is-invalid" : ""
            }`}
            id="guardian_name"
            name="guardian_name"
            value={student.guardian_name || ""}
            onChange={onInputChange}
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "guardian_name")}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Birthdate
          </label>
          <input
            type="date"
            className={`form-control ${
              getFieldErrorMessage(errors, "birthDate") ? "is-invalid" : ""
            }`}
            id="birthDate"
            name="birthDate"
            value={student.birthDate || ""}
            max={getAgeLimit()}
            onChange={onInputChange}
          />
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "birthDate")}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            type="text"
            className={`form-control ${
              getFieldErrorMessage(errors, "address") ? "is-invalid" : ""
            }`}
            id="address"
            name="address"
            value={student.address || ""}
            onChange={onInputChange}
          ></textarea>
          <div className="invalid-feedback">
            {getFieldErrorMessage(errors, "address")}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className={`form-check-input ${
                  getFieldErrorMessage(errors, "gender") ? "is-invalid" : ""
                }`}
                type="radio"
                name="gender"
                value="male"
                checked={student.gender === "male"}
                id="male"
                onChange={onInputChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className={`form-check-input ${
                  getFieldErrorMessage(errors, "gender") ? "is-invalid" : ""
                }`}
                type="radio"
                name="gender"
                value="female"
                checked={student.gender === "female"}
                id="female"
                onChange={onInputChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="invalid-feedback">
              {getFieldErrorMessage(errors, "gender")}
            </div>
          </div>
        </div>

        <button type="button" onClick={onSubmit} className="btn btn-primary">
          {isEditing ? "Update Student" : "Add New Student"}
        </button>
      </form>
    </Modal>
  );
};

export default StudentFormModal;
