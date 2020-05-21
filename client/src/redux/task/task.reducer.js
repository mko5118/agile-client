import { 
  GET_ALL_TASKS, GET_A_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK, TASK_ERROR 
} from './task.types';

const INITIAL_STATE = {
  tasks: [],
  task: null,
  loading: true,
  error: {},
}

export const taskReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case GET_A_TASK:
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
    default:
      return state;
  }
};