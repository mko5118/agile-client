import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createClient } from '../../redux/clients/clients.actions';

import style from './client-create.module.scss';

// *************************** CLIENT CREATE COMPONENT *************************** //
const ClientCreate = ({ createClient }) => {
  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    job_title: '',
    notes: '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createClient(formData);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      job_title: '',
      notes: '',
    });
  };

  return (
    <div className={style.clientCreate}>
      <h2>Add New Client</h2>

      <form onSubmit={onSubmit}>
        <input 
          type='text'
          name='first_name'
          placeholder='First Name'
          autoComplete='off'
          value={formData.first_name}
          onChange={onChange}
          required
        />
        <input 
          type='text'
          name='last_name'
          placeholder='Last Name'
          autoComplete='off'
          value={formData.last_name}
          onChange={onChange}
          required
        />
        <input 
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='off'
          value={formData.email}
          onChange={onChange}
        />
        <input 
          type='text'
          name='phone_number'
          placeholder='Phone Number'
          autoComplete='off'
          value={formData.phone_number}
          onChange={onChange}
        />
        <input 
          type='text'
          name='job_title'
          placeholder='Job Title'
          autoComplete='off'
          value={formData.job_title}
          onChange={onChange}
        />
        <textarea 
          type='textarea'
          name='notes'
          placeholder='Notes'
          autoComplete='off'
          value={formData.notes}
          onChange={onChange}
        />
        <button type='submit'>Submit</button>
      </form>

    </div>
  )
};

// PROP TYPES
ClientCreate.propTypes = {
  createClient: PropTypes.func.isRequired,
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  createClient: ({first_name, last_name, email, phone_number, job_title, notes}) => dispatch(createClient({first_name, last_name, email, phone_number, job_title, notes})),
});

export default connect(null, mapDispatchToProps)(ClientCreate);