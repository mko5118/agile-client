import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdPerson, MdEmail, MdPhoneInTalk, MdDeleteForever } from 'react-icons/md'
import { FaUserTie } from 'react-icons/fa';

import { getAClient, updateClient, deleteClient, resetClient } from '../../redux/clients/clients.actions';
import { toggleEditClient } from '../../redux/dashboard/dashboard.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';
import FormTextArea from '../../components/form-text-area/FormTextArea';
import ReturnContainer from '../../components/return-container/ReturnContainer';

import style from './client-edit.module.scss';

// *************************** CLIENT EDIT COMPONENT *************************** //
const ClientEdit = ({ client, loading, getAClient, updateClient, deleteClient, resetClient, toggleEditClient }) => {

  useEffect(() => {
    getAClient(client.id);
    updateClient();
  }, [getAClient, updateClient, deleteClient, client.id]);

  // Set initial form state with 'client' info if available
  const [ formData, setFormData ] = useState({
    first_name: client.first_name ? client.first_name : '',
    last_name: client.last_name ? client.last_name : '',
    email: client.email ? client.email : '',
    phone_number: client.phone_number ? client.phone_number : '',
    job_title: client.job_title ? client.job_title : '',
    notes: client.notes ? client.notes : ''
  });

  const onClientDelete = () => {
    deleteClient(client.id);
    resetClient();
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateClient(client.id, formData);
  };

  // Render ClientForm to User
  const updateClientForm = (
    <div className={style.clientEdit}>
      <div className={style.headerContainer}>
        <h2 className={style.header}>Update Info</h2>
        <div className={style.iconContainer} onClick={onClientDelete}>
          <MdDeleteForever className={style.deleteIcon} aria-label='Delete Client' /> 
          <span className={style.deleteText}>Delete Client</span>
        </div>
      </div>

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
        <FormTextArea 
          type='textarea'
          name='notes'
          placeholder='Notes'
          autoComplete='off'
          value={formData.notes}
          onChange={onChange}
          clientTextArea
        />

        <Button type='submit' clientButton>Update</Button>
      </form>

      <ReturnContainer returnToClient onClick={() => toggleEditClient()} />

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
  client: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getAClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  resetClient: PropTypes.func.isRequired,
  toggleEditClient: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  client: state.clients.client,
  loading: state.clients.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAClient: (id) => dispatch(getAClient(id)),
  updateClient: (id, formData) => dispatch(updateClient(id, formData)),
  deleteClient: (id) => dispatch(deleteClient(id)),
  resetClient: () => dispatch(resetClient()),
  toggleEditClient: () => dispatch(toggleEditClient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientEdit);