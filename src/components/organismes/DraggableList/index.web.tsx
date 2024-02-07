import React, { ComponentProps, forwardRef } from 'react';
import { View } from 'react-native';
import { DragDropContext, Draggable, DraggableProvided, DraggableRubric, DraggableStateSnapshot, DropResult, Droppable } from 'react-beautiful-dnd';
import { DraggableListProps } from '.';
import { isString } from 'lodash';
import { ScrollView } from '../../molecules/ScrollView';

const DraggableList: React.FC<DraggableListProps> = forwardRef(({
	data,
	onDragEnd,
	renderItem,
	horizontal = false,
	contentContainerStyle,
	style,
	disableWindowScroll,
}, ref: any) => {
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const reorderedList = Array.from(data);
		const [moved] = reorderedList.splice(result.source.index, 1);
		reorderedList.splice(result.destination.index, 0, moved);

		return onDragEnd({ data: reorderedList, from: 0, to: 0 });
	};

	const getRenderItem = (provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => {
		const index = rubric.source.index;
		const item = data[index];

		if (!item) return <div />

		return (
			<div
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				ref={provided.innerRef}
				style={{
					...provided.draggableProps.style,
					userSelect: 'none',
				}}
			>
				{renderItem({
					item,
					drag: () => { },
					getIndex: () => index,
					isActive: snapshot.isDragging
				})}
			</div>
		)
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable
				droppableId="droppable"
				direction={horizontal ? 'horizontal' : 'vertical'}
				renderClone={getRenderItem}
			>
				{(provided) => (
					<ScrollView
						ref={(node) => {
							provided.innerRef(node as any);
							if (ref) ref.current = node;
						}}
						disableWindowScroll={disableWindowScroll}
						horizontal={horizontal}
						style={style}
						contentContainerStyle={contentContainerStyle}
						{...provided.droppableProps}
					>
						{data.map((item, index) => (
							<Draggable key={index} draggableId={index.toString()} index={index} shouldRespectForcePress isDragDisabled={data.length < 2}>
								{getRenderItem}
							</Draggable>
						))}
						{provided.placeholder}
					</ScrollView>
				)}
			</Droppable>
		</DragDropContext>
	)
});

export default DraggableList;