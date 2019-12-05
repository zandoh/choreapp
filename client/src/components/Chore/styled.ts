import styled from "@emotion/styled";

export const Container = styled.div`
	background: ${props => props.theme["colors"]["app"]["white"]};
	min-height: 160px;
	border-radius: 5px;
	padding: 8px;
	margin-bottom: 20px;
	transition: background-color 0.2s ease;
`;
