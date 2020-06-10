import React, { } from 'react';

import HomeLanding from '../../components-home/home-landing/HomeLanding';
import HomeFeatures from '../../components-home/home-features/HomeFeatures';

import style from './home-page.module.scss';

// *************************** HOME PAGE COMPONENT *************************** //
const HomePage = () => {
  return (
    <div className={style.homePage} test-attr='component-homepage'>
      
      <HomeLanding />
      <HomeFeatures />

    </div>
  )
};

export default HomePage;