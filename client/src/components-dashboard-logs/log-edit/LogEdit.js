import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLog, updateLog } from '../../redux/log/log.actions';

import style from './log-edit.module.scss';

// *************************** LOG EDIT COMPONENT *************************** //
const LogEdit = ({ currentLog, loading, getLog, updateLog }) => {
  const { log_id } = useParams();

  useEffect(() => {
    getLog(log_id);
  }, [getLog]);

  return (
    (currentLog === null || loading)
      ? <p>Loading...</p>
      : 
      <div className={style.logEdit}>
        <h2>Log ID: {currentLog.id}</h2>
        <h2>Log Type: {currentLog.type}</h2>
        <p>Log Details: {currentLog.details}</p>
        <p>Log Date: {currentLog.log_date}</p>
        <p>Associated Client: {currentLog.associated_client}</p>
      </div>
  )
};

// PROP TYPES
LogEdit.propTypes = {
  currentLog: PropTypes.object.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LogEdit);