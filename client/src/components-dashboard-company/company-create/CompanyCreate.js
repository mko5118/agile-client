import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdPerson, MdWeb, MdPhoneInTalk, MdPlace, MdKeyboardReturn } from 'react-icons/md';

import { createCompany } from '../../redux/company/company.actions';
import { resetCompanyState } from '../../redux/dashboard/dashboard.actions';

import FormInput from '../../components/form-input/FormInput';
import Button from '../../components/button/Button';

import style from './company-create.module.scss';

// *************************** COMPANY CREATE COMPONENT *************************** //
const CompanyCreate = ({ client, createCompany, resetCompanyState }) => {
  // 'client' object passed down as prop from 'ClientPage.js' component

  const [ formData, setFormData ] = useState({
    company_name: '',
    website: '',
    company_number: '',
    address: '',
    company_notes: '',
    associated_client: client.id,
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
      associated_client: client.id,
    });
  };

  return (
    <div className={style.companyCreate}>
      <h2 className={style.header}>Create Company</h2>

      <form className={style.form} onSubmit={onSubmit}>

        <label className={style.formLabel}>
          Company Name <span className={style.requiredText}>(required)</span>
        </label>
        <div className={style.inputContainer}>
          <MdPerson className={style.inputIcon} />
          <FormInput 
            type='text'
            name='company_name'
            placeholder='Company Name'
            autoComplete='off'
            value={createCompany.company_name}
            onChange={onChange}
            required
            clientInput
          />
        </div>

        <label className={style.formLabel}>Company Website</label>
        <div className={style.inputContainer}>
          <MdWeb className={style.inputIcon} />
          <FormInput 
            type='text'
            name='website'
            placeholder='Company Website'
            autoComplete='off'
            value={createCompany.website}
            onChange={onChange}
            clientInput
          />
        </div>

        <label className={style.formLabel}>Company Number</label>
        <div className={style.inputContainer}>
          <MdPhoneInTalk className={style.inputIcon} />
          <FormInput 
            type='text'
            name='company_number'
            placeholder='Company Number'
            autoComplete='off'
            value={createCompany.company_number}
            onChange={onChange}
            clientInput
          />
        </div>

        <label className={style.formLabel}>Company Address</label>
        <div className={style.inputContainer}>
          <MdPlace className={style.inputIcon} />
          <FormInput 
            type='text'
            name='address'
            placeholder='Company Address'
            autoComplete='off'
            value={createCompany.address}
            onChange={onChange}
            clientInput
          />
        </div>

        <label className={style.formLabel}>Company Notes</label>
        <textarea 
          type='textarea'
          name='company_notes'
          placeholder='Company Notes'
          autoComplete='off'
          value={createCompany.company_notes}
          onChange={onChange}
          className={style.textArea}
        />
        
        <Button type='submit' clientButton>Create</Button>
      </form>

      <div className={style.returnContainer} onClick={() => resetCompanyState()}>
        <MdKeyboardReturn className={style.returnIcon} aria-label='Return to Client' />
        <p className={style.returnText}>Return to Client</p>
      </div>

    </div>
  )
};

// PROP TYPES
CompanyCreate.propTypes = {
  client: PropTypes.object,
  createCompany: PropTypes.func.isRequired,
  resetCompanyState: PropTypes.func.isRequired,
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  createCompany: ({ company_name, website, company_number, address, company_notes, associated_client }) => dispatch(createCompany({ company_name, website, company_number, address, company_notes, associated_client })),
  resetCompanyState: () => dispatch(resetCompanyState()),
});

export default connect(null, mapDispatchToProps)(CompanyCreate);