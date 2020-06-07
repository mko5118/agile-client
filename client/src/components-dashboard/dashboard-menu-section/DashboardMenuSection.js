import React, { } from 'react';
import { connect } from 'react-redux';
import { IoIosContacts } from 'react-icons/io';
import { FaHome, FaTasks, FaRegCalendarAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { 
  toggleHomeMenu, toggleClientsMenu, toggleTasksMenu, toggleCalendarMenu 
} from '../../redux/dashboard/dashboard.actions';
import { resetClient } from '../../redux/clients/clients.actions';

import style from './dashboard-menu-section.module.scss';

// *************************** DASHBOARD MENU SECTION COMPONENT *************************** //
const DashboardMenuSection = ({ homeMenu, clientsMenu, tasksMenu, calendarMenu, toggleHomeMenu, toggleClientsMenu, toggleTasksMenu, toggleCalendarMenu, resetClient }) =>  {

  const setHomeMenu = () => {
    toggleHomeMenu();
    resetClient();
  };

  const setClientsMenu = () => {
    toggleClientsMenu();
  };

  const setTasksMenu = () => {
    toggleTasksMenu();
    resetClient();
  };

  const setCalendarMenu = () => {
    toggleCalendarMenu();
    resetClient();
  };

  return (
    <div className={style.dashboardMenuSection}>

      <div className={style.navigationInnerContainer}>
        <h1 className={style.navigationTitle}>MENU</h1>

        <div className={style.navigationMenu}>

          <div className={style.iconContainer} id={homeMenu.isActive ? style.isActiveContainer : ''} onClick={setHomeMenu}>
            <FaHome className={style.icon} id={homeMenu.isActive ? style.isActiveIcon : ''} />
            <span className={style.iconText} id={homeMenu.isActive ? style.isActiveText : ''}>Home</span>
          </div>

          <div className={style.iconContainer} id={clientsMenu.isActive ? style.isActiveContainer : ''} onClick={setClientsMenu}>
            <IoIosContacts className={style.icon} id={clientsMenu.isActive ? style.isActiveIcon : ''} />
            <span className={style.iconText} id={clientsMenu.isActive ? style.isActiveText : ''}>Clients</span>
          </div>

          <div className={style.iconContainer} id={tasksMenu.isActive ? style.isActiveContainer : ''} onClick={setTasksMenu}>
            <FaTasks className={style.icon} id={tasksMenu.isActive ? style.isActiveIcon : ''} />
            <span className={style.iconText} id={tasksMenu.isActive ? style.isActiveText : ''}>Todos</span>
          </div>

          <div className={style.iconContainer} id={calendarMenu.isActive ? style.isActiveContainer : ''} onClick={setCalendarMenu}>
            <FaRegCalendarAlt className={style.icon} id={calendarMenu.isActive ? style.isActiveIcon : ''} />
            <span className={style.iconText} id={calendarMenu.isActive ? style.isActiveText : ''}>Calendar</span>
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
  resetClient: PropTypes.func.isRequired,
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
  resetClient: () => dispatch(resetClient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMenuSection);