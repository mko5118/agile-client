import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAClient, updateClient } from '../../redux/clients/clients.actions';

import style from './client-edit.module.scss';

// *************************** CLIENT EDIT COMPONENT *************************** //
const ClientEdit = ({ client, loading, getAClient, updateClient }) => {
  const { client_id } = useParams();

  useEffect(() => {
    getAClient(client_id);
    updateClient();
  }, [getAClient, updateClient]);

  const [ formData, setFormData ] = useState({
    // first_name: (client === null ? '' : client.first_name),
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    job_title: '',
    notes: ''
  });

  const onChange = (e) => {
    console.log(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
  };

  return (
    (client === null || loading)
      ? <p>Loading...</p>
      :
      <div className={style.clientEdit}>
        <h2>{client.first_name} {client.last_name}</h2>
        <hr />
        <p>{client.job_title}</p>
        <p>{client.email}</p>
        <p>{client.phone_number}</p>
        <p>{client.notes}</p>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50%'}}>
          <input 
            type='text'
            name='first_name'
            placeholder='First Name'
            autoComplete='off'
            value={formData.first_name}
            onChange={onChange}
          />
          <input 
            type='text'
            name='last_name'
            placeholder='Last Name'
            autoComplete='off'
            value={formData.last_name}
            onChange={onChange}
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
          <button>Submit</button>
        </form>
      </div>
  )
};

// PROP TYPES
ClientEdit.propTypes = {
  client: PropTypes.object.isRequired,
  // client: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getAClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  client: state.clients.client,
  loading: state.clients.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAClient: (id) => dispatch(getAClient(id)),
  updateClient: (id, formData) => dispatch(updateClient(id, formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientEdit);