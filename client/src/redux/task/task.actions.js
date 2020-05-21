import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { 
  GET_ALL_TASKS, GET_A_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK, TASK_ERROR 
} from './task.types';

const API_URL = 'http://localhost:8000';

// *************************** GET ALL TASKS *************************** //
export const getAllTasks = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`
      }
    };

    const res = await axios.get(`${API_URL}/api/task/tasks/`, config);

    dispatch({
      type: GET_ALL_TASKS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(
        setAlert(error.msg, 'danger', 2000)
      ));
    };
    dispatch({
      type: TASK_ERROR,
    });
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
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(
        setAlert(error.msg, 'danger', 2000)
      ));
    }
    dispatch({
      type: TASK_ERROR,
    });
  }
}


// *************************** CREATE TASK *************************** //
export const createTask = (title, body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    // renamed 'task.body' to 'content' due to sharing namespace with 'body'
    const bodyJSON = JSON.stringify({title, body});

    const res = await axios.post(`${API_URL}/api/task/tasks/`, bodyJSON, config);
    console.log(res);
    dispatch({
      type: CREATE_TASK,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(
        setAlert(error.msg, 'danger', 2000)
      ));
    }
    dispatch({
      type: TASK_ERROR
    });
  }
}


// *************************** UPDATE TASK *************************** //


// *************************** DELETE TASK *************************** //