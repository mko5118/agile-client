import { 
  TOGGLE_HOME_MENU, TOGGLE_CLIENTS_MENU, TOGGLE_TASKS_MENU, TOGGLE_CALENDAR_MENU 
} from './dashboard.types';

// *************************** TOGGLE HOME MENU *************************** //
export const toggleHomeMenu = () => (dispatch) => {
  dispatch({
    type: TOGGLE_HOME_MENU,
  });
};

// *************************** TOGGLE CLIENTS MENU *************************** //
export const toggleClientsMenu = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CLIENTS_MENU,
  });
};

// *************************** TOGGLE TASKS MENU *************************** //
export const toggleTasksMenu = () => (dispatch) => {
  dispatch({
    type: TOGGLE_TASKS_MENU,
  });
};

// *************************** TOGGLE CALENDAR MENU *************************** //
export const toggleCalendarMenu = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CALENDAR_MENU,
  });
};