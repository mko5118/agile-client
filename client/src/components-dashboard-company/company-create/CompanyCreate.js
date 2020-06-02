import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createCompany } from '../../redux/company/company.actions';

import style from './company-create.module.scss';

// *************************** COMPANY CREATE COMPONENT *************************** //
const CompanyCreate = ({ createCompany }) => {
  const { client_id } = useParams();

  const [ formData, setFormData ] = useState({
    company_name: '',
    website: '',
    company_number: '',
    address: '',
    company_notes: '',
    associated_client: client_id,
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createCompany(formData);
    setFormData({
      company_name: '',
      website: '',
      company_number: '',
      address: '',
      company_notes: '',
      associated_client: client_id,
    });
  };

  return (
    <div className={style.companyCreate}>
      <h2>Create Company || Client Id: {client_id} </h2>
      <form onSubmit={onSubmit}>
        <input 
          type='text'
          name='company_name'
          placeholder='Company Name'
          autoComplete='off'
          value={createCompany.company_name}
          onChange={onChange}
          required
        />
        <input 
          type='text'
          name='website'
          placeholder='Company Website'
          autoComplete='off'
          value={createCompany.website}
          onChange={onChange}
        />
        <input 
          type='text'
          name='company_number'
          placeholder='Company Number'
          autoComplete='off'
          value={createCompany.company_number}
          onChange={onChange}
        />
        <input 
          type='text'
          name='address'
          placeholder='Company Address'
          autoComplete='off'
          value={createCompany.address}
          onChange={onChange}
        />
        <textarea 
          type='textarea'
          name='company_notes'
          placeholder='Company Notes'
          autoComplete='off'
          value={createCompany.company_notes}
          onChange={onChange}
        />
        <input 
          type='number'
          name='associated_client'
          placeholder='Associated Client'
          autoComplete='off'
          value={formData.associated_client}
          onChange={onChange}
        />
        <button type='submit'>Add Company</button>
      </form>
    </div>
  )
};

// PROP TYPES
CompanyCreate.propTypes = {
  createCompany: PropTypes.func.isRequired,
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  createCompany: ({ company_name, website, company_number, address, company_notes, associated_client }) => dispatch(createCompany({ company_name, website, company_number, address, company_notes, associated_client })),
});

export default connect(null, mapDispatchToProps)(CompanyCreate);