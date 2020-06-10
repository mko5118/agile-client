import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { getCalendarDateLogs } from '../../redux/calendar/calendar.actions';

import style from './calendar-date-info.module.scss';

// *************************** CALENDAR DATE INFO COMPONENT *************************** //
const CalendarDateInfo = ({ calendarDateLogs, calendarDate, loading, clients, getCalendarDateLogs, }) => {
  useEffect(() => {
    getCalendarDateLogs();
  }, [getCalendarDateLogs]);

  let date = moment(calendarDate).format('MMMM Do YYYY');

  let calendarDateInfo;

  // Render when Calendar first displays to User
  if (calendarDateLogs.length === 0 && calendarDate === '') {
    calendarDateInfo = (
      <p className={style.loadingText}>Pick a date from the calendar.</p>
    );
  };

  // Render if no 'calendarDateLog' object for selected 'date'
  if (calendarDateLogs.length === 0 && calendarDate !== '') {
    calendarDateInfo = (
      <p className={style.loadingText}>No logs for {date}.</p>
    );
  };

  // Render 'calendarDateInfo' for each Event object
  if (calendarDateLogs.length > 0 && calendarDate !== '') {
    calendarDateInfo = (
      calendarDateLogs.map(log => (
        <div key={log.id} className={style.calendarDateInfoContainer}>
          {/* Map through 'clients' to render 'log.associated_client' first_name + last_name */}
          {
            clients.map(client => (
              client.id === log.associated_client
                && <p className={style.logClient}>{client.first_name} {client.last_name}</p>
            ))
          }
          <p className={style.logType}>{log.title}</p>
          <p className={style.logText}>{log.details}</p>
        </div>
      ))
    );
  };

  return (
    <div className={style.calendarDateInfo}>
      <h2 className={style.header}>
        LOGS
        <span className={style.headerDate}>{calendarDate !== '' ?  date : ''}</span>
      </h2>
      { 
        loading
          ? <p className={style.loadingText}>Loading...</p>
          : calendarDateInfo
      }
    </div>
  )
};

// PROP TYPES
CalendarDateInfo.propTypes = {
  calendarDateLogs: PropTypes.array.isRequired,
  calendarDate: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  clients: PropTypes.array,
  getCalendarDateLogs: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  calendarDateLogs: state.calendar.calendarDateLogs,
  calendarDate: state.calendar.calendarDate,
  loading: state.calendar.loading,
  clients: state.clients.clients,
});

const mapDispatchToProps = (dispatch) => ({
  getCalendarDateLogs: () => dispatch(getCalendarDateLogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDateInfo);