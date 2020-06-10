import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ClientPage from '../../components-dashboard-client/client-page/ClientPage';
import ClientCreate from '../../components-dashboard-client/client-create/ClientCreate';
import TaskPage from '../../components-dashboard-tasks/task-page/TaskPage';

import style from './dashboard-large-section.module.scss';

// *************************** DASHBOARD LARGE SECTION COMPONENT *************************** //
const DashboardLargeSection = ({ client, homeMenu, clientsMenu, tasksMenu, calendarMenu }) => {
  // 'client' object passed down as prop via 'DashboardPage.js'
  return (
    <div className={style.dashboardLargeSection}>

      <div className={style.largeInnerContainer}>
        { homeMenu.isActive && <h2>HOME SECTION</h2> }

        {/* If 'client' is NULL, render 'ClientCreate.js' component for User */}
        { 
          clientsMenu.isActive && 
          (client !== null ? <ClientPage client={client} /> : <ClientCreate />) 
        }

        { tasksMenu.isActive && <TaskPage /> }
        
        { calendarMenu.isActive && <h2>CALENDAR SECTION</h2> }
      </div>

    </div>
  )
};

// PROP TYPES
DashboardLargeSection.propTypes = {
  client: PropTypes.object,
};

// REDUX
const mapStateToProps = (state) => ({
  homeMenu: state.dashboard.homeMenu,
  clientsMenu: state.dashboard.clientsMenu,
  tasksMenu: state.dashboard.tasksMenu,
  calendarMenu: state.dashboard.calendarMenu,
});

export default connect(mapStateToProps)(DashboardLargeSection);