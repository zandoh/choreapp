import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Dashboard from '../Dashboard/Dashboard';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import {routes} from '../../util';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from={routes.ROOT} to={routes.DASHBOARD} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
        <ProtectedRoute path={routes.DASHBOARD} component={Dashboard} />
        <ProtectedRoute path={routes.REPORTS} component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
