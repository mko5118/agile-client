import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdPerson, MdWeb, MdPhoneInTalk, MdPlace, MdKeyboardReturn } from 'react-icons/md'

import { getCompany, updateCompany } from '../../redux/company/company.actions';
import { resetCompanyState } from '../../redux/dashboard/dashboard.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';

import style from './company-edit.module.scss';

// *************************** COMPANY EDIT COMPONENT *************************** //
const CompanyEdit = ({ client, currentCompany, loading, getCompany, updateCompany, resetCompanyState }) => {
  // 'client' object passed down as prop from 'ClientPage.js' component
  
  useEffect(() => {
    getCompany(currentCompany.id);
  }, [getCompany]);

  const [ formData, setFormData ] = useState({
    company_name: currentCompany.company_name ? currentCompany.company_name : '',
    website: currentCompany.website ? currentCompany.website : '',
    company_number: currentCompany.company_number ? currentCompany.company_number : '',
    address: currentCompany.address ? currentCompany.address : '',
    company_notes: currentCompany.company_notes ? currentCompany.company_notes : '',
    associated_client: currentCompany.associated_client ? currentCompany.associated_client : '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateCompany(currentCompany.id, formData);
  };

  const editCompanyForm = (
    <div className={style.companyEdit}>
      <h2 className={style.header}>Update Company</h2>

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
            value={formData.company_name}
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
            value={formData.website}
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
            value={formData.company_number}
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
            value={formData.address}
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
          value={formData.company_notes}
          onChange={onChange}
          className={style.textArea}
        />

        <Button type='submit' clientButton>Update</Button>
      </form>

      <div className={style.returnContainer} onClick={() => resetCompanyState()}>
        <MdKeyboardReturn className={style.returnIcon} aria-label='Return to Client' />
        <p className={style.returnText}>Return to Client</p>
      </div>

    </div>
  );

  return (
    (currentCompany === {} || loading)
      ? <p>Loading...</p>
      : editCompanyForm
  )
};

// PROP TYPES
CompanyEdit.propTypes = {
  client: PropTypes.object,
  currentCompany: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getCompany: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
  resetCompanyState: PropTypes.func.isRequired,
}

// REDUX
const mapStateToProps = (state) => ({
  currentCompany: state.company.currentCompany,
  loading: state.company.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getCompany: (companyId) => dispatch(getCompany(companyId)),
  updateCompany: (companyId, formData) => dispatch(updateCompany(companyId, formData)),
  resetCompanyState: () => dispatch(resetCompanyState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEdit);