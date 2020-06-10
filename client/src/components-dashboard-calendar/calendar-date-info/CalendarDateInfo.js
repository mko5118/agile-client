import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { getCalendarDateLogs } from '../../redux/calendar/calendar.actions';

import style from './calendar-date-info.module.scss';

// *************************** CALENDAR DATE INFO COMPONENT *************************** //
const CalendarDateInfo = ({ calendarDateLogs, calendarDate, loading, getCalendarDateLogs, }) => {
  useEffect(() => {
    getCalendarDateLogs();
  }, [getCalendarDateLogs]);

  let date = moment(calendarDate).format('MMMM Do YYYY')

  let calendarDateInfo = (
    calendarDateLogs.map(log => (
      <div key={log.id} className={style.calendarDateInfoContainer}>
        <p>{log.id}</p>
        <p>{log.title}</p>
        <p>{log.details}</p>
        <p>{log.date}</p>
        <p>{log.associated_client}</p>
      </div>
    ))
  );

  return (
    <div className={style.calendarDateInfo}>
      <h2 className={style.header}>
        LOGS
        <span className={style.headerDate}>{calendarDate !== '' ?  date : ''}</span>
      </h2>
      { 
        loading
          ? <p>Loading...</p>
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
  getCalendarDateLogs: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  calendarDateLogs: state.calendar.calendarDateLogs,
  calendarDate: state.calendar.calendarDate,
  loading: state.calendar.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getCalendarDateLogs: () => dispatch(getCalendarDateLogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDateInfo);