import React from "react";
import { CognitoService } from "../../services/cognito";
import { HeaderWrapper } from "./styled";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <h1>Header</h1>
      <button onClick={() => CognitoService.logout()}>Logout</button>
    </HeaderWrapper>
  );
};

export default Header;
