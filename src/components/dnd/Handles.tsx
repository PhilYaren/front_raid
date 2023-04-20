import React from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import cardFlipSound from '../../assets/Card-flip-sound-effect.mp3'

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
};


export function findContainer(id: any, items: any) {
  if (id in items) {
    return id;
  }

  let desiredContainer: string = '';
  for (const itemsKey in items) {
    if (items[itemsKey].find((card: any) => card.id === id)) {
      desiredContainer = itemsKey;
    }
  }
  console.log('desiredContainer =====>', desiredContainer);

  return desiredContainer;
}

export function handleDragStart(event, setActiveId) {
  const { active } = event;
  const { id } = active;
  setActiveId(id);
}

export function handleDragOver(event, items, setItems) {
  const { active, over, draggingRect } = event;
  const { id, data } = active;
  const { id: overId } = over;

  // Find the containers
  const activeContainer = findContainer(id, items);
  const overContainer = findContainer(overId, items);

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    // console.log('returning =====>');
    return;
  }

  setItems((prev) => {
    const activeItems = prev[activeContainer];
    const overItems = prev[overContainer];

    // Find the indexes for the items
    const activeIndex = activeItems.findIndex((card: any) => card.id === id);
    const overIndex = overItems.findIndex((card: any) => card.id === overId);

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
      removedItem = newOverItems.splice(0, 1, data.current)[0];
    } else {
      newOverItems.splice(newIndex, 0, data.current);
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
        ...prev[activeContainer].filter((item) => item.id !== active.id),
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

  if (!activeContainer || !overContainer || activeContainer !== overContainer) {
    return;
  }

  const activeIndex = items[activeContainer].indexOf(active.id);
  const overIndex = items[overContainer].indexOf(overId);

  if (activeIndex !== overIndex) {
    setItems((items) => ({
      ...items,
      [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
    }));
  }

  setActiveId(null);
}
