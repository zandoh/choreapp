import React from "react";
import { CognitoService } from "../../services/cognito";
import {
  DashboardWrapper,
  HeaderWrapper,
  SidebarWrapper,
  BodyWrapper
} from "./styled";

const Dashboard: React.FC = () => {
  return (
    <DashboardWrapper>
      <HeaderWrapper>
        <h1>Header</h1>
        <button onClick={() => CognitoService.logout()}>Logout</button>
      </HeaderWrapper>
      <SidebarWrapper>Sidebar</SidebarWrapper>
      <BodyWrapper>Body</BodyWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
