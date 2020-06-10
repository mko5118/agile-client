import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { getAllLogs } from '../../redux/log/log.actions';
import { addCalendarDateLog, resetCalendarDateLogs, setCalendarDate, } from '../../redux/calendar/calendar.actions';

import style from './calendar-logs.module.scss';

// *************************** CALENDAR LOGS COMPONENT *************************** //
const CalendarLogs = ({ logs, getAllLogs, addCalendarDateLog, resetCalendarDateLogs, setCalendarDate, }) => {
  useEffect(() => {
    getAllLogs()
  }, [setCalendarDate]);

  let formData = [];

  // Map 'logs' objects into correct format in 'formData' array for 'fullcalendar' to parse
  logs.map(log => (
    formData.push({
      id: log.id,
      title: log.type,
      details: log.details,
      date: moment(log.log_date).format('YYYY-MM-DD'),
      associated_client: log.associated_client,
    })
  ));

  const onDateClick = (arg) => {
    resetCalendarDateLogs();
    setCalendarDate(arg.dateStr)
    formData.map(log => (
      log.date === arg.dateStr
        && addCalendarDateLog(log)
    ));
    /*
      --- IDEA ON CLICK => CLICK ON A DATE and in DASHBOARD_SMALL_SECTION
          1. PRINT OUT THE DATE AT THE TOP OF THE CONTAINER
          2. LOOP THROUGH LOGS AND MATCH LOG.ID TO PRINT TO SCREEN
          3. IF MATCH, PRINT ALL THE DETAILS OF THE LOG
          4. SMALL_SECTION WILL SHOW
            a. LOG_DATE -- as header
            b. LOG DETAILS (type, details, associated_client) -- as body
            c. MAYBE ALLOW LINKS TO THE SPECIFIC LOG DETAILS (EDIT PAGE)
    */
  };

  return (
    <div className={style.calendarLogs}>

      {/* HEADER SECTION */}
      <div className={style.headerContainer}>
        <h2 className={style.header}>Logs Calendar</h2>
      </div>

      {/* CALENDAR SECTION */}
      <FullCalendar 
        defaultView='dayGridMonth'
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        weekends={true}
        events={formData.length > 0 ? formData : []}
        dateClick={onDateClick}
      />

      {/* WILL BE MOVING TO THE DASHBOARD_SMALL_SECTION ? */}
      <div className={style.recentLogsContainer}>
        <div className={style.headerContainer}>
          <h2 className={style.header}>Recent Logs</h2>
        </div>
        {/* 
            * GOALS
            ** DISPLAY ALL RECENT LOGS FOR ALL CLIENTS SEPARATED BY LOG_DATE
            ** WILL NEED TO CREATE A NEW SET OF ARRAYS SEPARATED BY LOG_DATE
              -- IF LOG_DATES ARE SIMILAR, PUSH INTO THE SAME ARRAY
              -- WILL HAVE TO FIGURE OUT HOW TO DO THIS WITHOUT CREATING A MILLION ARRAYS
            ** DISPLAY THE 10 MOST RECENT LOGS (LOG_DATE)
         */}
        {
          logs.length > 0
            && logs.slice(0, 5).map(log => (
              <div key={log.id} className={style.recentLogs}>
                <h3>{log.type}</h3>
                <p>{log.details}</p>
                <p>{log.log_date}</p>
                <p>Associated Client: {log.associated_client}</p>
              </div>
            ))
        }
      </div>

    </div>
  )
};

// PROP TYPES 
CalendarLogs.propTypes = {
  getAllLogs: PropTypes.func.isRequired,
  addCalendarDateLog: PropTypes.func.isRequired,
  resetCalendarDateLogs: PropTypes.func.isRequired,
  setCalendarDate: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  logs: state.log.logs,
});

const mapDispatchToProps = (dispatch) => ({
  getAllLogs: () => dispatch(getAllLogs()),
  addCalendarDateLog: (log) => dispatch(addCalendarDateLog(log)),
  resetCalendarDateLogs: () => dispatch(resetCalendarDateLogs()),
  setCalendarDate: (logDate) => dispatch(setCalendarDate(logDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarLogs);