import React, { } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

// APP PAGES
import Navbar from '../pages/navbar/Navbar';
import NavbarMobile from '../pages/navbar-mobile/NavbarMobile';
import Footer from '../pages/footer/Footer';
import PrivateRoute from '../components/private-route/PrivateRoute';
import Alert from '../components/alert/Alert';

// NOT AUTHENTICATED PAGES
import HomePage from '../pages/home-page/HomePage';
import SigninPage from '../pages/signin-page/SigninPage';
import SignupPage from '../pages/signup-page/SignupPage';
import PageNotFound from '../pages/404-page/PageNotFound';

// AUTHENTICATED PAGES
import DashboardPage from '../pages/dashboard-page/DashboardPage';

import style from './app.modules.scss';

// *************************** APP COMPONENT *************************** //
const App = () => {
  return (
    <Provider store={store}>

      <div className={style.app}>
        <BrowserRouter basename='/agile-client'>

          <div className={style.content}>
            <Alert />
            <Navbar />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/signin' component={SigninPage} />
              <Route exact path='/signup' component={SignupPage} />

              {/* PRIVATE ROUTES */}
              <PrivateRoute exact path='/dashboard' component={DashboardPage} />

              {/* 404 PAGE */}
              <Route component={PageNotFound} />

            </Switch>
          </div>

          <NavbarMobile />
          {/* <Footer /> */}

        </BrowserRouter>
      </div>
      
    </Provider>
  )
};

export default App;