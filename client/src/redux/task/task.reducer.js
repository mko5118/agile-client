import { 
  GET_ALL_TASKS, GET_A_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK, TASK_ERROR 
} from './task.types';

const INITIAL_STATE = {
  tasks: [],
  task: null,
  loading: true,
  error: {},
};

// *************************** TASK REDUCER *************************** //
export const taskReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case GET_A_TASK:
    case UPDATE_TASK:
      return {
        ...state,
        task: action.payload,
        loading: false,
      };
    case CREATE_TASK:
      return {
        tasks: [action.payload, ...state.tasks],
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};