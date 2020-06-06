import { 
  GET_ALL_COMPANIES, GET_COMPANY, CREATE_COMPANY, UPDATE_COMPANY, DELETE_COMPANY, COMPANY_ERROR 
} from './company.types';

const INITIAL_STATE = {
  companies: [],
  // currentCompany: null,
  currentCompany: {},
  loading: true,
  error: {}
};

// *************************** COMPANY REDUCER *************************** //
export const companyReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_ALL_COMPANIES:
      return {
        ...state,
        companies: action.payload,
        loading: false,
      };
    case GET_COMPANY:
    case UPDATE_COMPANY:
      return {
        ...state,
        currentCompany: action.payload,
        loading: false,
      };
    case CREATE_COMPANY:
      return {
        ...state,
        companies: [...state.companies, action.payload],
        currentCompany: action.payload,
        loading: false,
      };
    case DELETE_COMPANY:
      return {
        ...state,
        companies: state.companies.filter(company => company.id !== action.payload),
        // currentCompany: null,
        currentCompany: {},
        loading: false,
      };
    case COMPANY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};