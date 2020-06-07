import { 
  TOGGLE_HOME_MENU, TOGGLE_CLIENTS_MENU, TOGGLE_TASKS_MENU, TOGGLE_CALENDAR_MENU, TOGGLE_CREATE_COMPANY, TOGGLE_EDIT_COMPANY, RESET_COMPANY_STATE, TOGGLE_EDIT_CLIENT, RESET_EDIT_CLIENT,
} from './dashboard.types';

const INITIAL_STATE = {
  homeMenu: { isActive: true },
  clientsMenu: { isActive: false },
  tasksMenu: { isActive: false },
  calendarMenu: { isActive: false },
  companyMenu: {
    isCreating: false,
    isEditing: false,
  },
  editingClient: false,
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
    case TOGGLE_CREATE_COMPANY:
      return {
        ...state,
        companyMenu: {
          isCreating: true,
          isEditing: false,
        },
      };
    case TOGGLE_EDIT_COMPANY:
      return {
        ...state,
        companyMenu: {
          isCreating: false,
          isEditing: true,
        },
      };
    case RESET_COMPANY_STATE:
      return {
        ...state,
        companyMenu: {
          isCreating: false,
          isEditing: false,
        },
      };
    case TOGGLE_EDIT_CLIENT:
      return {
        ...state,
        editingClient: !state.editingClient,
      };
    case RESET_EDIT_CLIENT:
      return {
        ...state,
        editingClient: false,
      };
    default:
      return state;
  }
};