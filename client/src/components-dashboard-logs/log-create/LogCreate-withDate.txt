import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdInfoOutline, MdKeyboardReturn } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { createLog } from '../../redux/log/log.actions';
import { resetLogState } from '../../redux/dashboard/dashboard.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';
import FormTextArea from '../../components/form-text-area/FormTextArea';

import style from './log-create.module.scss';

// *************************** LOG CREATE COMPONENT *************************** //
const LogCreate = ({ removeReturnContainer, client, createLog, resetLogState }) => {
  // 'removeReturnContainer' passed as prop from 'LogAllItems.js' component to remove duplicate return container div
  const [ formData, setFormData ] = useState({
    type: '',
    details: '',
    log_date: '',
    associated_client: client.id,
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createLog(formData);
    setFormData({
      type: '',
      details: '',
      log_date: '',
      associated_client: client.id,
    });
  };

  return (
    <div className={style.logCreate}>
      <h2 className={style.header}>Create Log</h2>

      <form className={style.form} onSubmit={onSubmit}>

        <label className={style.formLabel}>
          Log Type <span className={style.requiredText}>(required)</span>
        </label>
        <div className={style.inputContainer}>
          <MdInfoOutline className={style.inputIcon} />
          <FormInput 
            type='text'
            name='type'
            placeholder='Type'
            autoComplete='off'
            value={formData.type}
            onChange={onChange}
            required
            clientInput
          />
        </div>

        <label className={style.formLabel}>Date</label>
        <div className={style.inputContainer}>
          <FaRegCalendarAlt className={style.inputIcon} />
          <FormInput 
            type='date'
            name='log_date'
            placeholder='Date'
            autoComplete='off'
            value={formData.log_date}
            onChange={onChange}
          />
        </div>

        <label className={style.formLabel}>Details</label>
        <FormTextArea 
          type='textarea'
          name='details'
          placeholder='Details'
          autoComplete='off'
          value={formData.details}
          onChange={onChange}
          clientTextArea
        />

        <Button type='submit' clientButton>Create</Button>
      </form>

      {/* If 'removeReturnContainer' passed as prop, div does not display to remove duplicates */}
      {
        removeReturnContainer
          ? ''
          :
            <div className={style.returnContainer} onClick={() => resetLogState()}>
              <MdKeyboardReturn className={style.returnIcon} aria-label='Return to Client' />
              <p className={style.returnText}>Return to Client</p>
            </div>
      }

    </div>
  )
};

// PROP TYPES
LogCreate.propTypes = {
  client: PropTypes.object,
  createLog: PropTypes.func.isRequired,
  resetLogState: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  client: state.clients.client,
})

const mapDispatchToProps = (dispatch) => ({
  createLog: ({type, details, associated_client}) => dispatch(createLog({type, details, associated_client})),
  resetLogState: () => dispatch(resetLogState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogCreate);