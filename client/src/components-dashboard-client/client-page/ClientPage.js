import React, { } from 'react';
import PropTypes from 'prop-types';

import ClientItem from '../client-item/ClientItem';
import CompanyItem from '../../components-dashboard-company/company-item/CompanyItem';
import LogItem from '../../components-dashboard-logs/log-item/LogItem';

import style from './client-page.module.scss';

// *************************** CLIENT PAGE COMPONENT *************************** //
const ClientPage = ({ client }) => {
  // 'client' object passed as prop from 'DashboardPage.js'

  const { id, first_name, last_name, email, phone_number, job_title, notes, client_company, logs, loading } = client;

  const clientInfo = (
    <div className={style.clientPage}>
      
      <div className={style.clientHeader}>
        <h2>{first_name} {last_name}</h2>
        <h4>{job_title}</h4>
      </div>
      
      <div className={style.clientBody}>
        <p>Phone #: {phone_number}</p>
        <p>Email: {email}</p>
        <p>Notes: {notes}</p>
      </div>

      <div className={style.companyContainer}>
        <h3>Company</h3>
        <CompanyItem client={client} />
      </div>

      <div className={style.logsContainer}>
        <h3>Recent Logs</h3>
        <LogItem client={client} />
      </div>

    </div>
  );

  return (
    loading ? <p>loading...</p> : clientInfo
  )
};

// PROP TYPES
ClientPage.propTypes = {
  client: PropTypes.object.isRequired,
};

export default ClientPage;