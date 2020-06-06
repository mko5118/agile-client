import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdPerson, MdWeb, MdPhoneInTalk, MdPlace } from 'react-icons/md';

import { createCompany } from '../../redux/company/company.actions';

import FormInput from '../../components/form-input/FormInput';
import Button from '../../components/button/Button';

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
      <h2 className={style.header}>Add Company</h2>

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
        <Button type='submit' clientButton>Add Company</Button>
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