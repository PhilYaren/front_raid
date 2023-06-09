import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function Item(props) {
  const { card } = props;

  const style = {
    display: 'flex',
    // flexDirection: 'row',
    // alignItems: "center",
    // justifyContent: "center",
    border: '1px solid black',
    margin: ' 0',
    background: 'white',
    zIndex: '20',
  };

  return (
    <div style={style}>
      <img style={{ width: '100px' }} src={card.image} alt="Карточка" />
    </div>
  );
}

export default function SortableItem(props) {
  const { id, card } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id, data: card });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={id} card={card} />
    </div>
  );
}
