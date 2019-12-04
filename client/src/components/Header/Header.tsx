import React from 'react';
import { CognitoService } from '../../services/cognito';
import {
	HeaderWrapper,
	StyledMenuButton,
	StyledAvatar,
	LogoWrapper,
	UserWrapper,
	StyledFontAwesomeIcon,
} from './styled';
import { faBell } from '@fortawesome/pro-light-svg-icons';
import { Menu, MenuList, MenuItem } from '@chakra-ui/core';
import { ReactComponent as Logo } from '../../assets/logo-placeholder.svg';
import { routes } from '../../util';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
	return (
		<HeaderWrapper>
			<Link to={routes.DASHBOARD}>
				<LogoWrapper>
					<Logo />
				</LogoWrapper>
			</Link>
			<UserWrapper>
				<StyledFontAwesomeIcon size="lg" icon={faBell} />
				<Menu>
					<StyledMenuButton>
						<StyledAvatar size="sm" src="https://bit.ly/broken-link" /> First
						Last
					</StyledMenuButton>
					<MenuList>
						<MenuItem onClick={() => CognitoService.logout()}>Logout</MenuItem>
					</MenuList>
				</Menu>
			</UserWrapper>
		</HeaderWrapper>
	);
};

export default Header;
