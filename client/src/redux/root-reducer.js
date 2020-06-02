import { combineReducers } from 'redux';

import { alertReducer } from './alert/alert.reducer';
import { authReducer } from './auth/auth.reducer';
import { clientsReducer } from './clients/clients.reducer';
import { companyReducer } from './company/company.reducer';
import { logReducer } from './log/log.reducer';
import { taskReducer } from './task/task.reducer';

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  clients: clientsReducer,
  company: companyReducer,
  log: logReducer,
  task: taskReducer,
});