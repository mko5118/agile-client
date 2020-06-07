import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { FaPlusCircle } from 'react-icons/fa';

import { getClientLogs, getLog, deleteLog } from '../../redux/log/log.actions';
import { toggleCreateLog, toggleEditLog } from '../../redux/dashboard/dashboard.actions';

import style from './log-item.module.scss';

// *************************** LOG ITEM COMPONENT *************************** //
const LogItem = ({ client, loading, clientLogs, getLog, getClientLogs, deleteLog, toggleCreateLog, toggleEditLog }) => {
  useEffect(() => {
    getClientLogs(client.id)
  }, [getClientLogs, client.id, getLog]);

  // Will toggle 'logMenu.isEditing' state to render 'LogEdit.js' component in 'ClientPage.js'
  const navigateToEditLog = async (logId) => {
    await getLog(logId);
    toggleEditLog();
  };
  // Will toggle 'logMenu.isCreating' state to render 'LogCreate.js' component in 'ClientPage.js'
  const navigateToCreateLog = () => {
    toggleCreateLog();
  };

  let logContainer;

  // 'clientLogs' exists ? show User the 3 most recent logs : give User option to add new Log
  if (clientLogs.length > 0) {
    logContainer = (
      clientLogs.slice(0, 3).map(log => (
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
          <p className={style.logText}>{log.log_date}</p>
          {/* <p className={style.logText}>{log.associated_client}</p> */}
        </div>
      ))
    );
  } else {
    logContainer = (
      <div className={style.addLogContainer}>
        <p className={style.addLogText}>
          No logs added currently. Click below if you would like to add a log for {client.first_name} {client.last_name}
        </p>
        <div className={style.addButtonContainer}>
          <div 
            className={style.addIconContainer} 
            onClick={() => navigateToCreateLog()}
          >
            <FaPlusCircle className={style.addIcon} aria-label='Add Log' />
            <span className={style.addText}>Add New Log</span>
          </div>
        </div>
      </div>
    )
  }

  
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
  client: PropTypes.object,
  clientLogs: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getClientLogs: PropTypes.func.isRequired,
  getLog: PropTypes.func.isRequired,
  deleteLog: PropTypes.func.isRequired,
  toggleCreateLog: PropTypes.func.isRequired,
  toggleEditLog: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  client: state.clients.client,
  clientLogs: state.log.clientLogs,
  loading: state.log.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getClientLogs: (clientId) => dispatch(getClientLogs(clientId)),
  getLog: (logId) => dispatch(getLog(logId)),
  deleteLog: (logId) => dispatch(deleteLog(logId)),
  toggleCreateLog: () => dispatch(toggleCreateLog()),
  toggleEditLog: () => dispatch(toggleEditLog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogItem);