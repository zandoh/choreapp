import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { Container } from "./styled";
import { data, columns, columnOrder } from "./data";
import { IChore, IColumn } from "../../types/board";

const reorder = (list: IChore[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const Board: React.FC = () => {
	const [chores, setChores] = useState<IChore[]>(data);

	const onDragEnd = (result: DropResult) => {
		console.log("result ", result);
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
			chores.forEach((chore: IChore) => {
				if (chore.id === result.draggableId) {
					console.log("chore ", chore);
					const col = columns.find(col => {
						if (col.id === result.destination!.droppableId) {
							return true;
						}
						return false;
					});
					chore.state = col?.state ?? chore.state;
				}
			});
		}

		setChores(reorder(chores, result.source.index, result.destination.index));
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				{columnOrder.map((columnId: string) => {
					const column = columns.find(
						(column: IColumn) => column.id === columnId
					);
					if (!column) return null;
					const columnChores = chores.filter((chore: IChore) => {
						return chore.state === column.state;
					});

					return (
						<Column
							key={column.id}
							id={column.id}
							title={column.title}
							chores={columnChores}
						/>
					);
				})}
			</Container>
		</DragDropContext>
	);
};

export default Board;
