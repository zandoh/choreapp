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
	const [chores, setChores]: [IChore[], any] = useState(data);

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		setChores(reorder(chores, result.source.index, result.destination.index));
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				{columnOrder.map((columnId: string) => {
					console.log("columnId ", columnId);
					const column = columns.find(
						(column: IColumn) => column.id === columnId
					);
					console.log("column ", column);
					console.log("chores ", chores);
					const columnChores = chores.filter((chore: IChore) => {
						console.log("chore ", chore);
						return chore.status === column.status;
					});
					console.log("columnChores ", columnChores);

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
