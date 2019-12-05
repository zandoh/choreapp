import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Container } from "../Chore/styled";
import { IChore } from "../../types/board";

interface ChoreProps {
	id: string;
	index: number;
	chore: IChore;
}

const Chore: React.FC<ChoreProps> = (props: ChoreProps) => {
	const { id, index, chore } = props;

	return (
		<Draggable draggableId={id} index={index}>
			{provided => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{chore.content}
				</Container>
			)}
		</Draggable>
	);
};

export default Chore;
