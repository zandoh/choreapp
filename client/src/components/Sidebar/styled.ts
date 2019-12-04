import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export const SidebarWrapper = styled.div`
	display: flex;
	width: 100%;
	min-height: 100vh;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
	margin: 32px 0px;
	&:hover {
		cursor: pointer;
	}
`;

export const StyledNavLink = styled(NavLink)`
	display: flex;
	justify-content: center;
	box-sizing: content-box;
	width: 100%;
	&.selected {
		color: ${props => props.theme['colors']['brand']['orange']};
		border-right: 2px solid ${props => props.theme['colors']['brand']['orange']};
	}
`;
