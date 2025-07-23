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

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  projects: [],
  tasks: [],
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // AUTH
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };

    // PROJECTS
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        error: null,
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        error: null,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
        error: null,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((p) => p._id !== action.payload),
        error: null,
      };

    // TASKS
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload,
        error: null,
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: null,
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
        error: null,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t._id !== action.payload),
        error: null,
      };

    // ERROR
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

