import uuid from 'uuid/dist/v4';
import { SET_ALERT, REMOVE_ALERT } from './alert.types';

// *************************** SET / REMOVE ALERT *************************** //
export const setAlert = (msg, alertType, timeout=2000) => (dispatch) => {
  const id = uuid()

  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });

  // Removes ALERT after assigned 'timeout' length
  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: id,
  }), timeout);
};
