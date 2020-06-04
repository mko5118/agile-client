import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAClient } from '../../redux/clients/clients.actions';

import style from './client-list.module.scss';

// *************************** CLIENT LIST COMPONENT *************************** //
const ClientList = ({ clients, getAClient }) => {
  // 'clients' array passed down as prop from 'DashboardPage.js'
  useEffect(() => {

  }, [getAClient]);

  const onClickSetClient = (id) => {
    /* 
      1. Will retrieve 'client' object from store 
      2. Set 'client' object and then pass object as a prop to 'ClientPage.js' component
    */
    getAClient(id);
  };

  const clientsOrderedByLastName = (
    clients.map(client => (
      <div key={client.id} onClick={() => onClickSetClient(client.id)}>
        <h3>{client.first_name} {client.last_name}</h3>
      </div>
    ))
  );

  return (
    <div className={style.clientList}>
      <h2 className={style.clientListTitle}>Client List</h2>
      {
        clients.loading ? <p>Loading...</p> : clientsOrderedByLastName
      }
    </div>
  )
};

// PROP TYPES
ClientList.propTypes = {
  clients: PropTypes.array,
  getAClient: PropTypes.func.isRequired,
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  getAClient: (id) => dispatch(getAClient(id)),
});

export default connect(null, mapDispatchToProps)(ClientList);