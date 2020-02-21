import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { Container } from "./styled";
import { data } from "./data";
import { IChore, ChoreState } from "../../types/board";

// moves a chore in an array
const moveChore = (arr: IChore[], chore: IChore, newIndex: number) => {
	console.log('chore ', chore);
	if (newIndex >= arr.length) {
		newIndex = arr.length - 1;
	}
	const resArr = arr.filter((ch) => ch.id !== chore.id); // remove changed chore
	resArr.sort((a, b) => a.index - b.index); // sort on index
	resArr.splice(newIndex, 0, chore); // add item at index

	for (let i = 0; i < resArr.length; i++) {
		resArr[i].index = i;
	}
	return resArr;
};

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

		const changedCol = result.source.droppableId !== result.destination.droppableId;
		const changedIndex = result.source.index !== result.destination.index;
		let tempChores = chores.slice();
		
		// if the draggable switched droppables
		if (changedCol || changedIndex) {
			// will want to make api call here
			if (changedCol) {
				tempChores = chores.map(chore => {
					if (chore.id !== result.draggableId) return chore;
					return {
						...chore,
						state: ChoreState[result.destination!.droppableId]
					};
				});
			}
			
			// if the draggable switched indexes 
			if (changedIndex) {
				const colChores = tempChores.filter((chore) => chore.state === ChoreState[result.destination!.droppableId])
				const chore = tempChores.find((chore) => chore.id === result.draggableId)!;
				const destIndex = result.destination.index;
				tempChores.concat(moveChore(colChores, chore, destIndex));
			}
		}

		// will want to make api call here
		setChores(tempChores);
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
