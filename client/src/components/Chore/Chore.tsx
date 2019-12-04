import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "../Column/styled";

interface ChoreProps {
	id: string;
	index: number;
	content: string;
}

const Chore: React.FC<ChoreProps> = (props: ChoreProps) => {
	const { id, index, content } = props;
	const isDragDisabled = id === "task-1";
	return (
		<Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					innerRef={provided.innerRef}
					isDragging={snapshot.isDragging}
					isDragDisabled={isDragDisabled}
				>
					{content}
				</Container>
			)}
		</Draggable>
	);
};

export default Chore;
