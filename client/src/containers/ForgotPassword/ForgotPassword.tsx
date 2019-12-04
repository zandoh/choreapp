import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/store';
import { CognitoService } from "../../services/cognito";
import { Formik } from 'formik';
import { AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/core';
import { isObjectEmpty, routes } from '../../util';
import { Redirect } from 'react-router-dom';
import AuthFormWrapper from '../../components/AuthFormWrapper/AuthFormWrapper';
import {
	StyledForm,
	StyledErrorMessage,
	StyledField,
	StyledAlert,
	StyledButton,
} from '../Login/styled';
interface FormErrors {
	email?: string;
	newPassword?: string;
	passwordMismatch?: string;
	verificationCode?: string;
}

const ForgotPassword: React.FC = () => {
	const [errors, setErrors] = useState({});
	const { jwt, errorMessage, forgotPassword, forgotPasswordFailed, resetPasswordSuccess} = useSelector(
		(state: AppState) => state.user,
	);

	if (!!jwt && isObjectEmpty(errors)) {
		return <Redirect to={routes.DASHBOARD} />;
	}

	if (resetPasswordSuccess) {
		return <Redirect to={routes.LOGIN} />;
	}

	return (
		<AuthFormWrapper>
			<Formik
				initialValues={{
					email: '',
					verificationCode: '',
					newPassword: '',
					newPasswordConfirm: '',
				}}
				validate={values => {
					let errors: FormErrors = {};
					delete errors.verificationCode;
					delete errors.newPassword;
					delete errors.passwordMismatch;

					if (!values.email) {
						errors.email = 'Required';
					}
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address';
					}
					if (forgotPassword) {
						if (!values.verificationCode) {
							errors.verificationCode = 'Required';
						}
						if (!values.newPassword) {
							errors.newPassword = 'Required';
						}
						if (values.newPassword !== values.newPasswordConfirm) {
							errors.passwordMismatch = 'Passwords do not match';
						}
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					const { email, verificationCode, newPassword } = values;

					if (!forgotPassword) {
						CognitoService.forgotPassword(email);
					} else {
						CognitoService.resetPassword(verificationCode, newPassword);
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
							<div hidden={!(forgotPasswordFailed && !!errorMessage)}>
								<StyledAlert status="error" variant="left-accent">
									<AlertIcon />
									<AlertTitle mr={2}>Error!</AlertTitle>
									<AlertDescription>{errorMessage}</AlertDescription>
								</StyledAlert>
							</div>
							<div hidden={!forgotPassword && !errorMessage}>
								<p>A verification code has been sent to the provided email.</p>
								<StyledErrorMessage name="verificationCode" component="div" />
								<StyledErrorMessage name="newPassword" component="div" />
								<StyledErrorMessage name="passwordMismatch" component="div" />
								<StyledField
									type="text"
									name="verificationCode"
									placeholder="Verification code"
								/>
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
							<StyledButton
								isLoading={isSubmitting}
								loadingText="Submitting"
								type="submit"
								isDisabled={!isObjectEmpty(errors)}
							>
								Reset Password
							</StyledButton>
						</StyledForm>
					);
				}}
			</Formik>
		</AuthFormWrapper>
	);
};

export default ForgotPassword;
