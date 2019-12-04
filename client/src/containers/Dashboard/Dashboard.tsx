import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  DashboardLayout,
  HeaderLayout,
  SidebarLayout,
  BodyLayout
} from "./styled";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Board from "../../components/Board/Board";
import Reports from "../../components/Reports/Reports";
import { routes } from "../../util";

const Dashboard: React.FC = () => {
  return (
    <Router>
      <DashboardLayout>
        <HeaderLayout>
          <Header />
        </HeaderLayout>
        <SidebarLayout>
          <Sidebar />
        </SidebarLayout>
        <BodyLayout>
          <Switch>
            <ProtectedRoute path={routes.REPORTS} component={Reports} />
            <ProtectedRoute path={routes.DASHBOARD} component={Board} />
          </Switch>
        </BodyLayout>
      </DashboardLayout>
    </Router>
  );
};

export default Dashboard;
