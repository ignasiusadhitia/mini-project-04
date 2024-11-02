import React, { Component } from "react";
import StudentDetails from "../components/StudentDetails";
import StudentFormModal from "../components/StudentFormModal";
import StudentTable from "../components/StudentTable";
import {
  createStudent,
  deleteStudent,
  findStudentsByName,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../services/studentService";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

class StudentListContainer extends Component {
  state = {
    students: [], // Save the list of students
    student: {}, // Save the student object
    isEditing: false,
    query: "",
    loading: false,
    errors: [],
    isStudentFormModalOpen: false,
    isModalDetailsOpen: false,
    isDeleteConfirmationModalOpen: false,
    studentIdToDelete: null,
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
      this.clearForm();
      this.toggleStudentFormModal();
      this.fetchStudents();
    } catch (error) {
      this.handleApiError(error);
    }
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
    this.toggleModalDetails();
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

      this.fetchStudents();
    } catch (error) {
      this.handleApiError(error);
    }

    this.toggleStudentFormModal();
  };

  handleDeleteStudent = async () => {
    const { studentIdToDelete } = this.state;
    try {
      await deleteStudent(studentIdToDelete);
      this.setState((prevState) => ({
        students: prevState.students.filter(
          (student) => student.id !== studentIdToDelete
        ), // Update local state
      }));
      this.fetchStudents();
    } catch (error) {
      this.handleApiError(error);
    }

    this.setState({
      isDeleteConfirmationModalOpen: false,
    });
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

  toggleStudentFormModal = () => {
    this.setState((prevState) => ({
      isStudentFormModalOpen: !prevState.isStudentFormModalOpen,
      isEditing: false,
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

  toggleModalDetails = () => {
    this.setState((prevState) => ({
      isModalDetailsOpen: !prevState.isModalDetailsOpen,
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
      student: {},
      errors: [],
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
        errors: [{ field: "API", messsage: error.message }],
      });
    }
  };

  render() {
    const {
      students,
      student,
      loading,
      isEditing,
      isStudentFormModalOpen,
      isDeleteConfirmationModalOpen,
    } = this.state;
    return (
      <div>
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

        {this.state.isModalDetailsOpen && (
          <StudentDetails
            student={student}
            toggleModalDetails={this.toggleModalDetails}
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
          onAddStudent={this.toggleStudentFormModal}
          isloading={loading}
        />
      </div>
    );
  }
}

export default StudentListContainer;
