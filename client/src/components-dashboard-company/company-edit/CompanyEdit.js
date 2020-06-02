import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCompany, updateCompany } from '../../redux/company/company.actions';

import style from './company-edit.module.scss';

// *************************** COMPANY EDIT COMPONENT *************************** //
const CompanyEdit = ({ currentCompany, loading, getCompany, updateCompany }) => {
  const { company_id } = useParams();

  useEffect(() => {
    getCompany(company_id);
  }, [getCompany]);

  return (
    (currentCompany === null || loading)
      ? <p>Loading...</p>
      : 
      <div className={style.companyEdit}>
        <h2>Company ID: {currentCompany.id}</h2>
        <h2>Company Name: {currentCompany.company_name}</h2>
        <p>Website: {currentCompany.website}</p>
        <p>Company Number: {currentCompany.company_number}</p>
        <p>Address: {currentCompany.address}</p>
        <p>Company Notes: {currentCompany.company_notes}</p>
        <p>Associated Client: {currentCompany.associated_client}</p>
      </div>
  )
};

// PROP TYPES
CompanyEdit.propTypes = {
  currentCompany: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getCompany: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
}

// REDUX
const mapStateToProps = (state) => ({
  currentCompany: state.company.currentCompany,
  loading: state.company.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getCompany: (companyId) => dispatch(getCompany(companyId)),
  updateCompany: (companyId, formData) => dispatch(updateCompany(companyId, formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEdit);