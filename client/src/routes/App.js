import React, { } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

// APP PAGES
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import PrivateRoute from '../components/private-route/PrivateRoute';

// NOT AUTHENTICATED PAGES
import HomePage from '../pages/unauthenticated/home-page/HomePage';
import SigninPage from '../pages/unauthenticated/signin-page/SigninPage';
import SignupPage from '../pages/unauthenticated/signup-page/SignupPage';

// AUTHENTICATED PAGES
import DashboardPage from '../pages/authenticated/dashboard-page/DashboardPage';
import TaskPage from '../pages/authenticated/task-page/TaskPage';
import TaskItem from '../components-auth/tasks-page/TaskItem/TaskItem';

import style from './app.modules.scss';

// *************************** APP COMPONENT *************************** //
const App = () => {
  return (
    <Provider store={store}>

      <div className={style.app}>
        <BrowserRouter>

          <div className={style.content}>
            <Navbar />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/signin' component={SigninPage} />
              <Route exact path='/signup' component={SignupPage} />
              {/* PRIVATE ROUTES */}
              <Route exact path='/dashboard' component={DashboardPage} />
              <Route exact path='/dashboard/tasks' component={TaskPage} />
              <Route exact path='/dashboard/tasks/:id' component={TaskItem} />
            </Switch>
          </div>
          <Footer />

        </BrowserRouter>
      </div>
      
    </Provider>
  )
};

export default App;