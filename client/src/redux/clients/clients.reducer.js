import {
  GET_ALL_CLIENTS, GET_A_CLIENT, RESET_CLIENT, CLIENT_ERROR, DELETE_CLIENT, UPDATE_CLIENT, CREATE_CLIENT
} from './clients.types';

const INITIAL_STATE = {
  clients: [],
  // client: {
  //   id: 11,
  //   first_name: "Bill",
  //   last_name: "Gates",
  //   email: "billgates@microsoft.com",
  //   phone_number: "123-456-8999",
  //   job_title: "Founder",
  //   notes: "One of the co-founders of Microsoft along with Paul Allen",
  //   client_company: null,
  //   logs: null,
  // },
  client: null,
  loading: true,
  error: {},
};

// *************************** CLIENTS REDUCER *************************** //
export const clientsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loading: false,
      };
    case GET_A_CLIENT:
    case UPDATE_CLIENT:
      return {
        ...state,
        client: action.payload,
        loading: false,
      };
    case CREATE_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
        loading: false,
      };
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload),
        loading: false,
      };
    case RESET_CLIENT:
      return {
        ...state,
        client: null,
        loading: false,
      };
    case CLIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};