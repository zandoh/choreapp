import styled from "@emotion/styled";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 315px;
	user-select: none;
`;

export const Title = styled.h3`
	font-size: 24px;
	font-weight: 600;
	padding-bottom: 16px;
`;

export const ChoreList = styled.div`
	transition: background-color 0.2s ease;
	min-height: 100px;
`;
