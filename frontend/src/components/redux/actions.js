import axios from 'axios';
import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  FETCH_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  FETCH_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_ERROR,
} from './type';

// API Base URL
const API = 'https://project-management-api-5d48.onrender.com/api';

// Utility to get token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

// ---------------------------
// AUTH ACTIONS
// ---------------------------

export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/auth/signup`, userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.response?.data?.message || 'Signup failed',
    });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/auth/login`, userData);
    localStorage.setItem('token', res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.response?.data?.message || 'Login failed',
    });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  return { type: LOGOUT };
};

// ---------------------------
// PROJECT ACTIONS
// ---------------------------

export const fetchProjects = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/projects`, {
      headers: getAuthHeader(),
    });
    dispatch({ type: FETCH_PROJECTS, payload: res.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: 'Failed to load projects' });
  }
};

export const createProject = (projectData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/projects`, projectData, {
      headers: getAuthHeader(),
    });
    dispatch({ type: CREATE_PROJECT, payload: res.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: 'Failed to create project' });
  }
};

export const updateProject = (id, projectData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API}/projects/${id}`, projectData, {
      headers: getAuthHeader(),
    });
    dispatch({ type: UPDATE_PROJECT, payload: res.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: 'Failed to update project' });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API}/projects/${id}`, {
      headers: getAuthHeader(),
    });
    dispatch({ type: DELETE_PROJECT, payload: id });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: 'Failed to delete project' });
  }
};

// ---------------------------
// TASK ACTIONS
// ---------------------------

export const fetchTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/tasks`, {
      headers: getAuthHeader(),
    });
    dispatch({ type: FETCH_TASKS, payload: res.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: 'Failed to load tasks' });
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/tasks`, taskData, {
      headers: getAuthHeader(),
    });
    dispatch({ type: CREATE_TASK, payload: res.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: 'Failed to create task' });
  }
};

export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API}/tasks/${id}`, taskData, {
      headers: getAuthHeader(),
    });
    dispatch({ type: UPDATE_TASK, payload: res.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: 'Failed to update task' });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API}/tasks/${id}`, {
      headers: getAuthHeader(),
    });
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: 'Failed to delete task' });
  }
};


