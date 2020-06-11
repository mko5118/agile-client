import React, { } from 'react';
import { connect } from 'react-redux';
import { IoIosContacts } from 'react-icons/io';
import { FaHome, FaTasks, FaRegCalendarAlt } from 'react-icons/fa';
import { MdPermContactCalendar } from 'react-icons/md';
import PropTypes from 'prop-types';

import { 
  toggleHomeMenu, toggleClientsMenu, toggleTasksMenu, toggleCalendarMenu, resetEditTask, 
} from '../../redux/dashboard/dashboard.actions';
import { resetClient } from '../../redux/clients/clients.actions';
import { resetCalendarDateLogs } from '../../redux/calendar/calendar.actions';

import style from './dashboard-menu-section.module.scss';

// *************************** DASHBOARD MENU SECTION COMPONENT *************************** //
const DashboardMenuSection = ({ homeMenu, clientsMenu, tasksMenu, calendarMenu, toggleHomeMenu, toggleClientsMenu, toggleTasksMenu, toggleCalendarMenu, resetEditTask, resetClient, resetCalendarDateLogs, }) =>  {

  // const setHomeMenu = () => {
  //   toggleHomeMenu();
  //   resetClient();
  //   resetEditTask();
  //   resetCalendarDateLogs();
  // };

  const setClientsMenu = () => {
    toggleClientsMenu();
    resetClient();
    resetEditTask();
    resetCalendarDateLogs();
  };

  const setTasksMenu = () => {
    toggleTasksMenu();
    resetClient();
    resetEditTask();
    resetCalendarDateLogs();
  };

  const setCalendarMenu = () => {
    toggleCalendarMenu();
    resetClient();
    resetEditTask();
    resetCalendarDateLogs();
  };

  return (
    <div className={style.dashboardMenuSection}>

      <div className={style.navigationInnerContainer}>
        <h1 className={style.navigationTitle}>MENU</h1>

        <div className={style.navigationMenu}>
          {/* CLIENTS SECTION */}
          <div className={style.iconContainer} id={clientsMenu.isActive ? style.isActiveContainer : ''} onClick={setClientsMenu}>
            <MdPermContactCalendar className={style.icon} id={clientsMenu.isActive ? style.isActiveIcon : ''} />
            <span className={style.iconText} id={clientsMenu.isActive ? style.isActiveText : ''}>Clients</span>
          </div>
          {/* CALENDAR SECTION */}
          <div className={style.iconContainer} id={calendarMenu.isActive ? style.isActiveContainer : ''} onClick={setCalendarMenu}>
            <FaRegCalendarAlt className={style.icon} id={calendarMenu.isActive ? style.isActiveIcon : ''} />
            <span className={style.iconText} id={calendarMenu.isActive ? style.isActiveText : ''}>Calendar</span>
          </div>
          {/* TASKS SECTION */}
          <div className={style.iconContainer} id={tasksMenu.isActive ? style.isActiveContainer : ''} onClick={setTasksMenu}>
            <FaTasks className={style.icon} id={tasksMenu.isActive ? style.isActiveIcon : ''} />
            <span className={style.iconText} id={tasksMenu.isActive ? style.isActiveText : ''}>Tasks</span>
          </div>

        </div>
      </div>

    </div>
  )
};

// PROP TYPES
DashboardMenuSection.propTypes = {
  homeMenu: PropTypes.object.isRequired,
  clientsMenu: PropTypes.object.isRequired,
  tasksMenu: PropTypes.object.isRequired,
  calendarMenu: PropTypes.object.isRequired,
  toggleHomeMenu: PropTypes.func.isRequired,
  toggleClientsMenu: PropTypes.func.isRequired,
  toggleTasksMenu: PropTypes.func.isRequired,
  toggleCalendarMenu: PropTypes.func.isRequired,
  resetEditTask: PropTypes.func.isRequired,
  resetClient: PropTypes.func.isRequired,
  resetCalendarDateLogs: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  homeMenu: state.dashboard.homeMenu,
  clientsMenu: state.dashboard.clientsMenu,
  tasksMenu: state.dashboard.tasksMenu,
  calendarMenu: state.dashboard.calendarMenu,
});

const mapDispatchToProps = (dispatch) => ({
  toggleHomeMenu: () => dispatch(toggleHomeMenu()),
  toggleClientsMenu: () => dispatch(toggleClientsMenu()),
  toggleTasksMenu: () => dispatch(toggleTasksMenu()),
  toggleCalendarMenu: () => dispatch(toggleCalendarMenu()),
  resetEditTask: () => dispatch(resetEditTask()),
  resetClient: () => dispatch(resetClient()),
  resetCalendarDateLogs: () => dispatch(resetCalendarDateLogs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenuSection);