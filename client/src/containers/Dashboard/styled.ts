import styled from "@emotion/styled";

export const DashboardLayout = styled("div")`
	display: grid;
	grid-template-columns: 90px auto;
	grid-template-rows: 80px auto;
	grid-template-areas:
		"header header header header header "
		"sidebar body body body body";
`;

export const HeaderLayout = styled("div")`
	grid-column: 1 / 5;
	grid-area: header;
	background: ${props => props.theme["colors"]["app"]["white"]};
	box-shadow: ${props => props.theme["shadow"]["header"]};
`;

export const SidebarLayout = styled("div")`
	grid-column: 1 / 2;
	grid-area: sidebar;
	min-height: 100vh;
	background: ${props => props.theme["colors"]["app"]["white"]};
	box-shadow: ${props => props.theme["shadow"]["sidebar"]};
`;

export const BodyLayout = styled("div")`
	grid-column: 2 / 5;
	grid-area: body;
	padding: 32px;
	background: ${props => props.theme["colors"]["app"]["mediumGrey"]};
	z-index: -1;
`;
