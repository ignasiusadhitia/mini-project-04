import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = "RJS1-202410";

// Create an Axios instance with the base URL
const studentApi = axios.create({
  baseURL: API_URL,
});

// Add an interceptor to set the API key in the headers
studentApi.interceptors.request.use((config) => {
  config.headers["api-key"] = API_KEY;
  return config;
});

// Function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    const { status, statusText, data } = error.response;

    // Return error in general format
    return {
      status,
      message:
        data?.message || `Request failed with status ${status}: ${statusText}`,
      errors: data?.data || [], // Include errors if available
    };
  }

  return {
    status: 500,
    message: "Internal Server Error",
    errors: [],
  };
};

// Function to get all students
export const getAllStudents = async () => {
  try {
    const response = await studentApi.get("/students");
    return response.data;
  } catch (error) {
    throw handleApiError(error); //  Handle API errors
  }
};

// Function to get a single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await studentApi.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error); //  Handle API errors
  }
};

// Function to find students by name with query parameters
export const findStudentsByName = async (query) => {
  try {
    const response = await studentApi.get("/students", {
      params: { find: query },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error); //  Handle API errors
  }
};

// Function to create a new student
export const createStudent = async (studentData) => {
  try {
    const response = await studentApi.post("/students", studentData);
    return response.data;
  } catch (error) {
    throw handleApiError(error); //  Handle API errors
  }
};

// Function to update a student
export const updateStudent = async (id, updatedData) => {
  try {
    const response = await studentApi.put(`/students/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw handleApiError(error); //  Handle API errors
  }
};

// Function to delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await studentApi.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error); //  Handle API errors
  }
};
