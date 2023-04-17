import React, { useState } from "react";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";



const wrapperStyle = {
  display: "flex",
  flexDirection: "row"
};

export function findContainer(id:any, items:any) {
  if (id in items) {
    return id;
  }

  return Object.keys(items).find((key) => items[key].includes(id));
}

export function handleDragStart(event, setActiveId) {
  const { active } = event;
  const { id } = active;

  setActiveId(id);
}


export function handleDragOver(event, items, setItems) {
  const { active, over, draggingRect } = event;
  const { id } = active;
  const { id: overId } = over;

  // Find the containers
  const activeContainer = findContainer(id, items);
  const overContainer = findContainer(overId, items);

  if (
    !activeContainer ||
    !overContainer ||
    activeContainer === overContainer
  ) {
    return;
  }

  setItems((prev) => {
    const activeItems = prev[activeContainer];
    const overItems = prev[overContainer];

    // Find the indexes for the items
    const activeIndex = activeItems.indexOf(id);
    const overIndex = overItems.indexOf(overId);

    let newIndex;
    if (overId in prev) {
      // We're at the root droppable of a container
      newIndex = overItems.length + 1;
    } else {
      const isBelowLastItem =
        over &&
        overIndex === overItems.length - 1 &&
        draggingRect?.offsetTop > over.rect?.offsetTop + over.rect.height;

      const modifier = isBelowLastItem ? 1 : 0;

      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
    }

    // Check if the target container already has an item, replace it
    const newOverItems = [...overItems];
    let removedItem = null;
    if (newOverItems.length >= 1) {
      removedItem = newOverItems.splice(0, 1, id)[0];
    } else {
      newOverItems.splice(newIndex, 0, id);
    }

    // Move the removed item back to the source container
    if (removedItem) {
      const newActiveItems = [...activeItems];
      newActiveItems.splice(activeIndex, 1, removedItem);
      return {
        ...prev,
        [activeContainer]: newActiveItems,
        [overContainer]: newOverItems,
      };
    }

    return {
      ...prev,
      [activeContainer]: [
        ...prev[activeContainer].filter((item) => item !== active.id),
      ],
      [overContainer]: newOverItems,
    };
  });
}

export function handleDragEnd(event, items, setItems, setActiveId) {
  const { active, over } = event;
  const { id } = active;
  const { id: overId } = over;

  const activeContainer = findContainer(id, items);
  const overContainer = findContainer(overId, items);

  if (
    !activeContainer ||
    !overContainer ||
    activeContainer !== overContainer
  ) {
    return;
  }

  const activeIndex = items[activeContainer].indexOf(active.id);
  const overIndex = items[overContainer].indexOf(overId);

  if (activeIndex !== overIndex) {
    setItems((items) => ({
      ...items,
      [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
    }));
  }

  setActiveId(null);
}

// export function dndCardsTest() {
//   const [items, setItems] = useState({
//     root: ["1", "2", "3"],
//     container1: ["4", "5", "6"],
//     container2: ["7", "8", "9"],
//     container3: []
//   });
//   const [activeId, setActiveId] = useState();

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates
//     })
//   );

//   return (
//     <div style={wrapperStyle}>
//       <DndContext
//         announcements={defaultAnnouncements}
//         sensors={sensors}
//         collisionDetection={closestCorners}
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         onDragEnd={handleDragEnd}
//       >
//         <Container id="root" items={items.root} />
//         <Container id="container1" items={items.container1} />
//         <Container id="container2" items={items.container2} />
//         <Container id="container3" items={items.container3} />
//         <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
//       </DndContext>
//     </div>
//   );
  
// }


// const defaultAnnouncements = {
//   onDragStart(id:any) {
//     console.log(`Picked up draggable item ${id}.`);
//   },
//   onDragOver(id:any, overId:any) {
//     if (overId) {
//       console.log(
//         `Draggable item ${id} was moved over droppable area ${overId}.`
//       );
//       return;
//     }

//     console.log(`Draggable item ${id} is no longer over a droppable area.`);
//   },
//   onDragEnd(id:any, overId:any) {
//     if (overId) {
//       console.log(
//         `Draggable item ${id} was dropped over droppable area ${overId}`
//       );
//       return;
//     }

//     console.log(`Draggable item ${id} was dropped.`);
//   },
//   onDragCancel(id:any) {
//     console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
//   }
// };