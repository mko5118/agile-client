import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdInfoOutline, MdKeyboardReturn } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { getLog, updateLog } from '../../redux/log/log.actions';
import { resetLogState } from '../../redux/dashboard/dashboard.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';

import style from './log-edit.module.scss';

// *************************** LOG EDIT COMPONENT *************************** //
const LogEdit = ({ currentLog, loading, getLog, updateLog, resetLogState }) => {
  useEffect(() => {
    getLog(currentLog.id);
  }, [getLog]);

  const [ formData, setFormData ] = useState({
    type: currentLog.type ? currentLog.type : '',
    details: currentLog.details ? currentLog.details : '',
    log_date: currentLog.log_date ? currentLog.log_date : '',
    associated_client: currentLog.associated_client ? currentLog.associated_client : '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateLog(currentLog.id, formData);
  };

  const logEditForm = (
    <div className={style.logEdit}>
      <h2 className={style.header}>Update Log</h2>

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
        <textarea 
          type='textarea'
          name='details'
          placeholder='Details'
          autoComplete='off'
          value={formData.details}
          onChange={onChange}
          className={style.textArea}
        />

        <Button type='submit' clientButton>Update</Button>
      </form>

      <div className={style.returnContainer} onClick={() => resetLogState()}>
        <MdKeyboardReturn className={style.returnIcon} aria-label='Return to Client' />
        <p className={style.returnText}>Return to Client</p>
      </div>
    </div>
  )

  return (
    (currentLog === {} || loading)
      ? <p>Loading...</p>
      : logEditForm
  )
};

// PROP TYPES
LogEdit.propTypes = {
  currentLog: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getLog: PropTypes.func.isRequired,
  updateLog: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  currentLog: state.log.currentLog,
  loading: state.log.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getLog: (logId) => dispatch(getLog(logId)),
  updateLog: (logId, formData) => dispatch(updateLog(logId, formData)),
  resetLogState: () => dispatch(resetLogState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogEdit);