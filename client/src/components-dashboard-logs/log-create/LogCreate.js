import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createLog } from '../../redux/log/log.actions';

import style from './log-create.module.scss';

// *************************** LOG CREATE COMPONENT *************************** //
const LogCreate = ({ createLog }) => {
  const { client_id } = useParams();

  const [ formData, setFormData ] = useState({
    type: '',
    details: '',
    // log_date: '',
    associated_client: client_id,
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
      // log_date: '',
      associated_client: client_id,
    });
  };

  return (
    <div className={style.logCreate}>
      <h3>Create Log</h3>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50%'}}>
        <input 
          type='text'
          name='type'
          placeholder='Type'
          autoComplete='off'
          value={formData.type}
          onChange={onChange}
          required
        />
        <textarea 
          type='textarea'
          name='details'
          placeholder='Details'
          autoComplete='off'
          value={formData.details}
          onChange={onChange}
        />
        <input 
          type='number'
          name='associated_client'
          placeholder='Associated Client'
          autoComplete='off'
          value={formData.associated_client}
          onChange={onChange}
        />
        <button type='submit'>Create Log</button>
      </form>
    </div>
  )
};

// PROP TYPES
LogCreate.propTypes = {
  createLog: PropTypes.func.isRequired,
};

// REDUX
const mapDispatchToProps = (dispatch) => ({
  createLog: ({type, details, associated_client}) => dispatch(createLog({type, details, associated_client})),
});

export default connect(null, mapDispatchToProps)(LogCreate);