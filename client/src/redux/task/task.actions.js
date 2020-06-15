import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { 
  GET_ALL_TASKS, GET_A_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK, TASK_ERROR 
} from './task.types';

const API_URL = 'http://localhost:8000';
// const API_URL = 'http://45.55.46.165:8000';

const deployOnError = (err, dispatch, msg) => {
  const errors = err.response.statusText;
  errors && dispatch(setAlert(msg || errors, 'danger', 2000));
  dispatch({ type: TASK_ERROR, payload: errors });
};

// *************************** GET ALL TASKS *************************** //
export const getAllTasks = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`
      }
    };

    const res = await axios.get(`${API_URL}/api/task/tasks/`, config);

    // Sort 'tasks' by DATE_CREATED with most recent logs last
    const sortedTasksByDate = res.data.sort((a, b) => {
      if (a.date_created < b.date_created) { return -1 }
      if (a.date_created > b.date_created) { return 1}
      return 0
    });

    dispatch({
      type: GET_ALL_TASKS,
      payload: sortedTasksByDate,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
};


// *************************** GET A TASK (SINGLE) *************************** //
export const getTask = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.get(`${API_URL}/api/task/tasks/${id}`, config);

    dispatch({
      type: GET_A_TASK,
      payload: res.data,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
}


// *************************** CREATE TASK *************************** //
export const createTask = (title, body, is_complete) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    // renamed 'task.body' to 'content' due to sharing namespace with 'body'
    const bodyJSON = JSON.stringify({title, body, is_complete});

    const res = await axios.post(`${API_URL}/api/task/tasks/`, bodyJSON, config);
    console.log(res);
    dispatch({
      type: CREATE_TASK,
      payload: res.data,
    });
    dispatch(setAlert('New Task Added', 'success', 2000));
  } catch (err) {
    deployOnError(err, dispatch);
  }
}


// *************************** UPDATE TASK *************************** //
export const updateTask = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`,
      }
    };
    
    const res = await axios.put(`${API_URL}/api/task/tasks/${id}/`, formData, config);

    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
    dispatch(setAlert('Task Updated', 'success', 2000));
  } catch (err) {
    deployOnError(err, dispatch);
  }
};


// *************************** DELETE TASK *************************** //
export const deleteTask = (id) => async (dispatch) => {
  if (window.confirm('Confirm you want to delete this task. This action cannot be undone.')) {
    try {
      const config = {
        headers: {
          'Authorization': `Token ${localStorage.token}`,
        }
      };
  
      await axios.delete(`${API_URL}/api/task/tasks/${id}/`, config);
  
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
      dispatch(setAlert('Task Deleted Successfully', 'success', 2000));
    } catch (err) {
      deployOnError(err, dispatch);
    }
  }
};