import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdEmail, MdPhoneInTalk, MdEdit } from 'react-icons/md';

import { getAllCompanies, getCompany } from '../../redux/company/company.actions';
import { resetCompanyState, toggleEditClient } from '../../redux/dashboard/dashboard.actions';

import ClientEdit from '../client-edit/ClientEdit';
import CompanyItem from '../../components-dashboard-company/company-item/CompanyItem';
import CompanyCreate from '../../components-dashboard-company/company-create/CompanyCreate';
import CompanyEdit from '../../components-dashboard-company/company-edit/CompanyEdit';
import LogItem from '../../components-dashboard-logs/log-item/LogItem';
import LogCreate from '../../components-dashboard-logs/log-create/LogCreate';
import LogEdit from '../../components-dashboard-logs/log-edit/LogEdit';

import style from './client-page.module.scss';

// *************************** CLIENT PAGE COMPONENT *************************** //
const ClientPage = ({ client, companies, companyMenu, logMenu, editingClient, getAllCompanies, getCompany, resetCompanyState, toggleEditClient }) => {
  // 'client' object passed as prop from 'DashboardPage.js'
  const { id, first_name, last_name, email, phone_number, job_title, notes, client_company, logs, loading } = client;

  // Toggle whether User is currently editing 'client' object info
  const onClickEditClient = () => {
    resetCompanyState();
    toggleEditClient();
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  // Loop through 'companies' and set 'currentCompany' if matches 'client.id' 
  companies.map(company => {
    if (company.associated_client === client.id) {
      getCompany(company.id);
    }
  });

  // ClientPage header (doesnt change as other Client items are being rendered)
  const clientHeader = (
    <div className={style.clientHeader}>
      <div className={style.nameContainer}>
        <h2 className={style.clientName}>{first_name} {last_name}</h2>
        <div className={style.jobTitleContainer}>
          <p className={style.jobTitle}>{job_title}</p>
          <div className={style.iconContainer} onClick={() => onClickEditClient()}>
            {/* <MdEdit className={style.editIcon} /> */}
            {/* <span className={style.editText}>{editingClient ? 'Return to Client' : 'Edit'}</span> */}
            {
              !editingClient && 
              <>
                <MdEdit className={style.editIcon} /> 
                <span className={style.editText}>Edit</span>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );

  // Render Client Info to page
  let clientInfo = (
    <div className={style.clientPage}>
      {/* CLIENT HEADER SECTION */}
      { clientHeader }
      {/* CLIENT CONTACT INFO SECTION */}
      <div className={style.sectionContainer}>
        <h3 className={style.sectionTitle}>Contact Info</h3>
        <div className={style.infoContainer}>
          <MdPhoneInTalk aria-label='Phone Number' className={style.icon} />
          <p className={style.infoText}>
            {phone_number ? phone_number : 'N/A'}
          </p>
        </div>
        <div className={style.infoContainer}>
          <MdEmail aria-label='Email Address' className={style.icon} />
          <p className={style.infoText}>
            {email ? email : 'N/A'}
          </p>
        </div>
      </div>
      {/* CLIENT NOTES SECTION */}
      <div className={style.sectionContainer}>
        <h3 className={style.sectionTitle}>Notes</h3>
        <p className={style.noteText}>
          { notes ? notes : 'No client notes added...'}
        </p>
      </div>
      {/* CLIENT COMPANY SECTION */}
      <div className={style.sectionContainer}>
        <h3 className={style.sectionTitle}>Company Info</h3>
        <CompanyItem client={client} />
      </div>
      {/* CLIENT LOGS SECTION */}
      <div className={style.sectionContainer}>
        <h3 className={style.sectionTitle}>Recent Logs</h3>
        <LogItem />
      </div>
    </div>
  );

  // if User selects 'toggleCreateCompany' in 'CompanyItem' render 'CompanyCreate' component to screen
  if (companyMenu.isCreating) {
    clientInfo = (
      <div className={style.clientPage}>
        { clientHeader }
        <CompanyCreate client={client} />
      </div>
    )
  };

  // if User selects 'toggleEditCompany' in 'CompanyItem' render 'CompanyEdit' component to screen
  if (companyMenu.isEditing) {
    clientInfo = (
      <div className={style.clientPage}>
        { clientHeader }
        <CompanyEdit />
      </div>
    )
  }

  // if User selects 'toggleCreateLog' in 'CompanyItem' render 'LogCreate' component to screen
  if (logMenu.isCreating) {
    clientInfo = (
      <div className={style.clientPage}>
        { clientHeader }
        <LogCreate />
      </div>
    )
  }
  
  // if User selects 'toggleEditLog' in 'CompanyItem' render 'LogEdit' component to screen
  if (logMenu.isEditing) {
    clientInfo = (
      <div className={style.clientPage}>
        { clientHeader }
        <LogEdit />
      </div>
    )
  }

  // Render 'ClientEdit.js' component if editingClient === true
  const renderClientEdit = (
    <div className={style.clientPage}>
      { clientHeader }
      {/* CLIENT EDIT COMPONENT */}
      <ClientEdit client={client} />
    </div>
  );

  // Final render options for screen
  const renderToScreen = (
    editingClient ? renderClientEdit : clientInfo
  );

  return (
    loading ? <p>Loading...</p> : renderToScreen
  )
};

// PROP TYPES
ClientPage.propTypes = {
  client: PropTypes.object.isRequired,
  companies: PropTypes.array,
  companyMenu: PropTypes.object,
  logMenu: PropTypes.object,
  editingClient: PropTypes.bool.isRequired,
  getAllCompanies: PropTypes.func.isRequired,
  getCompany: PropTypes.func.isRequired,
  resetCompanyState: PropTypes.func.isRequired,
  toggleEditClient: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  companies: state.company.companies,
  companyMenu: state.dashboard.companyMenu,
  logMenu: state.dashboard.logMenu,
  editingClient: state.dashboard.editingClient,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCompanies: () => dispatch(getAllCompanies()),
  getCompany: (companyId) => dispatch(getCompany(companyId)),
  resetCompanyState: () => dispatch(resetCompanyState()),
  toggleEditClient: () => dispatch(toggleEditClient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);