import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllCompanies, deleteCompany } from '../../redux/company/company.actions';

import style from './company-item.module.scss';

// *************************** COMPANY ITEM PAGE COMPONENT *************************** //
const CompanyItem = ({ client, company, getAllCompanies, deleteCompany }) => {
  // 'client' passed down as object via 'ClientsPage.js' to allow Company filtering
  const { companies, loading } = company;

  useEffect(() => {
    getAllCompanies();
  }, []);

  const history = useHistory();
  const navigateToCompany = (companyId) => {
    history.push(`/dashboard/clients/company/${companyId}`);
  };
  const navigateToCreateCompany = (clientId) => {
    history.push(`/dashboard/clients/company-create/${clientId}`);
  };

  const companyContainer = (
    companies.map(company => (
      company.associated_client === client.id
        ?
          <div key={company.id}>
            <h4>{company.company_name}</h4>
            <p>{company.website}</p>
            <p>{company.address}</p>
            <p>{company.company_number}</p>
            <p>{company.company_notes}</p>

            <button onClick={() => navigateToCompany(company.id)}>View Company</button>
            <button onClick={() => deleteCompany(company.id)}>Delete Company</button>
          </div>
        : <button key={company.id} onClick={() => navigateToCreateCompany(client.id)}>Add Company</button>

    ))
  );

  return (
    <div className={style.companyItem}>
      {
        loading ? <p>Loading...</p> : companyContainer
      }
    </div>
  )
};

// PROP TYPES
CompanyItem.propTypes = {
  client: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  getAllCompanies: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  company: state.company,  
});

const mapDispatchToProps = (dispatch) => ({
  getAllCompanies: () => dispatch(getAllCompanies()),
  deleteCompany: (companyId) => dispatch(deleteCompany(companyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyItem);