import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { 
  REGISTRATION_SUCCESS, REGISTRATION_FAIL, 
  USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, AUTH_ERROR, 
} from './auth.types';


const API_URL = 'http://localhost:8000';

const deployOnError = (err, dispatch, msg) => {
  const errors = err.response.statusText;
  errors && dispatch(setAlert(msg || errors, 'danger', 2000));
  dispatch({ type: REGISTRATION_FAIL, payload: errors });
};


// *************************** SET AUTH TOKEN *************************** //
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};


// *************************** LOAD USER *************************** //
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.token}`,
    }
  };

  try {
    const res = await axios.get(`${API_URL}/api/user/me/`, config);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};


// *************************** REGISTER USER *************************** //
export const registerUser = ({ email, password, name }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    const body = JSON.stringify({ email, password, name });

    const res = await axios.post(`${API_URL}/api/user/create/`, body, config);

    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data
    });
    dispatch(loginUser(email, password));
    dispatch(setAlert('Registration Successful', 'success', 2000));
  } catch (err) {
    deployOnError(err, dispatch, 'Registration Unsuccessful');
  }
};

// *************************** LOGIN USER *************************** //
export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${API_URL}/api/user/token/`, body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert('Login Successful', 'success', 2000));
  } catch (err) {
    deployOnError(err, dispatch, 'Login Unsuccessful');
  }
};

// *************************** LOGOUT USER *************************** //
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};