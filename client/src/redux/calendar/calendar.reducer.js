import { 
  GET_CALENDAR_DATE_LOGS, ADD_CALENDAR_DATE_LOG, RESET_CALENDAR_DATE_LOGS, SET_CALENDAR_DATE, CALENDAR_ERROR 
} from './calendar.types';

const INITIAL_STATE = {
  calendarDateLogs: [],
  calendarDate: '',
  loading: true,
  errors: {},
};

// *************************** CALENDAR REDUCER *************************** //
export const calendarReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CALENDAR_DATE_LOGS:
      return {
        ...state,
        calendarDateLogs: state.calendarDateLogs,
        loading: false,
      };
    case ADD_CALENDAR_DATE_LOG:
      return {
        ...state,
        calendarDateLogs: [...state.calendarDateLogs, action.payload],
        loading: false,
      };
    case RESET_CALENDAR_DATE_LOGS:
      return {
        ...state,
        calendarDateLogs: [],
        calendarDate: '',
        // loading: true,
        loading: false,
      };
    case SET_CALENDAR_DATE:
      return {
        ...state,
        calendarDate: action.payload,
        loading: false,
      };
    case CALENDAR_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};