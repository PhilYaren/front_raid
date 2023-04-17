import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./sortable_item";

const containerStyle = {
  padding: 10,
  margin: '0 20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  border: '1px solid red',
  minWidth: '102px',
  minHeight: '10px',
  position: 'relative',
  zIndex: '20',
}

export default function Container(props:any) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <div className="container">
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div className="sortableItemContainer" ref={setNodeRef} style={containerStyle}>
        {items.map((id:any) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
    </div>
  );
}
