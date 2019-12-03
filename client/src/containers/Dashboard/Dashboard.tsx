import React from "react";
import {
  DashboardLayout,
  HeaderLayout,
  SidebarLayout,
  BodyLayout
} from "./styled";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <HeaderLayout>
        <Header />
      </HeaderLayout>
      <SidebarLayout>
        <Sidebar />
      </SidebarLayout>
      <BodyLayout>Body</BodyLayout>
    </DashboardLayout>
  );
};

export default Dashboard;
