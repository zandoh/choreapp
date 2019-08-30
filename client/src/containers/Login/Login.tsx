import React from "react";
// import { useDispatch } from "react-redux";
// import { AppState } from "../../store/store";
// import { USER_UPDATE } from "../../store/user/types";
import { CognitoService } from "../../services/cognito";

const Login: React.FC = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state: AppState) => state.user);

  const handleLogin = () => {
    // dispatch({
    //   type: USER_UPDATE,
    //   payload: {
    //     username: "this_is_a_username"
    //   }
    // });
    CognitoService.login("test-user", "Test@12345");
  };

  return (
    <div className="Login">
      Login Page! <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
