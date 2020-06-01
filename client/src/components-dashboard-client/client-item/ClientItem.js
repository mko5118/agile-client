import React, { } from 'react';

import style from './client-item.module.scss';

// *************************** CLIENT PAGE COMPONENT *************************** //
const ClientItem = ({ client }) => {
  // 'client' passed down as prop from 'ClientsPage.js'
  return (
    <div className={style.clientItem}>
      <h2>{client.first_name} {client.last_name}</h2>
      <hr />
      <p>{client.job_title}</p>
      <p>{client.email}</p>
      <p>{client.phone_number}</p>
      <p>{client.notes}</p>
    </div>
  )
};

export default ClientItem;