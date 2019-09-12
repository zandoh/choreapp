import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { CognitoService } from "../../services/cognito";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "@emotion/styled";
import {
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/core";
import { isObjectEmpty } from "../../util";
import { Redirect } from "react-router-dom";
import AppLogo from "../../assets/logo.png";

interface FormErrors {
  email?: string;
  password?: string;
  passwordMismatch?: string;
}

const Login: React.FC = () => {
  const [errors, setErrors] = useState({});
  const { needsNewPassword, jwt, errorMessage, loginFailed } = useSelector(
    (state: AppState) => state.user
  );

  if (!!jwt && isObjectEmpty(errors)) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LoginWrapper>
      <FormWrapper>
        <LogoWrapper>
          <img src={AppLogo} alt="Application Logo" />
        </LogoWrapper>
        <Formik
          initialValues={{
            email: "",
            password: "",
            newPassword: "",
            newPasswordConfirm: ""
          }}
          validate={values => {
            let errors: FormErrors = {};

            if (!values.email) {
              errors.email = "Required";
            }
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            if (
              needsNewPassword &&
              values.newPassword !== values.newPasswordConfirm
            ) {
              errors.passwordMismatch = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { email, password, newPassword } = values;

            if (needsNewPassword) {
              CognitoService.setNewPassword(newPassword);
            } else {
              CognitoService.login(email, password);
            }

            setSubmitting(false);
          }}
        >
          {({ errors, isSubmitting }) => {
            setErrors(errors);

            return (
              <StyledForm>
                <StyledErrorMessage name="email" component="div" />
                <StyledField type="email" name="email" placeholder="Email" />
                <StyledErrorMessage name="password" component="div" />
                <StyledField
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <div hidden={!needsNewPassword}>
                  <StyledErrorMessage name="passwordMismatch" component="div" />
                  <StyledField
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                  />
                  <StyledField
                    type="password"
                    name="newPasswordConfirm"
                    placeholder="New password confirmation"
                  />
                </div>
                <div hidden={!(loginFailed && !!errorMessage)}>
                  <StyledAlert status="error" variant="left-accent">
                    <AlertIcon />
                    <AlertTitle mr={2}>Error!</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </StyledAlert>
                </div>
                <StyledButton
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  type="submit"
                  isDisabled={!isObjectEmpty(errors)}
                >
                  Submit
                </StyledButton>
              </StyledForm>
            );
          }}
        </Formik>
      </FormWrapper>
    </LoginWrapper>
  );
};

export default Login;

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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  min-width: 350px;
`;

const StyledField = styled(Field)`
  display: flex;
  min-height: 42px;
  border: 1px solid ${props => props.theme["colors"]["app"]["lightGrey"]};
  margin: 1rem 0 0;
  border-radius: 8px;
  padding: 0 0.5rem;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin-top: 0.5rem;
`;

const StyledAlert = styled(Alert)`
  margin-top: 0.5rem;
`;

const StyledButton = styled(Button)`
  color: ${props => props.theme["colors"]["white"]};
  background: ${props => props.theme["colors"]["app"]["green"]};
  border-radius: 8px;
  margin-top: 1rem;
`;
