import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever, MdKeyboardReturn } from 'react-icons/md';

import { getLog, deleteLog } from '../../redux/log/log.actions';
import { toggleEditLog, resetLogState } from '../../redux/dashboard/dashboard.actions';

import LogCreate from '../log-create/LogCreate';

import style from './log-all-items.module.scss';

// *************************** LOG ALL ITEMS COMPONENT *************************** //
const LogAllItems = ({ clientLogs, getLog, deleteLog, toggleEditLog, resetLogState }) => {

  // Will toggle 'logMenu.isEditing' state to render 'LogEdit.js' component in 'ClientPage.js'
  const navigateToEditLog = async (logId) => {
    await getLog(logId);
    toggleEditLog();
  };

  // Renders 'clientLogs' for current Client
  const clientLogsContainer = (
    clientLogs.map(clientLog => (
      <div className={style.clientLogItem} key={clientLog.id}>
          <div className={style.headerContainer}>
            <h4 className={style.logType}>{clientLog.type}</h4>
            <div className={style.buttonContainer}>
              <div className={style.editIconContainer} onClick={() => navigateToEditLog(clientLog.id)}>
                <MdEdit className={style.editIcon} aria-label='Edit Log' />
                <span className={style.editText}>Edit</span>
              </div>
              <div className={style.deleteIconContainer} onClick={() => deleteLog(clientLog.id)}>
                <MdDeleteForever className={style.deleteIcon} aria-label='Delete Log' />
                <span className={style.deleteText}>Delete</span>
              </div>
            </div>
          </div>
          <p className={style.logText}>{clientLog.details}</p>
          <p className={style.logText}>{clientLog.log_date}</p>
          {/* <p className={style.logText}>{log.associated_client}</p> */}
      </div>
    ))
  );

  return (
    <div className={style.logAllItems}>

      <LogCreate removeReturnContainer />

      <div className={style.clientLogsContainer}>
        <h2 className={style.header}>All Logs</h2>
        { clientLogsContainer }
      </div>

      <div className={style.returnContainer} onClick={() => resetLogState()}>
        <MdKeyboardReturn className={style.returnIcon} aria-label='Return to Client' />
        <p className={style.returnText}>Return to Client</p>
      </div>

    </div>
  )
};

// PROP TYPES
LogAllItems.propTypes = {
  clientLogs: PropTypes.array,
  resetLogState: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  clientLogs: state.log.clientLogs,
});

const mapDispatchToProps = (dispatch) => ({
  getLog: (logId) => dispatch(getLog(logId)),
  deleteLog: (logId) => dispatch(deleteLog(logId)),
  toggleEditLog: () => dispatch(toggleEditLog()),
  resetLogState: () => dispatch(resetLogState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogAllItems);