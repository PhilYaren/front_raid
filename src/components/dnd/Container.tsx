import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import './container.css'

import SortableItem from './sortable_item';

// const containerStyle = {
//   margin: '0 20px',
//   flex: '1',
//   display: 'flex',
//   flexDirection: 'row',
//   minWidth: '104px',
//   minHeight: '140px',
//   position: 'relative',
//   zIndex: '20',
//   justifyContent: 'space-evenly'
// };

export default function Container(props: any) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="container">
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="sortableItemContainer"
          ref={setNodeRef}
          // style={{ ...containerStyle }}
        >
          {items.map((card: any) => (
            <SortableItem key={card.id} id={card.id} card={card} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
