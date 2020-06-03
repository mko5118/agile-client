import React, { } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/auth/auth.actions';

import style from './navbar.module.scss';

// *************************** NAVBAR PAGE COMPONENT *************************** //
const Navbar = ({ auth, logoutUser }) => {
  const { isAuthenticated, user } = auth;
  const history = useHistory()

  const onLogout = () => {
    logoutUser();
    history.push('/');
  };

  const notAuthLinks = (
    <ul className={style.notAuthLinks}>
      <li>
        <NavLink to='/dashboard' className={style.notAuthLink}>Dashboard</NavLink>
      </li>

      {/* DELETE THIS WHEN NO LONGER NEEDED */}
      <li>
        <NavLink to='/dashboard-test-page' className={style.notAuthLink}>Dashboard Test</NavLink>
      </li>

      <li>
        <NavLink to='/' className={style.notAuthLink}>Features</NavLink>
      </li>
      <li>
        <NavLink to='/developers' className={style.notAuthLink}>Developers</NavLink>
      </li>
      <li>
        <NavLink to='/signup' className={style.notAuthLink}>Sign Up</NavLink>
      </li>
      <li>
        <NavLink to='/signin' className={style.notAuthLink}>Sign In</NavLink>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className={style.authLinks}>
      <li>
        <NavLink to='/dashboard' className={style.authLink}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/tasks' className={style.authLink}>Tasks</NavLink>
      </li>
      <li>
        <span className={style.logoutButton} onClick={onLogout}>Logout</span>
      </li>
    </ul>
  );

  return (
    <nav className={style.navbar}>

      <div className={style.logoContainer}>
        <NavLink to='/' className={style.logo}>AgileClient</NavLink>
      </div>

      {
        isAuthenticated ? authLinks : notAuthLinks
      }
    </nav>
  )
};

// REDUX
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);