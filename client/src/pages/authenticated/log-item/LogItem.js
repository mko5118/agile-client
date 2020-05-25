import React, { useState, useEffect } from 'react';
import axios from 'axios';

import style from './log-item.module.scss';

// *************************** LOG ITEM PAGE COMPONENT *************************** //
const LogItem = ({ client }) => {
  // 'client' passed down as object via 'ContactsPage.js' to allow Log filtering
  const [ clientLogs, setClientLogs ] = useState([]);

  useEffect(() => {
    getClientLogs()
  }, []);

  const getClientLogs = async () => {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`
      }
    };
    const res = await axios.get(`http://localhost:8000/api/client/logs/?associated_client=${client.id}`, config);
    setClientLogs(res.data);
  };

  return (
    <div className={style.logItem}>
      {
        clientLogs.map(log => (
          <div key={log.id}>
            <h4>{log.type}</h4>
            <p>{log.details}</p>
            <p>{log.log_date}</p>
          </div>
        ))
      }
    </div>
  )
};

export default LogItem;