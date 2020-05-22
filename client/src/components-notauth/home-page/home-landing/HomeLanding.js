import React, { } from 'react';
import { NavLink } from 'react-router-dom';

import style from './home-landing.module.scss';

// *************************** HOME LANDING COMPONENT *************************** //
const HomeLanding = () => {
  return (
    <section className={style.homeLanding}>

      <div className={style.landingContainer}>
        <div className={style.textContainer}>
          <h1 className={style.title}>Meet People.</h1>
          <h1 className={style.titleTwo}>Make Clients.</h1>
          <h3 className={style.subtitle}>The Power to Stay Connected</h3>

          <div className={style.buttonContainer}>
            <NavLink to='/' className={style.link}>
              <button className={style.button}>Features</button>
            </NavLink>
            <NavLink to='/signup' className={style.link}>
              <button className={style.button}>Join Now</button>
            </NavLink>
          </div>
        </div>

        <div className={style.imageContainer} />
      </div>

    </section>
  )
};

export default HomeLanding;