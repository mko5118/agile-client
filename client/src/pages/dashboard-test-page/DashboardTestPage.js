import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosContacts } from 'react-icons/io';
import { FaHome, FaTasks, FaRegCalendarAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAllClients, getAClient } from '../../redux/clients/clients.actions';

import style from './dashboard-testpage.module.scss';

// *************************** DASHBOARD TEST PAGE COMPONENT *************************** //
const DashboardTestPage = ({ clients, client, loading, getAllClients, getAClient }) => {
  useEffect(() => {
    getAllClients();
  }, []);

  // Sorting function to sort clients list by last_name
  clients.sort(function(a,b) {
    if (a.last_name[0] < b.last_name[0]) { return -1 }
    if (a.last_name[0] > b.last_name[0]) { return 1 }
    return 0
  });
  // console.log(clients);

  // const clientsOrderedByLastName = (
  //   clients.map(client => (
  //     <div key={client.id}>
  //       <Link to={`/dashboard/clients/${client.id}`}>
  //         <h3>{client.first_name} {client.last_name}</h3>
  //       </Link>
  //     </div>
  //   ))
  // );

  const [ toggleHome, setToggleHome ] = useState({ 'home': true, isActive: true });
  const [ toggleContacts, setToggleContacts ] = useState({ 'contacts': false, isActive: false });
  const [ toggleTodos, setToggleTodos ] = useState({ 'todos': false, isActive: false });
  const [ toggleCalendar, setToggleCalendar ] = useState({ 'calendar': false, isActive: false });

  const onClickHome = () => {
    setToggleHome({ 'home': true, isActive: true });
    setToggleContacts({ 'contacts': false, isActive: false });
    setToggleTodos({ 'todos': false, isActive: false });
    setToggleCalendar({ 'calendar': false, isActive: false });
  };

  const onClickContacts = () => {
    setToggleHome({ 'home': false, isActive: false });
    setToggleContacts({ 'contacts': true, isActive: true });
    setToggleTodos({ 'todos': false, isActive: false });
    setToggleCalendar({ 'calendar': false, isActive: false });
  };

  const onClickTodos = () => {
    setToggleHome({ 'home': false, isActive: false });
    setToggleContacts({ 'contacts': false, isActive: false });
    setToggleTodos({ 'todos': true, isActive: true });
    setToggleCalendar({ 'calendar': false, isActive: false });
  };

  const onClickCalendar = () => {
    setToggleHome({ 'home': false, isActive: false });
    setToggleContacts({ 'contacts': false, isActive: false });
    setToggleTodos({ 'todos': false, isActive: false });
    setToggleCalendar({ 'calendar': true, isActive: true });
  };

  return (
    <div className={style.dashboardTestPage}>
      
      {/* NAVIGATION SECTION */}
      <div className={style.navigationContainer}>
        
        <div className={style.navigationInnerContainer}>
          <h1 className={style.navigationTitle}>MENU</h1>

          <div className={style.navigationMenu}>
            <div className={style.iconContainer} id={toggleHome.isActive ? style.isActiveContainer : ''} onClick={onClickHome}>
              <FaHome className={style.icon} id={toggleHome.isActive ? style.isActiveIcon : ''} />
              <span className={style.iconText} id={toggleHome.isActive ? style.isActiveText : ''}>Home</span>
            </div>
            <div className={style.iconContainer} id={toggleContacts.isActive ? style.isActiveContainer : ''} onClick={onClickContacts}>
              <IoIosContacts className={style.icon} id={toggleContacts.isActive ? style.isActiveIcon : ''} />
              <span className={style.iconText} id={toggleContacts.isActive ? style.isActiveText : ''}>Contacts</span>
            </div>
            <div className={style.iconContainer} id={toggleTodos.isActive ? style.isActiveContainer : ''} onClick={onClickTodos}>
              <FaTasks className={style.icon} id={toggleTodos.isActive ? style.isActiveIcon : ''} />
              <span className={style.iconText} id={toggleTodos.isActive ? style.isActiveText : ''}>Todos</span>
            </div>
            <div className={style.iconContainer} id={toggleCalendar.isActive ? style.isActiveContainer : ''} onClick={onClickCalendar}>
              <FaRegCalendarAlt className={style.icon} id={toggleCalendar.isActive ? style.isActiveIcon : ''} />
              <span className={style.iconText} id={toggleCalendar.isActive ? style.isActiveText : ''}>Calendar</span>
            </div>
          </div>
        </div>

      </div>

      {/* SMALL SECTION */}
      <div className={style.smallContainer}>
        
        <div className={style.smallInnerContainer}>
          { (!toggleContacts.isActive && !toggleTodos.isActive && !toggleCalendar.isActive) && <h2>HOME SECTION</h2> }
          { toggleContacts.isActive && <h2>CONTACTS SECTION</h2> }
          { toggleTodos.isActive && <h2>TODOS SECTION</h2> }
          { toggleCalendar.isActive && <h2>CALENDAR SECTION</h2> }
        </div>

      </div>

      {/* LARGE SECTION */}
      <div className={style.largeContainer}>
        
        <div className={style.largeInnerContainer}>
          { (!toggleContacts.isActive && !toggleTodos.isActive && !toggleCalendar.isActive) && <h2>HOME SECTION</h2> }
          { toggleContacts.isActive && <h2>CONTACTS SECTION</h2> }
          { toggleTodos.isActive && <h2>TODOS SECTION</h2> }
          { toggleCalendar.isActive && <h2>CALENDAR SECTION</h2> }
        </div>

      </div>

    </div>
  )
};

// PROP TYPES
DashboardTestPage.propTypes = {
  clients: PropTypes.array,
  client: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  getAllClients: PropTypes.func.isRequired,
  getAClient: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  clients: state.clients.clients,
  client: state.clients.client,
  loading: state.clients.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClients: () => dispatch(getAllClients()),
  getAClient: (id) => dispatch(getAClient(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTestPage);