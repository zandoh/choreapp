import styled from "@emotion/styled";

export const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;

	display: flex;
	flex-direction: column;
`;
export const Title = styled.h3`
	padding: 8px;
`;
export const ChoreList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")}
  flex-grow: 1;
  min-height: 100px;
`;
