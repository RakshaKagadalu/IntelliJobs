import {
  SHOW_ALERT,
  HIDE_ALERT,
  USER_REGISTER_START,
  USER_REGISTER_SUCCESSFUL,
  USER_REGISTER_ERROR,
  USER_LOGIN_ERROR,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESSFUL,
  USER_SETUP_START,
  USER_SETUP_ERROR,
  USER_SETUP_SUCCESSFUL,
  SIDEBAR_TOGGLE,
  USER_LOGOUT,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESSFULL,
  USER_UPDATE_ERROR,
  HANDLE_CHANGE,
  VALUES_CLEAR,
  JOB_CREATE_BEGIN,
  JOB_CREATE_SUCCESS,
  JOB_CREATE_ERROR,
  JOBS_GET_BEGIN,
  JOBS_GET_SUCCESS,
  SET_JOB_EDIT,
  JOB_DELETE_BEGIN,
  JOB_EDIT_BEGIN,
  JOB_EDIT_SUCCESS,
  JOB_EDIT_ERROR,
  STATS_SHOW_BEGIN,
  STATS_SHOW_SUCCESS,
  SEARCH_CLEAR,
  PAGE_CHANGE,
  EVENT_ADD,
  JOBS_GET_ALL_BEGIN,
  JOBS_GET_ALL_SUCCESS,
} from "./actions";

import { State } from "./contextApp";
//to handle the action type Sent from dispatch
const reducer = (state, action) => {
  //if action type is equal to showalert then the alert mesage flat is set to true
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: "One or more fields are empty. provide all values!",
    };
  }
  //if action type is equal to showalert then the alert mesage flat is set to true
  if (action.type === HIDE_ALERT) {
    return {
      ...state,
      displayAlertMsg: false,
      alertType: "",
      alertMsg: "",
    };
  }

  //if action type matches return state and set isloading to true
  if (action.type === USER_REGISTER_START) {
    return { ...state, isLoading: true };
  }

  //action method to perform when user registeration in is success
  if (action.type === USER_REGISTER_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "Successfull user registration! Redirecting...",
    };
  }

  //action method to perform when user registeration in is not successfull
  if (action.type === USER_REGISTER_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }

  //action method to perform when user logs is in process
  if (action.type === USER_LOGIN_START) {
    return { ...state, isLoading: true };
  }

  //action method to perform when user logs in is successfull
  if (action.type === USER_LOGIN_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "Login successful! Please wait...",
    };
  }

  //action method to perform when user logs in is notsuccessfull
  if (action.type === USER_LOGIN_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }

  //action method to perform when user logs starts to update his profile
  if (action.type === USER_SETUP_START) {
    return { ...state, isLoading: true };
  }

  //action method to perform when user profile is set up successfully
  if (action.type === USER_SETUP_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: action.payload.alertMsg,
    };
  }

  //action method to perform when user profile is set up is not successfull
  if (action.type === USER_SETUP_ERROR) {
    return {
      ...State,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }

  if (action.type === SIDEBAR_TOGGLE) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  //action method to perform when user user logs out
  if (action.type === USER_LOGOUT) {
    return {
      ...state,
      user: null,
      token: null,
      jobLocation: "",
      userLocation: "",
    };
  }

  //action method to perform when user starts to update his profile
  if (action.type === USER_UPDATE_START) {
    return { ...state, isLoading: true };
  }

  //action method to perform when user  updated his profile
  if (action.type === USER_UPDATE_SUCCESSFULL) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "User Profile Updated!",
    };
  }
  if (action.type === USER_UPDATE_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === VALUES_CLEAR) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "Full-Time",
      status: "Awaiting Response",
    };
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === JOB_CREATE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === JOB_CREATE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "New Job Created!",
    };
  }
  if (action.type === JOB_CREATE_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }
  if (action.type === JOBS_GET_BEGIN) {
    return { ...state, isLoading: true, displayAlertMsg: false };
  }
  if (action.type === JOBS_GET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === JOBS_GET_ALL_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === JOBS_GET_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
    };
  }
  if (action.type === SET_JOB_EDIT) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, jobLocation, jobType, status } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }

  if (action.type === JOB_DELETE_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === JOB_EDIT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === JOB_EDIT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "success",
      alertMsg: "Job Updated!",
    };
  }
  if (action.type === JOB_EDIT_ERROR) {
    return {
      ...state,
      isLoading: false,
      displayAlertMsg: true,
      alertType: "danger",
      alertMsg: action.payload.msg,
    };
  }
  if (action.type === STATS_SHOW_BEGIN) {
    return {
      ...state,
      isLoading: true,
      displayAlertMsg: false,
    };
  }

  if (action.type === STATS_SHOW_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }

  if (action.type === SEARCH_CLEAR) {
    return {
      ...state,
      search: "",
      searchStatus: "All",
      searchType: "All",
      sort: "Latest",
    };
  }

  if (action.type === PAGE_CHANGE) {
    return { ...state, page: action.payload.page };
  }

  if (action.type === EVENT_ADD) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, dateOfInterview } = job;

    return { ...state, company, position, dateOfInterview };
  }

  throw new Error(`not a valid action :${action.type}`);
};
export default reducer;
