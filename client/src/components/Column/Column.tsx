import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Container, Title, ChoreList } from "./styled";
import Chore from "../Chore/Chore";
import { IChore, ChoreState } from "../../types/board";

interface ColumnProps {
	id: string;
	chores: IChore[];
}

const Column: React.FC<ColumnProps> = (props: ColumnProps) => {
	const { id, chores = [] } = props;

	const titleFromChoreState = (state: string) => {
		return ChoreState[state];
	};

	return (
		<Container>
			<Title>{titleFromChoreState(id)}</Title>
			<Droppable droppableId={id} type="CHORE">
				{provided => (
					<ChoreList ref={provided.innerRef} {...provided.droppableProps}>
						{chores.map((chore, index) => (
							<Chore key={chore.id} id={chore.id} index={index} chore={chore} />
						))}
						{provided.placeholder}
					</ChoreList>
				)}
			</Droppable>
		</Container>
	);
};

export default Column;
