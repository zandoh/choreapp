import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Dashboard from "../Dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;