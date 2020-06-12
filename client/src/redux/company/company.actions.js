import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { 
  GET_ALL_COMPANIES, GET_COMPANY, CREATE_COMPANY, UPDATE_COMPANY, DELETE_COMPANY, COMPANY_ERROR 
} from './company.types';

const API_URL = 'http://localhost:8000';

const deployOnError = (err, dispatch, msg) => {
  const errors = err.response.statusText;
  errors && dispatch(setAlert(msg || errors, 'danger', 2000));
  dispatch({ type: COMPANY_ERROR, payload: errors });
};

// *************************** GET ALL COMPANIES *************************** //
export const getAllCompanies = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`
      }
    };

    const res = await axios.get(`${API_URL}/api/client/company/`, config);
    dispatch({
      type: GET_ALL_COMPANIES,
      payload: res.data,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
};


// *************************** GET COMPANY *************************** //
export const getCompany = (companyId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.get(`${API_URL}/api/client/company/${companyId}/`, config);

    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
  } catch (err) {
    deployOnError(err, dispatch);
  }
};


// *************************** CREATE COMPANY *************************** //
export const createCompany = ({ company_name, website, company_number, address, company_notes, associated_client }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const body = JSON.stringify({ company_name, website, company_number, address, company_notes, associated_client });

    const res = await axios.post(`${API_URL}/api/client/company/`, body, config);

    dispatch({
      type: CREATE_COMPANY,
      payload: res.data,
    });
    dispatch(setAlert('New Company Added', 'success', 2000));
  } catch (err) {
    deployOnError(err, dispatch);
  }
};


// *************************** DELETE COMPANY *************************** //
export const deleteCompany = (companyId) => async (dispatch) => {
  if (window.confirm('Please confirm you want to delete this company. This action cannot be undone.')) {
    try {
      const config = {
        headers: {
          'Authorization': `Token ${localStorage.token}`,
        }
      };
      await axios.delete(`${API_URL}/api/client/company/${companyId}/`, config);
      dispatch({
        type: DELETE_COMPANY,
        payload: companyId,
      });
      dispatch(setAlert('Company Deleted Successfully', 'success', 2000));
    } catch (err) {
      deployOnError(err, dispatch);
    }
  }
};


// *************************** UPDATE COMPANY *************************** //
export const updateCompany = (companyId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.token}`,
      }
    };

    const res = await axios.put(`${API_URL}/api/client/company/${companyId}/`, formData, config);

    dispatch({
      type: UPDATE_COMPANY,
      payload: res.data,
    });
    dispatch(setAlert('Company Updated', 'success', 2000));
  } catch (err) {
    deployOnError(err, dispatch);
  }
};