import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { id } = props;

  const style = {
    display: "flex",
    // flexDirection: 'row',
    // alignItems: "center",
    // justifyContent: "center",
    border: "1px solid black",
    margin: " 0",
    background: "white",
    zIndex: '20',

  };

  return <div style={style}>
  <img style={{'width': '100px'}} src={id.image}/>
  </div>;
}

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} />
    </div>
  );
}
