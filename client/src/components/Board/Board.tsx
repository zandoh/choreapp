import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import { Container } from './styled';

const Board: React.FC = () => {
	const [items, setItems] = useState(getItems(10));
	const [selected, setSelected] = useState(getItems(5, 10));

	const onDragEnd = useCallback((result) => {
		
	}, []);

    return (
		<DragDropContext onDragEnd={onDragEnd}>
		  <Container>
			{columnOrder.map(columnId => {
			  const column = columns[columnId]
			  const tasks = column.taskIds.map(
				taskId => tasks[taskId]
			  )
  
			  return (
				<Column key={column.id} column={column} tasks={tasks} />
			  )
			})}
		  </Container>
		</DragDropContext>
	  )
};

export default Board;
