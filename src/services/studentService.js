import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = "RJS1-202410";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

// General function to make API requests
const apiRequest = async (method, endpoint, data = null) => {
  try {
    const config = { method, url: endpoint, data };
    const response = await axiosInstance(config);
    return response.data; // return the response data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error during API request"
    );
  }
};

// Function to get all students
export const getAllStudents = async () => {
  return await apiRequest("get", "/students");
};

// Function to get a single student by ID
export const getStudentById = async (id) => {
  return await apiRequest("get", `/students/${id}`);
};

// Function to find students by name
export const findStudentsByName = async (query) => {
  return await apiRequest("get", `/students?find=${query}`);
};

// Function to create a new student
export const createStudent = async (studentData) => {
  return await apiRequest("post", "/students", studentData);
};

// Function to update a student
export const updateStudent = async (id, updatedData) => {
  return await apiRequest("put", `/students/${id}`, updatedData);
};

// Function to delete a student
export const deleteStudent = async (id) => {
  return await apiRequest("delete", `/students/${id}`);
};
