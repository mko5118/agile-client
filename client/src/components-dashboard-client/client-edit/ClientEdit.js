import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdPerson, MdEmail, MdPhoneInTalk } from 'react-icons/md'
import { FaUserTie } from 'react-icons/fa';

import { getAClient, updateClient } from '../../redux/clients/clients.actions';

import FormInput from '../../components/form-input/FormInput';
import Button from '../../components/button/Button';

import style from './client-edit.module.scss';

// *************************** CLIENT EDIT COMPONENT *************************** //
const ClientEdit = ({ client, loading, getAClient, updateClient }) => {
  const { client_id } = useParams();

  useEffect(() => {
    getAClient(client_id);
    updateClient();
  }, [getAClient, updateClient]);

  const [ formData, setFormData ] = useState({
    first_name: client.first_name ? client.first_name : '',
    last_name: client.last_name ? client.last_name : '',
    email: client.email ? client.email : '',
    phone_number: client.phone_number ? client.phone_number : '',
    job_title: client.job_title ? client.job_title : '',
    notes: client.notes ? client.notes : ''
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateClient(client.id, formData);
    // setFormData({
    //   first_name: client.first_name ? client.first_name : '',
    //   last_name: client.last_name ? client.last_name : '',
    //   email: client.email ? client.email : '',
    //   phone_number: client.phone_number ? client.phone_number : '',
    //   job_title: client.job_title ? client.job_title : '',
    //   notes: client.notes ? client.notes : ''
    // });
  };

  const updateClientForm = (
    <div className={style.clientEdit}>
      <form className={style.form} onSubmit={onSubmit}>
        <label className={style.formLabel}>
          First Name <span className={style.requiredText}>(required)</span>
        </label>
        <div className={style.inputContainer}>
          <MdPerson className={style.inputIcon} />
          <FormInput 
            type='text'
            name='first_name'
            placeholder='First Name'
            autoComplete='off'
            value={formData.first_name}
            onChange={onChange}
            clientInput
          />
        </div>

        <label className={style.formLabel}>
          Last Name <span className={style.requiredText}>(required)</span>
        </label>
        <div className={style.inputContainer}>
          <MdPerson className={style.inputIcon} />
          <FormInput 
            type='text'
            name='last_name'
            placeholder='Last Name'
            autoComplete='off'
            value={formData.last_name}
            onChange={onChange}
            clientInput
          />
        </div>

        <label className={style.formLabel}>Email</label>
        <div className={style.inputContainer}>
          <MdEmail className={style.inputIcon} />
          <FormInput 
            type='email'
            name='email'
            placeholder='Email'
            autoComplete='off'
            value={formData.email}
            onChange={onChange}
            clientInput
          />
        </div>

        <label className={style.formLabel}>Phone Number</label>
        <div className={style.inputContainer}>
          <MdPhoneInTalk className={style.inputIcon} />
          <FormInput 
            type='text'
            name='phone_number'
            placeholder='Phone Number'
            autoComplete='off'
            value={formData.phone_number}
            onChange={onChange}
            clientInput
          />
        </div>

        <label className={style.formLabel}>Job Title</label>
        <div className={style.inputContainer}>
          <FaUserTie className={style.inputIcon} />
          <FormInput 
            type='text'
            name='job_title'
            placeholder='Job Title'
            autoComplete='off'
            value={formData.job_title}
            onChange={onChange}
            clientInput
          />
        </div>

        <label className={style.formLabel}>Notes</label>
        <textarea 
          type='textarea'
          name='notes'
          placeholder='Notes'
          autoComplete='off'
          value={formData.notes}
          onChange={onChange}
          className={style.textArea}
        />

        <Button type='submit' clientButton>Update</Button>
      </form>
    </div>
  );

  return (
    (client === null || loading)
      ? <p>Loading...</p>
      : updateClientForm
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