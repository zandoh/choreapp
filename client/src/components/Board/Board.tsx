import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";
import { Container } from "./styled";
import data from "./data";
import { IChore } from "../../types/chore";

const Board: React.FC = () => {
	const [columns] = useState(data.columns);
	const [columnOrder] = useState(data.columnOrder);
	const [chores]: [IChore[], any] = useState(data.chores);

	const onDragEnd = useCallback(result => {}, []);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Container>
				{columnOrder.map(columnId => {
					const column = columns[columnId];
					const choresFiltered = column.choreIds.map(
						(choreId: string) => chores[choreId]
					);

					return (
						<Column key={column.id} column={column} tasks={choresFiltered} />
					);
				})}
			</Container>
		</DragDropContext>
	);
};

export default Board;
