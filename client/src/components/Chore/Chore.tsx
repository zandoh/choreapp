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

	return (
		<Draggable draggableId={id} index={index}>
			{provided => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{content}
				</Container>
			)}
		</Draggable>
	);
};

export default Chore;
