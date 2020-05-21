import React, { } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

// APP PAGES
import Navbar from '../components/navbar/Navbar';

// NOT AUTHENTICATED PAGES
import HomePage from '../pages/unauthenticated/home-page/HomePage';
import SigninPage from '../pages/unauthenticated/signin-page/SigninPage';
import SignupPage from '../pages/unauthenticated/signup-page/SignupPage';

// AUTHENTICATED PAGES
import TaskPage from '../pages/authenticated/task-page/TaskPage';

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
              {/* NOT AUTHENTICATED ROUTES */}
              <Route exact path='/' component={HomePage} />
              <Route exact path='/signin' component={SigninPage} />
              <Route exact path='/signup' component={SignupPage} />
              {/* AUTHENTICATED ROUTES */}
              <Route exact path='/tasks' component={TaskPage} />
            </Switch>
          </div>

        </BrowserRouter>
      </div>
      
    </Provider>
  )
};

export default App;