import React, { } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';
import { FaPlusCircle, FaPlus } from 'react-icons/fa';

import { deleteCompany } from '../../redux/company/company.actions';

import Button from '../../components/button/Button';

import style from './company-item.module.scss';

// *************************** COMPANY ITEM PAGE COMPONENT *************************** //
const CompanyItem = ({ client, currentCompany, loading, deleteCompany }) => {
  // 'client' passed down as object via 'ClientPage.js' to allow Company filtering

  const history = useHistory();
  const navigateToCompany = (companyId) => {
    history.push(`/dashboard/clients/company/${companyId}`);
  };
  const navigateToCreateCompany = (clientId) => {
    history.push(`/dashboard/clients/company-create/${clientId}`);
  };

  // Render correct 'currentCompany' object for 'client' object
  const companyContainer = (
    (currentCompany !== null && (currentCompany.associated_client === client.id))
      ?
        <div key={currentCompany.id} className={style.companyContainer}>
          <h4 className={style.companyTitle}>{currentCompany.company_name}</h4>
          <p className={style.companyText}>
            <a href={`https://${currentCompany.website}`} target='_blank' rel='noopener noreferrer' className={style.link}>
              {currentCompany.website}
            </a>
          </p>
          <p className={style.companyText}>{currentCompany.address}</p>
          <p className={style.companyText}>{currentCompany.company_number}</p>
          {
            currentCompany.company_notes 
            && <h4 className={style.companyTitleTwo}>Who is {currentCompany.company_name}?</h4>
          }
          <p className={style.companyText}>{currentCompany.company_notes}</p>
          <div className={style.buttonContainer}>
            <div 
              className={style.viewIconContainer} 
              onClick={() => navigateToCompany(currentCompany.id)}
            >
              <MdRemoveRedEye className={style.viewIcon} aria-label='View Company' />
              <span className={style.viewText}>View Company</span>
            </div>
            <div 
              className={style.deleteIconContainer}
              onClick={() => deleteCompany(currentCompany.id)}
            >
              <MdDeleteForever className={style.deleteIcon} aria-label='Delete Company' />
              <span className={style.deleteText}>Remove Company</span>
            </div>
          </div>
        </div>
      :
        <div className={style.companyContainer}>
          <p className={style.companyText}>
            No company added currently. Click below if you would like to add a company for {client.first_name} {client.last_name}
          </p>
          <div className={style.buttonContainer}>
            <div 
              className={style.addIconContainer} 
              onClick={() => navigateToCreateCompany(client.id)}
            >
              <FaPlusCircle className={style.addIcon} aria-label='Add Company' />
              <span className={style.addText}>Add Company</span>
            </div>
          </div>
        </div>
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
  currentCompany: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  deleteCompany: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  currentCompany: state.company.currentCompany,
  loading: state.company.loading,
});

const mapDispatchToProps = (dispatch) => ({
  deleteCompany: (companyId) => dispatch(deleteCompany(companyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyItem);