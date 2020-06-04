import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ClientList from '../../components-dashboard-client/client-list/ClientList';

import style from './dashboard-small-section.module.scss';

// *************************** DASHBOARD SMALL SECTION COMPONENT *************************** //
const DashboardSmallSection = ({ clients, homeMenu, clientsMenu, tasksMenu, calendarMenu }) => {
  // 'clients' array passed down as prop via 'DashboardPage.js'
  return (
    <div className={style.dashboardSmallSection}>

      <div className={style.smallInnerContainer}>
        { (!clientsMenu.isActive && !tasksMenu.isActive && !calendarMenu.isActive && homeMenu.isActive) && <h2>HOME SECTION</h2> }
        { clientsMenu.isActive && <ClientList clients={clients} />}
        { tasksMenu.isActive && <h2>TODOS SECTION</h2> }
        { calendarMenu.isActive && <h2>CALENDAR SECTION</h2> }
      </div>

    </div>
  )
};

// PROP TYPES
DashboardSmallSection.propTypes = {
  clients: PropTypes.array,
  homeMenu: PropTypes.object.isRequired,
  clientsMenu: PropTypes.object.isRequired,
  tasksMenu: PropTypes.object.isRequired,
  calendarMenu: PropTypes.object.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  homeMenu: state.dashboard.homeMenu,
  clientsMenu: state.dashboard.clientsMenu,
  tasksMenu: state.dashboard.tasksMenu,
  calendarMenu: state.dashboard.calendarMenu,
});

export default connect(mapStateToProps)(DashboardSmallSection);