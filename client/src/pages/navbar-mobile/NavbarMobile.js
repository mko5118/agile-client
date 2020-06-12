import React, { } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaTasks, FaRegCalendarAlt } from 'react-icons/fa';
import { MdPermContactCalendar } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { 
  toggleHomeMenu, toggleClientsMenu, toggleTasksMenu, toggleCalendarMenu, resetEditTask, 
} from '../../redux/dashboard/dashboard.actions';
import { resetClient } from '../../redux/clients/clients.actions';
import { resetCalendarDateLogs } from '../../redux/calendar/calendar.actions';
import { logoutUser } from '../../redux/auth/auth.actions';

import style from './navbar-mobile.module.scss';

// *************************** NAVBAR MOBILE COMPONENT *************************** //
const NavbarMobile = ({ isAuthenticated, toggleClientsMenu, toggleTasksMenu, toggleCalendarMenu, resetEditTask, resetClient, resetCalendarDateLogs, logoutUser }) => {
  const history = useHistory();

  const setClientsMenu = () => {
    toggleClientsMenu();
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
  
  const setTasksMenu = () => {
    toggleTasksMenu();
    resetClient();
    resetEditTask();
    resetCalendarDateLogs();
  };

  const onLogout = async () => {
    await logoutUser();
    history.push('/');
  };

  // If authenticated, render the dashboard navbar-mobile setup
  return (
    !isAuthenticated 
      ? <nav></nav>
      :
        <nav className={style.navbarMobile}>

          {/* MOBILE MENU */}
          <div className={style.content}>   

            {/* CLIENTS */}
            <div className={style.iconContainer} onClick={setClientsMenu}>
              <MdPermContactCalendar className={style.icon} aria-label='Open Clients Section' />
            </div>

            {/* CALENDAR */}
            <div className={style.iconContainer} onClick={setCalendarMenu}>
              <FaRegCalendarAlt className={style.icon} aria-label='Open Calendar Section' />
            </div>

            {/* TASKS */}
            <div className={style.iconContainer} onClick={setTasksMenu}>
              <FaTasks className={style.icon} aria-label='Open Tasks Section' />
            </div>

            {/* LOGOUT */}
            <div className={style.iconContainer}>
              <RiLogoutBoxRLine 
                className={style.icon}
                aria-label='Logout'
                onClick={onLogout} 
              />
            </div>

          </div>

        </nav>
  )
};

// PROP TYPES
NavbarMobile.propTypes = {
  toggleHomeMenu: PropTypes.func.isRequired,
  toggleClientsMenu: PropTypes.func.isRequired,
  toggleTasksMenu: PropTypes.func.isRequired,
  toggleCalendarMenu: PropTypes.func.isRequired,
  resetEditTask: PropTypes.func.isRequired,
  resetClient: PropTypes.func.isRequired,
  resetCalendarDateLogs: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  toggleHomeMenu: () => dispatch(toggleHomeMenu()),
  toggleClientsMenu: () => dispatch(toggleClientsMenu()),
  toggleTasksMenu: () => dispatch(toggleTasksMenu()),
  toggleCalendarMenu: () => dispatch(toggleCalendarMenu()),
  resetEditTask: () => dispatch(resetEditTask()),
  resetClient: () => dispatch(resetClient()),
  resetCalendarDateLogs: () => dispatch(resetCalendarDateLogs()),
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarMobile);