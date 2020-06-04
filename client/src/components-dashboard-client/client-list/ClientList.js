import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid/dist/v4';

import { getAClient } from '../../redux/clients/clients.actions';

import style from './client-list.module.scss';

// *************************** CLIENT LIST COMPONENT *************************** //
const ClientList = ({ clients, getAClient }) => {
  // 'clients' array passed down as prop from 'DashboardPage.js'
  
  useEffect(() => {

  }, [getAClient]);

  // Retrieve 'client' object from store and set 'client' by id onClick
  const onClickSetClient = (id) => {
    getAClient(id);
  };

  // Setup to sort 'clients' by corresponding letter
  const sortedByLastName = [
    { letter: 'A', sortedClients: [] },
    { letter: 'B', sortedClients: [] },
    { letter: 'C', sortedClients: [] },
    { letter: 'D', sortedClients: [] },
    { letter: 'E', sortedClients: [] },
    { letter: 'F', sortedClients: [] },
    { letter: 'G', sortedClients: [] },
    { letter: 'H', sortedClients: [] },
    { letter: 'I', sortedClients: [] },
    { letter: 'J', sortedClients: [] },
    { letter: 'K', sortedClients: [] },
    { letter: 'L', sortedClients: [] },
    { letter: 'M', sortedClients: [] },
    { letter: 'N', sortedClients: [] },
    { letter: 'O', sortedClients: [] },
    { letter: 'P', sortedClients: [] },
    { letter: 'Q', sortedClients: [] },
    { letter: 'R', sortedClients: [] },
    { letter: 'S', sortedClients: [] },
    { letter: 'T', sortedClients: [] },
    { letter: 'U', sortedClients: [] },
    { letter: 'V', sortedClients: [] },
    { letter: 'W', sortedClients: [] },
    { letter: 'X', sortedClients: [] },
    { letter: 'Y', sortedClients: [] },
    { letter: 'Z', sortedClients: [] },
  ];

  // Sort 'clients' into separate arrays by 1st letter of 'last_name'
  for (let i = 0; i < clients.length; i++) {
    for (let j = 0; j < sortedByLastName.length; j++) {
      if (clients[i].last_name[0] === sortedByLastName[j].letter) {
        sortedByLastName[j].sortedClients.push(clients[i])
      }
    }
  };

  // Render 'clients' to User
  const clientsOrderedByLastName = sortedByLastName.map(name => (
    name.sortedClients.length > 0 
      ?
      <div key={uuid()} className={style.clientListItem}>
        <h3 className={style.letter}>{name.letter}</h3>
        {name.sortedClients.map(client => (
          <h3 
            key={client.id} 
            className={style.clientName}
            onClick={() => onClickSetClient(client.id)}
          >
            {client.first_name} {client.last_name}
          </h3>
        ))}
      </div>
      : ''
  ));

  return (
    <div className={style.clientList}>
      <h2 className={style.clientListTitle}>Clients</h2>
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