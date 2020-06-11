import React, { } from 'react';
import { FaTasks, FaRegCalendarAlt } from 'react-icons/fa';
import { MdPermContactCalendar } from 'react-icons/md';

import style from './home-features.module.scss';

// *************************** HOME SUMMARY COMPONENT *************************** //
const HomeFeatures = () => {
  return (
    <section className={style.homeFeatures}>

      {/* HEADER CONTAINER */}
      <div className={style.headerOuterContainer}>
        <div className={style.headerContainer}>
          <h2 className={style.header}>Designed for the business and individual alike.</h2>
          <p className={style.subHeader}>
            Connect to the information you need with speed and flexibilty.
          </p>
        </div>
      </div>
      
      {/* SUMMARY CONTAINER */}
      <div className={style.featuresOuterContainer}>
        <div className={style.featuresContainer}>
          {/* FEATURE - CLIENT LIST */}
          <div className={style.feature}>
            <div className={style.iconContainer}>
              <MdPermContactCalendar className={style.icon} />
            </div>
            <h3 className={style.featureHeader}>Client List</h3>
            <p className={style.featureText}>
              An all-in-one client list. Keep track of client details, information on their company and keep a log of any past meetings or meetups!
            </p>
          </div>
          {/* FEATURE - CALENDAR INTEGRATION */}
          <div className={style.feature}>
            <div className={style.iconContainer}>
              <FaRegCalendarAlt className={style.icon} />
            </div>
            <h3 className={style.featureHeader}>Calendar Integration</h3>
            <p className={style.featureText}>
              A detailed month-to-month tracker of any past logs or meetings with your clients.
            </p>
          </div>
          {/* FEATURE - TASK MANAGER */}
          <div className={style.feature}>
            <div className={style.iconContainer}>
              <FaTasks className={style.icon} />
            </div>
            <h3 className={style.featureHeader}>Task Manager</h3>
            <p className={style.featureText}>
              A powerful task manager allowing you to stay on top of your business.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
};

export default HomeFeatures;