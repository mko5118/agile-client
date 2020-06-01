import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllClients } from '../../redux/clients/clients.actions';

import ClientItem from '../client-item/ClientItem';
import CompanyItem from '../../components-dashboard-company/company-item/CompanyItem';
import LogItem from '../../components-dashboard-logs/log-item/LogItem';

import style from './clients-page.module.scss';

// *************************** CLIENTS PAGE COMPONENT *************************** //
const ClientsPage = ({ clients, getAllClients }) => {
  // 'clients' and 'getAllClients' passed as props from Redux store
  const { clients: allClients, client, loading, error } = clients;

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
        </div>
      ))
    : <p>Currently no contacts...</p>
  )

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
};

// REDUX
const mapStateToProps = (state) => ({
  clients: state.clients,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClients: () => dispatch(getAllClients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);