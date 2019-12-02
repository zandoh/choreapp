import React, { Fragment } from "react";
import { CognitoService } from "../../services/cognito";

const Dashboard: React.FC = () => {
  return (
    <Fragment>
      <h1>Welcome to Dashboard</h1>
      <button onClick={() => CognitoService.logout()}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
