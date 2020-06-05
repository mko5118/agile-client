import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import { getAllLogs, deleteLog } from '../../redux/log/log.actions';

import style from './log-item.module.scss';

// *************************** LOG ITEM COMPONENT *************************** //
const LogItem = ({ client, logs, loading, getAllLogs, deleteLog }) => {
  // 'client' passed down as object via 'ContactsPage.js' to allow Log filtering

  useEffect(() => {
    getAllLogs();
  }, [getAllLogs]);

  const history = useHistory();
  const navigateToEditLog = (logId) => {
    history.push(`/dashboard/clients/log/${logId}`);
  };

  console.log(logs);

  const logContainer = (
    logs.map(log => (
      log.associated_client === client.id
      &&
        <div key={log.id} className={style.logContainer}>
          <div className={style.headerContainer}>
            <h4 className={style.logType}>{log.type}</h4>
            <div className={style.buttonContainer}>
              <div className={style.editIconContainer} onClick={() => navigateToEditLog(log.id)}>
                <MdEdit className={style.editIcon} aria-label='Edit Log' />
                <span className={style.editText}>Edit</span>
              </div>
              <div className={style.deleteIconContainer} onClick={() => deleteLog(log.id)}>
                <MdDeleteForever className={style.deleteIcon} aria-label='Delete Log' />
                <span className={style.deleteText}>Delete</span>
              </div>
            </div>
          </div>
          <p className={style.logText}>{log.details}</p>
          {/* <p className={style.logText}>{log.log_date}</p>
          <p className={style.logText}>{log.associated_client}</p> */}
        </div>
    ))
  );

  return (
    <div className={style.logItem}>
      {
        loading
          ? <p>Loading...</p>
          : logContainer
      }
    </div>
  )
};

// PROP TYPES
LogItem.propTypes = {
  client: PropTypes.object.isRequired,
  logs: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getAllLogs: PropTypes.func.isRequired,
  deleteLog: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  logs: state.log.logs,
  loading: state.log.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAllLogs: () => dispatch(getAllLogs()),
  deleteLog: (logId) => dispatch(deleteLog(logId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogItem);