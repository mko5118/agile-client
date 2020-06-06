import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdPerson, MdWeb, MdPhoneInTalk, MdPlace } from 'react-icons/md'

import { getCompany, updateCompany } from '../../redux/company/company.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';

import style from './company-edit.module.scss';

// *************************** COMPANY EDIT COMPONENT *************************** //
const CompanyEdit = ({ currentCompany, loading, getCompany, updateCompany }) => {
  const { company_id } = useParams();

  useEffect(() => {
    getCompany(company_id);
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
    updateCompany(company_id, formData);
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
  // currentCompany: PropTypes.object.isRequired,
  currentCompany: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getCompany: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
}

// REDUX
const mapStateToProps = (state) => ({
  currentCompany: state.company.currentCompany,
  loading: state.company.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getCompany: (companyId) => dispatch(getCompany(companyId)),
  updateCompany: (companyId, formData) => dispatch(updateCompany(companyId, formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEdit);