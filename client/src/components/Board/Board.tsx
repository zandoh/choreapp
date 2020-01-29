import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { Container } from "./styled";
import { data } from "./data";
import { IChore, ChoreState } from "../../types/board";

const Board: React.FC = () => {
	const [chores, setChores] = useState<IChore[]>(data);

	const onDragEnd = (result: DropResult) => {
		// if the draggable didn't land on a droppable target
		if (!result.destination) {
			return;
		}

		// if the draggable didn't move positions in the droppable
		if (
			result.source.droppableId === result.destination.droppableId &&
			result.source.index === result.destination.index
		) {
			return;
		}

		// if the draggable switched droppables || switched positions
		if (
			result.source.droppableId !== result.destination.droppableId ||
			result.source.index !== result.destination.index
		) {
			// will want to make api call here
			setChores(
				chores.map(chore => {
					if (chore.id !== result.draggableId) return chore;
					return {
						...chore,
						state: ChoreState[result.destination!.droppableId],
						index: result.destination!.index
					};
				})
			);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				{Object.keys(ChoreState).map((state: string) => {
					return (
						<Column
							key={`column-${state}`}
							id={state}
							chores={chores.filter(chore => chore.state === ChoreState[state])}
						/>
					);
				})}
			</Container>
		</DragDropContext>
	);
};

export default Board;
