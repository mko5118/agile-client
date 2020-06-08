import { 
  GET_ALL_LOGS, GET_CLIENT_LOGS, GET_LOG, CREATE_LOG, DELETE_LOG, UPDATE_LOG, LOG_ERROR
} from './log.types';

const INITIAL_STATE = {
  logs: [],
  clientLogs: [],
  currentLog: {},
  loading: true,
  error: {},
};

// *************************** LOG REDUCER *************************** //
export const logReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case GET_CLIENT_LOGS:
      return {
        ...state,
        clientLogs: action.payload,
        loading: false,
      };
    case GET_LOG:
    case UPDATE_LOG:
      return {
        ...state,
        currentLog: action.payload,
        loading: false,
      };
    case CREATE_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        clientLogs: [action.payload, ...state.clientLogs],
        loading: false,
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log.id !== action.payload),
        clientLogs: state.clientLogs.filter(clientLog => clientLog.id !== action.payload),
        loading: false,
      };
    case LOG_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};