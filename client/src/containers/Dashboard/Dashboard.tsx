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
import { RandomNumberById } from "../../services/random";
import { useQuery } from "@apollo/react-hooks";

const Dashboard: React.FC = () => {
	const { loading, data } = useQuery(RandomNumberById, {
		variables: { id: "abc123" }
	});
	console.log("loading ", loading);
	console.log("data ", data);
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
					<p>
						{loading}
						{data}
					</p>
				</BodyLayout>
			</DashboardLayout>
		</Router>
	);
};

export default Dashboard;
