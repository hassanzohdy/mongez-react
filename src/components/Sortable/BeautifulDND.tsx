import React from 'react';
import arrayMove from 'array-move';
import { SortableElementProps, SortableContainerProps } from './SortableTypes';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const getListStyle = (isDraggingOver) => ({
    // background: isDraggingOver ? 'lightblue' : 'grey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

const verticalListStyle = (isDraggingOver) => ({
    display: 'block',
    padding: grid,
    overflow: 'auto',
});

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: 'none',
    // margin: `0 0 16px 0`,
    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'red',
    userSelect: "none",
    padding: grid * 2,
    // display: 'flex',
    margin: `0 0 ${grid}px 0`,

    // styles we need to apply on draggables
    ...draggableStyle,
});

export function SortableElement({ id, className, index, children, itemStyle = getItemStyle }: SortableElementProps) {
    return (
        <Draggable key={id} draggableId={id} index={index}>
            {(draggableProvided, draggableSnapshot) => (
                <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    style={itemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style,
                    )}
                >
                    {children}
                </div>
            )}
        </Draggable>
    )
}

export default function SortableContainer({ list, direction, setList, renderItem, listStyle, onDragEnd }: SortableContainerProps) {
    const onDragStop = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        let newList = arrayMove(list, result.source.index, result.destination.index);

        setList(newList);

        onDragEnd && onDragEnd(result);
    }

    if (!listStyle) {
        if (direction === 'vertical') {
            listStyle = verticalListStyle;
        } else {
            listStyle = getListStyle;
        }
    }


    return (
        <>
            <DragDropContext onDragEnd={onDragStop}>
                <Droppable droppableId="droppable" direction={direction}>
                    {(droppableProvided, droppableSnapshot) => (
                        <div
                            ref={droppableProvided.innerRef}
                            style={listStyle(droppableSnapshot.isDraggingOver)}
                        >
                            {list.map((item, index) => (
                                <SortableElement id={String(item.id)} index={index}>{renderItem(item, index)}</SortableElement>
                            ))}
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}
