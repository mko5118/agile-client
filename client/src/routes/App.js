import React, { } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// APP PAGES
import Navbar from '../pages/navbar/Navbar';
import HomePage from '../pages/unauthenticated/home-page/HomePage';
import LoginPage from '../pages/unauthenticated/login-page/LoginPage';

import style from './app.modules.scss';

// *************************** APP COMPONENT *************************** //
const App = () => {
  return (
    <div className={style.app}>
      <BrowserRouter>

        <div className={style.content}>
          <Navbar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={LoginPage} />
          </Switch>
        </div>

      </BrowserRouter>
    </div>
  )
};

export default App;