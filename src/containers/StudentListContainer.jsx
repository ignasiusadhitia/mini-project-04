import React, { Component } from "react";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import StudentDetailsModal from "../components/StudentDetails";
import StudentFormModal from "../components/StudentFormModal";
import StudentTable from "../components/StudentTable";
import ToastMessage from "../components/ToastMessage";
import {
  createStudent,
  deleteStudent,
  findStudentsByName,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../services/studentService";
import { generateNIM } from "../utils/generateNIM";

class StudentListContainer extends Component {
  state = {
    students: [], // Save the list of students
    student: {}, // Save the student object
    isEditing: false,
    query: "",
    loading: false,
    errors: [],
    isStudentFormModalOpen: false,
    isStudentDetailsModalOpen: false,
    isDeleteConfirmationModalOpen: false,
    studentIdToDelete: null,
    showAlert: false,
    alertMessage: "",
    alertType: "",
  };

  componentDidMount() {
    this.fetchStudents();
  }

  handleAddStudent = async () => {
    const { student } = this.state;
    try {
      const response = await createStudent(student);
      this.setState((prevState) => ({
        students: [...prevState.students, response.data], // Update local state
      }));
      this.onSuccess(response.message);
      this.clearForm();
      this.toggleStudentFormModal();
      this.fetchStudents();
    } catch (error) {
      this.handleApiError(error);
    }

    this.closeToast();
  };

  fetchStudents = async () => {
    try {
      this.setState({ loading: true });
      const response = await getAllStudents();
      this.setState({ students: response.data, loading: false });
    } catch (error) {
      this.handleApiError(error);
    }
  };

  handleGetStudentById = async (studentId) => {
    this.toggleStudentDetailsModal();
    try {
      const response = await getStudentById(studentId);
      this.setState({ student: response.data });
    } catch (error) {
      this.handleApiError(error);
    }
  };

  handleFindStudentsByName = async () => {
    try {
      const response = await findStudentsByName(this.state.query);
      this.setState({ students: response.data });
      console.log(this.state.students);
    } catch (error) {
      this.handleApiError(error);
    }
  };

  handleUpdateStudent = async () => {
    const { student } = this.state;
    const studentId = student.id;

    try {
      const updatedStudent = await updateStudent(studentId, student);
      this.setState((prevState) => ({
        students: prevState.students.map((student) =>
          student.id === studentId ? updatedStudent : student
        ), // Update local state
      }));
      this.onSuccess(updatedStudent.message);
      this.fetchStudents();
    } catch (error) {
      this.handleApiError(error);
    }

    this.toggleStudentFormModal();
    this.closeToast();
  };

  handleDeleteStudent = async () => {
    const { studentIdToDelete } = this.state;
    try {
      const response = await deleteStudent(studentIdToDelete);
      this.setState((prevState) => ({
        students: prevState.students.filter(
          (student) => student.id !== studentIdToDelete
        ), // Update local state
      }));
      this.onSuccess(response.message);
      this.fetchStudents();
    } catch (error) {
      this.handleApiError(error);
    }

    this.setState({
      isDeleteConfirmationModalOpen: false,
    });
    this.closeToast();
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      student: {
        ...prevState.student,
        [name]: value,
      },
    }));
  };

  handleSearchInputChange = (event) => {
    const { value } = event.target;
    this.setState({ query: value });
  };

  handleSearchReset = () => {
    this.setState({ query: "" });
    this.fetchStudents();
  };

  toggleStudentFormModal = () => {
    const newNIM = generateNIM();

    this.setState((prevState) => ({
      isStudentFormModalOpen: !prevState.isStudentFormModalOpen,
      isEditing: false,
      student: prevState.isStudentFormModalOpen ? {} : { nim: newNIM },
    }));
    this.clearForm();
  };

  toggleUpdateStudentModal = (studentId) => {
    this.toggleStudentFormModal();

    this.setState({
      student: this.state.students.find((student) => student.id === studentId),
      isEditing: true,
    });
  };

  toggleStudentDetailsModal = () => {
    this.setState((prevState) => ({
      isStudentDetailsModalOpen: !prevState.isStudentDetailsModalOpen,
    }));
  };

  toggleDeleteConfirmationModal = (studentId) => {
    this.setState((prevState) => ({
      isDeleteConfirmationModalOpen: !prevState.isDeleteConfirmationModalOpen,
      studentIdToDelete: studentId,
    }));
  };

  clearForm = () => {
    this.setState({
      student: { nim: generateNIM() },
      errors: [],
    });
  };

  closeToast() {
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  }

  onSuccess = (message) => {
    this.setState({
      showAlert: true,
      alertMessage: message,
      alertType: "success",
    });
  };

  onError = (message) => {
    this.setState({
      showAlert: true,
      alertMessage: message,
      alertType: "danger",
    });
  };

  handleApiError = (error) => {
    if (error.errors && error.errors.length > 0) {
      // Handle API errors with specific fields
      const formattedErrors = error.errors.map(({ path, msg }) => ({
        field: path,
        message: msg,
      }));
      this.setState({ errors: formattedErrors });
    } else {
      // Handle general API errors
      this.setState({
        errors: [{ field: "API", message: error.message }],
      });
      this.onError(error.message);
    }

    this.closeToast();
  };

  render() {
    const {
      students,
      student,
      loading,
      isEditing,
      isStudentFormModalOpen,
      isDeleteConfirmationModalOpen,
      query,
    } = this.state;
    return (
      <div>
        <ToastMessage
          message={this.state.showAlert ? this.state.alertMessage : ""}
          type={this.state.alertType}
          onClose={() => this.setState({ showAlert: false })}
        />

        {isStudentFormModalOpen && (
          <StudentFormModal
            student={student}
            toggleModal={this.toggleStudentFormModal}
            errors={this.state.errors}
            isEditing={isEditing}
            onInputChange={this.handleInputChange}
            onSubmit={
              isEditing ? this.handleUpdateStudent : this.handleAddStudent
            }
          />
        )}

        {this.state.isStudentDetailsModalOpen && (
          <StudentDetailsModal
            student={student}
            toggleStudentDetailsModal={this.toggleStudentDetailsModal}
          />
        )}

        {isDeleteConfirmationModalOpen && (
          <DeleteConfirmationModal
            toggleModal={this.toggleDeleteConfirmationModal}
            onConfirm={this.handleDeleteStudent}
          />
        )}

        <StudentTable
          students={students}
          toggleUpdateStudentModal={this.toggleUpdateStudentModal}
          onDeleteStudent={this.toggleDeleteConfirmationModal}
          onGetStudentDetails={this.handleGetStudentById}
          onInputChange={this.handleSearchInputChange}
          onSearch={this.handleFindStudentsByName}
          onReset={this.handleSearchReset}
          onAddStudent={this.toggleStudentFormModal}
          isloading={loading}
          query={query}
        />
      </div>
    );
  }
}

export default StudentListContainer;
