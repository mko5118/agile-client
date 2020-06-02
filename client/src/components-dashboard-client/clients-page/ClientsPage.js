import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllClients, deleteClient } from '../../redux/clients/clients.actions';

import ClientItem from '../client-item/ClientItem';
import CompanyItem from '../../components-dashboard-company/company-item/CompanyItem';
import LogItem from '../../components-dashboard-logs/log-item/LogItem';

import style from './clients-page.module.scss';

// *************************** CLIENTS PAGE COMPONENT *************************** //
const ClientsPage = ({ clients, getAllClients, deleteClient }) => {
  // 'clients' and 'getAllClients' passed as props from Redux store
  const { clients: allClients, client, loading, error } = clients;

  const history = useHistory();
  const navigateToClient = (clientId) => {
    history.push(`/dashboard/clients/${clientId}`);
  };
  const navigateToCreateLog = (clientId) => {
    history.push(`/dashboard/clients/log-create/${clientId}`);
  };

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  const clientContainer = (
    allClients.length > 0
    ?
      allClients.map(client => (
        <div key={client.id} className={style.clientContainer}>
          <ClientItem client={client} />
          <CompanyItem client={client} />
          <LogItem client={client} />
          <h4>Client Id: {client.id}</h4>
          <div className={style.buttons}>
            <button onClick={() => navigateToCreateLog(client.id)}>Add Log</button>
            <button onClick={() => navigateToClient(client.id)}>Edit Client</button>
            <button onClick={() => deleteClient(client.id)}>Delete Client</button>
          </div>
        </div>
      ))
    : <p>Currently no contacts...</p>
  );

  return (
    <div className={style.clientsPage}>
      <div>
        {
          loading ? <p>Loading...</p> : clientContainer
        }
      </div>
    </div>
  );
};

// PROP TYPES
ClientsPage.propTypes = {
  clients: PropTypes.object.isRequired,
  getAllClients: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  clients: state.clients,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClients: () => dispatch(getAllClients()),
  deleteClient: (id) => dispatch(deleteClient(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);