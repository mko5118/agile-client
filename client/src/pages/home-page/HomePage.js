import React, { } from 'react';

import HomeLanding from '../../components-home/home-landing/HomeLanding';

import style from './home-page.module.scss';

// *************************** HOME PAGE COMPONENT *************************** //
const HomePage = () => {
  return (
    <div className={style.homePage} test-attr='component-homepage'>
      
      <HomeLanding />

    </div>
  )
};

export default HomePage;