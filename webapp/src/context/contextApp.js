import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
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

// setting default when user refreshes the page
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

//setting up the initial state
const State = {
  isLoading: false,
  displayAlertMsg: false,
  alertMsg: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || " ",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || " ",
  jobTypeOptions: ["Full-Time", "Internship", "Hybrid", "Remote"],
  jobType: "Full-Time",
  statusOptions: [
    "Interview Scheduled",
    "Rejected",
    "Awaiting Response",
    "Accepted",
  ],
  status: "Awaiting Response",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "All",
  searchType: "All",
  sort: "Latest",
  sortOptions: ["Latest", "oldest", "a-z", "z-a"],
  dateOfInterview: "",
};

const ContextApp = React.createContext();

const ProviderApp = ({ children }) => {
  // const [state, setState] = useState(State);
  const [state, dispatch] = useReducer(reducer, State);

  //setting up instances in axios library
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    // Authorization: `Bearer ${state.token}`,
    // },
  });

  //setup axios request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //setup axios request interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("AUTHENTICATION ERROR");
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //below are the functions to be handle dispatched based on the action types

  const showAlert = () => {
    dispatch({ type: SHOW_ALERT });
    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };

  //to persist the user login details inside local storage
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  //to remove the user from local storage after logout
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const userRegistration = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: USER_REGISTER_START });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      //console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: USER_REGISTER_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: USER_REGISTER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  //post request when user logs in
  const loginUser = async (currentUser) => {
    dispatch({ type: USER_LOGIN_START });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      const { user, token, location } = data;
      dispatch({
        type: USER_LOGIN_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
        },
      });

      //adding user to local storage to maintain login status
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: USER_LOGIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  const setupUser = async ({ currentUser, endPoint, alertMsg }) => {
    dispatch({ type: USER_SETUP_START });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, location } = data;
      dispatch({
        type: USER_SETUP_SUCCESSFUL,
        payload: {
          user,
          token,
          location,
          alertMsg,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: USER_SETUP_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: SIDEBAR_TOGGLE });
  };

  const logoutUser = () => {
    dispatch({ type: USER_LOGOUT });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: USER_UPDATE_START });
    try {
      const { data } = await authFetch.put("/auth/updateUser", currentUser);
      const { user, location, token } = data;
      dispatch({
        type: USER_UPDATE_SUCCESSFULL,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: USER_UPDATE_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    hideAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: VALUES_CLEAR });
  };

  const createJob = async () => {
    dispatch({ type: JOB_CREATE_BEGIN });
    try {
      const {
        position,
        company,
        jobLocation,
        jobType,
        status,
        dateOfInterview,
      } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
        dateOfInterview,
      });
      dispatch({ type: JOB_CREATE_SUCCESS });
      dispatch({ type: VALUES_CLEAR });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: JOB_CREATE_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };
  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;
    //constructing the url with search query parameters
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: JOBS_GET_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: JOBS_GET_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    hideAlert();
  };

  const getAllJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;
    //constructing the url with search query parameters
    let url = `/jobs/cal`;

    dispatch({ type: JOBS_GET_ALL_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs } = data;
      dispatch({
        type: JOBS_GET_ALL_SUCCESS,
        payload: {
          jobs,
          totalJobs,
        },
      });
    } catch (error) {
      logoutUser();
    }
    hideAlert();
  };

  // useEffect(() => {
  // getJobs()
  // }, [])

  const setEditJob = (id) => {
    dispatch({ type: SET_JOB_EDIT, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: JOB_EDIT_BEGIN });

    try {
      const {
        position,
        company,
        jobLocation,
        jobType,
        status,
        dateOfInterview,
      } = state;
      await authFetch.put(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
        dateOfInterview,
      });
      dispatch({ type: JOB_EDIT_SUCCESS });
      dispatch({ type: VALUES_CLEAR });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: JOB_EDIT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    hideAlert();
  };

  const deleteJob = async (id) => {
    dispatch({ type: JOB_DELETE_BEGIN });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };
  const clearSearch = () => {
    //console.log("clear filters");
    dispatch({ type: SEARCH_CLEAR });
  };

  const showStats = async () => {
    dispatch({ type: STATS_SHOW_BEGIN });
    try {
      const { data } = await authFetch("jobs/stats");
      dispatch({
        type: STATS_SHOW_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const changePage = (page) => {
    dispatch({ type: PAGE_CHANGE, payload: { page } });
  };

  const addEvent = (company, position, date) => {
    dispatch({ type: EVENT_ADD, payload: { company, position, date } });
  };
  //we are going to return the provider with prop values and render the children
  return (
    <ContextApp.Provider
      value={{
        ...state,
        showAlert,
        userRegistration,
        loginUser,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearSearch,
        changePage,
        addEvent,
        getAllJobs,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

//setting up the hook to access in all components to give access to the context
const useContextApp = () => {
  return useContext(ContextApp);
};

export { ProviderApp, State, useContextApp };
