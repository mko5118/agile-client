import { combineReducers } from 'redux';

import { alertReducer } from './alert/alert.reducer';
import { authReducer } from './auth/auth.reducer';
import { taskReducer } from './task/task.reducer';

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  task: taskReducer,
});