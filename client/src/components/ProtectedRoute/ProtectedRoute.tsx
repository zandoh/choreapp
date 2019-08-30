// import React from "react";
// import { RouteProps } from "react-router-dom";

// export interface ProtectedRouteProps extends RouteProps {
//   isAuthenticated: boolean;
//   authenticationPath: string;
// }

// export class ProtectedRoute extends Route<ProtectedRouteProps> {
//     public render() {
// let redirectPath: string = '';
// if (!this.props.isAuthenticated) {
//     redirectPath = this.props.authenticationPath;
// }

// if (redirectPath) {
//     const renderComponent = () => (<Redirect to={{pathname: redirectPath}}/>);
//     return <Route {...this.props} component={renderComponent} render={undefined}/>;
// } else {
//     return <Route {...this.props}/>;
// }
//     }
// }

// const ProtectedRoute: React.FC = ({ component, ...rest }: any) => {
// need to go see if the user is logged in
// if the user is logged render intended component
// if the user is not logged in redirect user to login page with reference to where they are trying to go
//
// let redirectPath: string = "";
// if (!this.props.isAuthenticated) {
//   redirectPath = this.props.authenticationPath;
// }
// if (redirectPath) {
//   const renderComponent = () => (
//     <Redirect
//       to={{
//         pathname: redirectPath
//       }}
//     />
//   );
//   return <Route {...rest} component={renderComponent} render={undefined} />;
// } else {
//   return <Route {...rest} />;
// }
// };

// export default ProtectedRoute;
