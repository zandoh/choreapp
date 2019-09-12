import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Dashboard from "../Dashboard/Dashboard";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
