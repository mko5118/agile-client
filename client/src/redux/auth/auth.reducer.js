import { 
  REGISTRATION_SUCCESS, REGISTRATION_FAIL, 
  USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, AUTH_ERROR,
} from './auth.types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  error: {},
};

export const authReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: {
          ...state.user,
          ...action.payload,
        }
      };
    case LOGIN_FAIL:
    case LOGOUT_USER:
    case REGISTRATION_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};