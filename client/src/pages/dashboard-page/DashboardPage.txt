import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAllClients } from '../../redux/clients/clients.actions';

import DashboardMenuSection from '../../components-dashboard/dashboard-menu-section/DashboardMenuSection';
import DashboardSmallSection from '../../components-dashboard/dashboard-small-section/DashboardSmallSection';
import DashboardLargeSection from '../../components-dashboard/dashboard-large-section/DashboardLargeSection';

import style from './dashboard-page.module.scss';

// *************************** DASHBOARD TEST PAGE COMPONENT *************************** //
const DashboardPage = ({ clients, client, loading, getAllClients }) => {
  useEffect(() => {
    getAllClients();
  }, []);

  return (
    <div className={style.dashboardPage}>

      <DashboardMenuSection />
      <DashboardSmallSection clients={clients} />
      <DashboardLargeSection client={client} />

    </div>
  )
};

// PROP TYPES
DashboardPage.propTypes = {
  clients: PropTypes.array,
  client: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getAllClients: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  clients: state.clients.clients,
  client: state.clients.client,
  loading: state.clients.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClients: () => dispatch(getAllClients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);