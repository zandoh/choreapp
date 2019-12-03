import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { CognitoService } from "../../services/cognito";
import { Formik } from "formik";
import { AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/core";
import { isObjectEmpty } from "../../util";
import { Redirect } from "react-router-dom";
import AuthFormWrapper from "../../components/AuthFormWrapper/AuthFormWrapper";
import {
  StyledForm,
  StyledErrorMessage,
  StyledField,
  StyledAlert,
  StyledButton
} from "./styled";
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
    <AuthFormWrapper>
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
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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
            <StyledForm data-testid="app-login-form">
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
    </AuthFormWrapper>
  );
};

export default Login;
