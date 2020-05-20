import React, { } from 'react';
import { NavLink } from 'react-router-dom';

import style from './navbar.module.scss';

// *************************** NAVBAR PAGE COMPONENT *************************** //
const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  )
};

export default Navbar;