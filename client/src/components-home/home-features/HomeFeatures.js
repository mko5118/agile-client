import React, { } from 'react';

import style from './home-features.module.scss';

// *************************** HOME SUMMARY COMPONENT *************************** //
const HomeFeatures = () => {
  return (
    <section className={style.homeFeatures}>

      {/* HEADER CONTAINER */}
      <div className={style.headerContainer}>
        <h2 className={style.header}>Header Title for Features Section</h2>
      </div>
      
      {/* SUMMARY CONTAINER */}
      <div className={style.featuresContainer}>
        <div className={style.feature}>
          <h3 className={style.featureHeader}>Client Feature</h3>
          <p className={style.featureText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className={style.feature}>
          <h3 className={style.featureHeader}>Todo Feature</h3>
          <p className={style.featureText}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className={style.feature}>
          <h3 className={style.featureHeader}>Calendar Feature</h3>
          <p className={style.featureText}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>

    </section>
  )
};

export default HomeFeatures;