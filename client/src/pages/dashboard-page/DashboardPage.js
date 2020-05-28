import React, { useState } from 'react';
import { IoIosContacts } from 'react-icons/io';
import { FaHome, FaTasks } from 'react-icons/fa';

import ContactsPage from '../../components-dashboard-client/clients-page/ClientsPage';
import TaskPage from '../../components-dashboard-tasks/task-page/TaskPage';

import style from './dashboard-page.module.scss';

// *************************** DASHBOARD PAGE COMPONENT *************************** //
const DashboardPage = () => {
  const [ currentSection, setCurrentSection ] = useState({
    'home': false,
    'contacts': false,
    'todos': false,
  });

  const iconClickHome = () => {
    setCurrentSection({ 'home': true, 'contacts': false, 'todos': false });
  };

  const iconClickContacts = () => {
    setCurrentSection({ 'home': false, 'contacts': true, 'todos': false });
  };

  const iconClickTodos = () => {
    setCurrentSection({ 'home': false, 'contacts': false, 'todos': true });
  }

  return (
    <div className={style.dashboardPage}>
      
      <div className={style.navbarContainer}>
        <div className={style.navbar}>
          <div className={style.iconContainer} onClick={iconClickHome}>
            <FaHome className={style.icon} />
            <span className={style.iconText} id='home'>Home</span>
          </div>
          <div className={style.iconContainer} onClick={iconClickContacts}>
            <IoIosContacts className={style.icon} />
            <span className={style.iconText} id='contacts'>Contacts</span>
          </div>
          <div className={style.iconContainer} onClick={iconClickTodos}>
            <FaTasks className={style.icon} />
            <span className={style.iconText} id='todos'>Todos</span>
          </div>
        </div>
      </div>

      <div className={style.smallContainer}>
        {
          (!currentSection.contacts && !currentSection.todos) && <h2>HOME SECTION SMALL</h2>
        }
        {
          currentSection.contacts && <ContactsPage />
        }
        {
          currentSection.todos && <TaskPage />
        }
      </div>

      <div className={style.largeContainer}>
        {
          (!currentSection.contacts && !currentSection.todos) && <h1>HOME SECTION LARGE</h1>
        }
        {
          currentSection.contacts && <ContactsPage />
        }
        {
          currentSection.todos && <TaskPage />
        }
      </div>

    </div>
  )
};

export default DashboardPage;