import { 
  TOGGLE_HOME_MENU, TOGGLE_CLIENTS_MENU, TOGGLE_TASKS_MENU, TOGGLE_CALENDAR_MENU, TOGGLE_CREATE_COMPANY, TOGGLE_EDIT_COMPANY, RESET_COMPANY_STATE, TOGGLE_EDIT_CLIENT, RESET_EDIT_CLIENT,
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

// *************************** TOGGLE CREATE COMPANY *************************** //
export const toggleCreateCompany = () => (dispatch) => {
  dispatch({
    type: TOGGLE_CREATE_COMPANY,
  });
};

// *************************** TOGGLE EDIT COMPANY *************************** //
export const toggleEditCompany = () => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_COMPANY,
  });
};

// *************************** RESET COMPANY STATE *************************** //
export const resetCompanyState = () => (dispatch) => {
  dispatch({
    type: RESET_COMPANY_STATE,
  });
};

// *************************** TOGGLE EDIT CLIENT *************************** //
export const toggleEditClient = () => (dispatch) => {
  dispatch({
    type: TOGGLE_EDIT_CLIENT,
  });
};

// *************************** RESET EDIT CLIENT *************************** //
export const resetEditClient = () => (dispatch) => {
  dispatch({
    type: RESET_EDIT_CLIENT,
  });
};

