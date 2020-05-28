import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CompanyItem from '../../components-dashboard-company/company-item/CompanyItem';
import LogItem from '../../components-dashboard-logs/log-item/LogItem';

import style from './clients-page.module.scss';

// *************************** CLIENTS PAGE COMPONENT *************************** //
const ClientsPage = () => {
  const [ allClients, setAllClients ] = useState([]);

  useEffect(() => {
    getAllClients()
  }, [])

  const getAllClients = async () => {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`
      }
    }
    const res = await axios.get(`http://localhost:8000/api/client/clients/`, config);
    setAllClients(res.data)
  };

  return (
    <div className={style.clientsPage}>
      <div>
        {
          allClients.length > 0
            ?
              allClients.map(client => (
                <div key={client.id}>
                  <h2>{client.first_name} {client.last_name}</h2>
                  <hr />
                  <p>{client.job_title}</p>
                  <p>{client.email}</p>
                  <p>{client.phone_number}</p>
                  <p>{client.notes}</p>
                  <CompanyItem client={client} />
                  <LogItem client={client} />
                </div>
              ))
            : <p>Currently no contacts...</p>
        }
      </div>
    </div>
  )
};

export default ClientsPage;