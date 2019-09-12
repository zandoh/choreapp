import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AppState } from "../../store/store";
import { useSelector } from "react-redux";

const ProtectedRoute: React.FC<RouteProps> = ({
  component,
  ...props
}: RouteProps) => {
  const { jwt } = useSelector((state: AppState) => state.user);

  if (!!!jwt) {
    return <Route {...props} component={() => <Redirect to={"/login"} />} />;
  } else {
    return <Route {...props} component={component} />;
  }
};

export default ProtectedRoute;
