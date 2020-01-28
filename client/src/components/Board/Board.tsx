import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { Container } from "./styled";
import { data, columns } from "./data";
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

		// if the draggable switched droppables
		if (result.source.droppableId !== result.destination.droppableId) {
			// will want to make api call here
			chores.forEach((chore: IChore) => {
				if (chore.id === result.draggableId) {
					console.log("chore ", chore);
					const col = columns.find(col => {
						if (col.id === result.destination!.droppableId) {
							return true;
						}
						return false;
					});
					chore.state = col!.state ?? chore.state;
					console.log(chore);
				}
			});
		}
		setChores(chores);
	};

	const filterChoresForState = (state: string) => {
		const filtered = chores.filter(chore => chore.state === ChoreState[state]);
		return filtered;
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				{Object.keys(ChoreState).map((state: string) => {
					return (
						<Column
							key={`column-${state}`}
							id={state}
							chores={filterChoresForState(state)}
						/>
					);
				})}
			</Container>
		</DragDropContext>
	);
};

export default Board;
