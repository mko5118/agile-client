import { combineReducers } from 'redux';

import { alertReducer } from './alert/alert.reducer';
import { authReducer } from './auth/auth.reducer';
import { calendarReducer } from './calendar/calendar.reducer';
import { clientsReducer } from './clients/clients.reducer';
import { companyReducer } from './company/company.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer';
import { logReducer } from './log/log.reducer';
import { taskReducer } from './task/task.reducer';

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  calendar: calendarReducer,
  clients: clientsReducer,
  company: companyReducer,
  dashboard: dashboardReducer,
  log: logReducer,
  task: taskReducer,
});