import React from "react";
import AppLogo from "../../assets/logo.png";
import { LoginWrapper, FormWrapper, LogoWrapper } from "./styled";

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
