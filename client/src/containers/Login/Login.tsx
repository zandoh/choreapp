import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { CognitoService } from "../../services/cognito";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import { Button } from "@chakra-ui/core";
import { isObjectEmpty } from "../../util";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { AppTheme } from "../../theme";
import { withTheme } from "styled-components";

interface FormErrors {
  email?: string;
  password?: string;
  passwordMismatch?: string;
}

interface LoginProps extends RouteComponentProps {
  theme: AppTheme;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { needsNewPassword, jwt } = useSelector(
    (state: AppState) => state.user
  );

  return (
    <LoginWrapper>
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
        {({ errors, isSubmitting }) => (
          <StyledForm>
            {!!jwt && isObjectEmpty(errors) && <Redirect to="/dashboard" />}
            <StyledErrorMessage name="email" component="div" />
            <Field type="email" name="email" placeholder="Email" />
            <StyledErrorMessage name="password" component="div" />
            <Field type="password" name="password" placeholder="Password" />
            {needsNewPassword && (
              <Fragment>
                <StyledErrorMessage name="passwordMismatch" component="div" />
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                />
                <Field
                  type="password"
                  name="newPasswordConfirm"
                  placeholder="New password confirmation"
                />
              </Fragment>
            )}
            <Button
              isLoading={isSubmitting}
              loadingText="Submitting"
              type="submit"
              isDisabled={!isObjectEmpty(errors)}
            >
              Submit
            </Button>
          </StyledForm>
        )}
      </Formik>
    </LoginWrapper>
  );
};

export default withTheme(Login);

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  min-width: 350px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin-bottom: "0.5rem";
`;
