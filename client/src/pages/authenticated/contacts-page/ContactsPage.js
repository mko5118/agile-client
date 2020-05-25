import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CompanyItem from '../company-item/CompanyItem';
import LogItem from '../log-item/LogItem';

import style from './contacts-page.module.scss';

// *************************** CONTACTS PAGE COMPONENT *************************** //
const ContactsPage = () => {
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
    <div className={style.contactsPage}>
      <div>
        {
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
        }
      </div>
    </div>
  )
};

export default ContactsPage;