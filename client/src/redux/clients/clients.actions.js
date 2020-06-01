import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import {
  GET_ALL_CLIENTS, GET_A_CLIENT, CLIENT_ERROR, DELETE_CLIENT, UPDATE_CLIENT, CREATE_CLIENT
} from './clients.types';

const API_URL = 'http://localhost:8000';

// *************************** GET ALL CLIENTS *************************** //
export const getAllClients = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.get(`${API_URL}/api/client/clients/`, config);

    dispatch({
      type: GET_ALL_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.detail
    const errors = err.response.statusText;
    if (errors) {
      console.log(errors);
      dispatch(setAlert(errors, 'danger', 2000));
    };
    dispatch({ type: CLIENT_ERROR });
  }
};

// *************************** GET A CLIENT *************************** //
export const getAClient = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.get(`${API_URL}/api/client/clients/${id}/`, config);

    dispatch({
      type: GET_A_CLIENT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.statusText;
    errors && dispatch(setAlert(errors, 'danger', 2000));
    dispatch({ type: CLIENT_ERROR });
  }
};

// *************************** CREATE CLIENT *************************** //
export const createClient = ({ first_name, last_name, email, phone_number, job_title, notes }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      }
    };

    const body = JSON.stringify({ first_name, last_name, email, phone_number, job_title, notes });
    const res = await axios.post(`${API_URL}/api/client/clients/`, body, config);

    dispatch({
      type: CREATE_CLIENT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.statusText;
    errors && dispatch(setAlert(errors, 'danger', 2000));
    dispatch({ type: CLIENT_ERROR });
  }
};

// *************************** DELETE CLIENT *************************** //
export const deleteClient = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    await axios.delete(`${API_URL}/api/client/clients/${id}/`, config);

    dispatch({
      type: DELETE_CLIENT,
      payload: id
    });
  } catch (err) {
    const errors = err.response.statusText;
    errors && dispatch(setAlert(errors, 'danger', 2000));
    dispatch({ type: CLIENT_ERROR });
  }
};

// *************************** UPDATE CLIENT *************************** //
export const updateClient = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`
      }
    };

    const body = JSON.stringify({ formData });
    const res = await axios.put(`${API_URL}/api/client/clients/${id}/`, body, config);

    dispatch({
      type: UPDATE_CLIENT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.statusText;
    errors && dispatch(setAlert(errors, 'danger', 2000));
    dispatch({ type: CLIENT_ERROR });
  }
};