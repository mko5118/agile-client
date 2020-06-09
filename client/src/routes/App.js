import React, { } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

// APP PAGES
import Navbar from '../pages/navbar/Navbar';
import Footer from '../pages/footer/Footer';
import PrivateRoute from '../components/private-route/PrivateRoute';
import Alert from '../components/alert/Alert';

// NOT AUTHENTICATED PAGES
import HomePage from '../pages/home-page/HomePage';
import DeveloperPage from '../pages/developer-page/DeveloperPage';
import SigninPage from '../pages/signin-page/SigninPage';
import SignupPage from '../pages/signup-page/SignupPage';

// AUTHENTICATED PAGES
import DashboardPage from '../pages/dashboard-page/DashboardPage';
// import ClientsPage from '../components-dashboard-client/clients-page/ClientsPage';
// import ClientEdit from '../components-dashboard-client/client-edit/ClientEdit';
// import CompanyCreate from '../components-dashboard-company/company-create/CompanyCreate';
// import CompanyEdit from '../components-dashboard-company/company-edit/CompanyEdit';
// import LogCreate from '../components-dashboard-logs/log-create/LogCreate';
// import LogEdit from '../components-dashboard-logs/log-edit/LogEdit';
// import TaskPage from '../components-dashboard-tasks/task-page/TaskPage';
// import TaskItem from '../components-dashboard-tasks/task-item/TaskItem';

import style from './app.modules.scss';

// *************************** APP COMPONENT *************************** //
const App = () => {
  return (
    <Provider store={store}>

      <div className={style.app}>
        <BrowserRouter>

          <div className={style.content}>
            <Alert />
            <Navbar />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/developers' component={DeveloperPage} />
              <Route exact path='/signin' component={SigninPage} />
              <Route exact path='/signup' component={SignupPage} />
              {/* PRIVATE ROUTES */}
              <Route exact path='/dashboard' component={DashboardPage} />

              {/* <Route exact path='/dashboard/clients' component={ClientsPage} /> */}
              {/* <Route exact path='/dashboard/clients/:client_id' component={ClientEdit} /> */}

              {/* <Route exact path='/dashboard/clients/company-create/:client_id' component={CompanyCreate} />
              <Route exact path='/dashboard/clients/company/:company_id' component={CompanyEdit} /> */}

              {/* <Route exact path='/dashboard/clients/log-create/:client_id' component={LogCreate} /> */}
              {/* <Route exact path='/dashboard/clients/log/:log_id' component={LogEdit} /> */}

              {/* <Route exact path='/dashboard/tasks' component={TaskPage} /> */}
              {/* <Route exact path='/dashboard/tasks/:id' component={TaskItem} /> */}
            </Switch>
          </div>

          <Footer />

        </BrowserRouter>
      </div>
      
    </Provider>
  )
};

export default App;