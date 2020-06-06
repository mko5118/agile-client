import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { 
  GET_ALL_LOGS, GET_CLIENT_LOGS, GET_LOG, CREATE_LOG, DELETE_LOG, UPDATE_LOG, LOG_ERROR
} from './log.types';


const API_URL = 'http://localhost:8000';

const deployOnError = (err, dispatch) => {
  const errors = err.response.statusText;
  errors && dispatch(setAlert(errors, 'danger', 2000));
  dispatch({ type: LOG_ERROR });
};

// *************************** GET ALL LOGS *************************** //
export const getAllLogs = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.get(`${API_URL}/api/client/logs/`, config);

    dispatch({
      type: GET_ALL_LOGS,
      payload: res.data,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
};

// *************************** GET CLIENT LOGS *************************** //
export const getClientLogs = (clientId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.get(`${API_URL}/api/client/logs/?associated_client=${clientId}`, config);

    dispatch({
      type: GET_CLIENT_LOGS,
      payload: res.data,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
};

// *************************** GET LOG *************************** //
export const getLog = (logId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`
      }
    };

    const res = await axios.get(`${API_URL}/api/client/logs/${logId}/`, config);

    dispatch({
      type: GET_LOG,
      payload: res.data,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
};

// *************************** CREATE LOG *************************** //
export const createLog = ({ type, details, associated_client }) => async (dispatch) => {
  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`,
      }
    };
    
    const body = JSON.stringify({ type, details, associated_client });
    const res = await axios.post(`${API_URL}/api/client/logs/`, body, config);

    dispatch({
      type: CREATE_LOG,
      payload: res.data,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
};

// *************************** DELETE LOG *************************** //
export const deleteLog = (logId) => async (dispatch) => {
  if (window.confirm('Please confirm you want to delete this log. This action cannot be undone.')) {
    try {
      const config = {
        headers: {
          'Authorization': `Token ${localStorage.token}`,
        }
      };
  
      await axios.delete(`${API_URL}/api/client/logs/${logId}/`, config);
  
      dispatch({
        type: DELETE_LOG,
        payload: logId,
      });
    } catch (err) {
      deployOnError(err, dispatch);
    }
  }
};

// *************************** UPDATE LOG *************************** //
export const updateLog = (logId, formData) => async (dispatch) => {
  try {
    const config = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.put(`${API_URL}/api/client/logs/${logId}`, formData, config);

    dispatch({
      type: UPDATE_LOG,
      payload: res.data,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
};
