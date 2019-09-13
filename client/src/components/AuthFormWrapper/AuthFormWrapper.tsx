import React from "react";
import styled from "@emotion/styled";
import AppLogo from "../../assets/logo.png";

interface AuthFormWrapperProps {
  children?: JSX.Element;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = (
  props: AuthFormWrapperProps
) => {
  return (
    <LoginWrapper>
      <FormWrapper>
        <LogoWrapper>
          <img src={AppLogo} alt="Application Logo" />
        </LogoWrapper>
        {props.children}
      </FormWrapper>
    </LoginWrapper>
  );
};

export default AuthFormWrapper;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme["colors"]["brand"]["gradient"]};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme["space"]["8"]};
  img {
    display: block;
    max-width: 150px;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  background: ${props => props.theme["colors"]["white"]};
  border-radius: 8px;
`;
