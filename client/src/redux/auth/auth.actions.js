import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { 
  REGISTRATION_SUCCESS, REGISTRATION_FAIL, 
  USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, AUTH_ERROR, 
} from './auth.types';


const route = 'http://localhost:8000';

// *************************** SET AUTH TOKEN *************************** //
const setAuthToken = (token) => {
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
    const res = await axios.get(`${route}/api/user/me/`, config);
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
export const registerUser = ({ name, email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    const body = JSON.stringify({ name, email, password });

    const res = await axios.post(`${route}/api/user/create/`, config, body);
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(
        setAlert(error.msg, 'danger')
      ));
    };
    dispatch({
      type: REGISTRATION_FAIL,
    });
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
    const res = await axios.post(`${route}/api/user/token/`, body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(
        setAlert(error.msg, 'danger', 2000)
      ))
    };
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// *************************** LOGOUT USER *************************** //
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};