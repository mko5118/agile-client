import { 
  TOGGLE_HOME_MENU, TOGGLE_CLIENTS_MENU, TOGGLE_TASKS_MENU, TOGGLE_CALENDAR_MENU 
} from './dashboard.types';

const INITIAL_STATE = {
  homeMenu: { isActive: true },
  clientsMenu: { isActive: false },
  tasksMenu: { isActive: false },
  calendarMenu: { isActive: false },
};

// *************************** DASHBOARD REDUCER *************************** //
export const dashboardReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_HOME_MENU:
      return {
        ...state,
        homeMenu: { isActive: true },
        clientsMenu: { isActive: false },
        tasksMenu: { isActive: false },
        calendarMenu: { isActive: false },
      };
    case TOGGLE_CLIENTS_MENU:
      return {
        ...state,
        homeMenu: { isActive: false },
        clientsMenu: { isActive: true },
        tasksMenu: { isActive: false },
        calendarMenu: { isActive: false },
      };
    case TOGGLE_TASKS_MENU:
      return {
        ...state,
        homeMenu: { isActive: false },
        clientsMenu: { isActive: false },
        tasksMenu: { isActive: true },
        calendarMenu: { isActive: false },
      };
    case TOGGLE_CALENDAR_MENU:
      return {
        ...state,
        homeMenu: { isActive: false },
        clientsMenu: { isActive: false },
        tasksMenu: { isActive: false },
        calendarMenu: { isActive: true },
      };
    default:
      return state;
  }
};