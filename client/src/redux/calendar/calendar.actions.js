import { 
  GET_CALENDAR_DATE_LOGS, ADD_CALENDAR_DATE_LOG, RESET_CALENDAR_DATE_LOGS, SET_CALENDAR_DATE, CALENDAR_ERROR 
} from './calendar.types';
import { setAlert } from '../alert/alert.actions';


const deployOnError = (err, dispatch, msg) => {
  const errors = err.response.statusText;
  errors && dispatch(setAlert(msg || errors, 'danger', 2000));
  dispatch({ type: CALENDAR_ERROR, payload: errors });
};


// *************************** GET CALENDAR DATE LOGS *************************** //
export const getCalendarDateLogs = () => (dispatch) => {
  try {
    dispatch({
      type: GET_CALENDAR_DATE_LOGS,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  };
};

// *************************** ADD CALENDAR DATE LOG *************************** //
export const addCalendarDateLog = (log) => (dispatch) => {
  try {
    dispatch({
      type: ADD_CALENDAR_DATE_LOG,
      payload: log,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  };
};

// *************************** RESET CALENDAR DATE LOGS *************************** //
export const resetCalendarDateLogs = () => (dispatch) => {
  dispatch({
    type: RESET_CALENDAR_DATE_LOGS,
  });
};

// *************************** SET CALENDAR DATE *************************** //
export const setCalendarDate = (logDate) => (dispatch) => {
  dispatch({ 
    type: SET_CALENDAR_DATE,
    payload: logDate, 
  });
};