
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Container, Title, ChoreList } from './styled';
import Chore from '../Chore/Chore';
import { IChore } from '../../types/chore';

interface ColumnProps {
    title: string;
    id: string;
    chores: IChore[];
}

const Column: React.FC<ColumnProps> = (props: ColumnProps) => {
    const { title, id, chores } = props;
    return (
        <Container>
          <Title>{title}</Title>
          <Droppable droppableId={id} type="CHORE">
            {(provided, snapshot) => (
              <ChoreList
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {chores.map((chore, index) => (
                  <Chore key={chore.id} id={chore.id} index={index} content={chore.content} />
                ))}
                {provided.placeholder}
              </ChoreList>
            )}
          </Droppable>
        </Container>
    );
};

export default Column;
