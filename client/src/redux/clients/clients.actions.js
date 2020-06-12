import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import {
  GET_ALL_CLIENTS, GET_A_CLIENT, RESET_CLIENT, CLIENT_ERROR, DELETE_CLIENT, UPDATE_CLIENT, CREATE_CLIENT
} from './clients.types';

const API_URL = 'http://localhost:8000';

const deployOnError = (err, dispatch, msg) => {
  const errors = err.response.statusText;
  errors && dispatch(setAlert(msg || errors, 'danger', 2000));
  dispatch({ type: CLIENT_ERROR, payload: errors });
};

// *************************** GET ALL CLIENTS *************************** //
export const getAllClients = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.get(`${API_URL}/api/client/clients/`, config);

    // Sort 'clients' in alphabetical order by LAST_NAME
    const sortedClientsByLastName = res.data.sort((a, b) => {
      if (a.last_name[0] < b.last_name[0]) { return -1 }
      if (a.last_name[0] > b.last_name[0]) { return 1}
      return 0
    });

    dispatch({
      type: GET_ALL_CLIENTS,
      payload: sortedClientsByLastName,
    });
  } catch (err) {
    deployOnError(err, dispatch);
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
    deployOnError(err, dispatch);
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
    dispatch(setAlert('New Client Added', 'success', 2000));
  } catch (err) {
    deployOnError(err, dispatch);
  }
};


// *************************** DELETE CLIENT *************************** //
export const deleteClient = (id) => async (dispatch) => {
  if (window.confirm('Please confirm you want to delete this client. This action cannot be undone.')) {
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
      dispatch(setAlert('Client Deleted Successfully', 'success', 2000));
    } catch (err) {
      deployOnError(err, dispatch);
    }
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

    const res = await axios.put(`${API_URL}/api/client/clients/${id}/`, formData, config);

    dispatch({
      type: UPDATE_CLIENT,
      payload: res.data,
    });
    dispatch(setAlert('Client Updated', 'success', 2000));
  } catch (err) {
    const errors = err.response.statusText;
  }
};


// *************************** RESET CLIENT *************************** //
export const resetClient = () => (dispatch) => {
  dispatch({ type: RESET_CLIENT });
};