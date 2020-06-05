import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdPerson, MdEmail, MdPhoneInTalk } from 'react-icons/md'
import { FaUserTie } from 'react-icons/fa';

import { createClient } from '../../redux/clients/clients.actions';

import FormInput from '../../components/form-input/FormInput';
import Button from '../../components/button/Button';

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
      <h2 className={style.header}>Add New Client</h2>

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
            required
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
            required
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

        <Button type='submit' clientButton>Add Client</Button>
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