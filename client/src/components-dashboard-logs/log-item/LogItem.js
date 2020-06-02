import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  return (
    <div className={style.logItem}>
      {
        loading
          ? <p>Loading...</p>
          : logs.map(log => (
              log.associated_client === client.id
              &&
                <div key={log.id}>
                  <h4>{log.type}</h4>
                  <p>{log.details}</p>
                  <p>{log.log_date}</p>
                  <p>Log ID: {log.id}</p>
                  <button onClick={() => navigateToEditLog(log.id)}>Edit Log</button>
                  <button onClick={() => deleteLog(log.id)}>Delete Log</button>
                </div>
        ))
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