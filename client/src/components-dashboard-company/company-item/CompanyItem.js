import React, { useState, useEffect } from 'react';
import axios from 'axios';

import style from './company-item.module.scss';

// *************************** COMPANY ITEM PAGE COMPONENT *************************** //
const CompanyItem = ({ client }) => {
  // 'client' passed down as object via 'ContactsPage.js' to allow Company filtering
  const [ allCompanies, setAllCompanies ] = useState([]);

  useEffect(() => {
    getAllCompanies()
  }, [])

  const getAllCompanies = async () => {
    const config = {
      headers: {
        'Authorization': `Token ${localStorage.token}`
      }
    };
    const res = await axios.get(`http://localhost:8000/api/client/company/`, config)
    setAllCompanies(res.data)
  };

  return (
    <div className={style.companyItem}>
      <div>
        {
          allCompanies.map(company => (
            company.associated_client === client.id &&
              <div key={company.id}>
                <h4>{company.company_name}</h4>
                <p>{company.website}</p>
                <p>{company.address}</p>
                <p>{company.company_number}</p>
                <p>{company.company_notes}</p>
              </div>
          ))
        }
      </div>
    </div>
  )
};

export default CompanyItem;