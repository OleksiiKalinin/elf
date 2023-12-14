import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DraggableListProps } from '.';

const DraggableList: React.FC<DraggableListProps> = ({ list, callback, listItem }) => {

	const handleDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}

		const reorderedList= Array.from(list);
		const [moved] = reorderedList.splice(result.source.index, 1);
		reorderedList.splice(result.destination.index, 0, moved);

		callback(reorderedList);
	};

	const grid = 8;

	const getListStyle = (isDraggingOver: boolean) => ({
		display: 'flex',
		// background: isDraggingOver ? "lightblue" : "lightgrey",
		padding: grid,
		width: '100%',
	});

	const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
		userSelect: "none",
		padding: grid * 2,
		margin: `0 0 ${grid}px 0`,
		// top: 'auto !important',
		// left: 'auto !important',
		// position: 'static !important',

		background: isDragging ? "lightgreen" : '',

		...draggableStyle
	});

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided: any, snapshot: any) => (
					<div
						ref={provided.innerRef}

						// style={{ display: 'flex', padding: 0,}}
						style={getListStyle(snapshot.isDraggingOver)}
						{...provided.droppableProps}
					>
						{list.map((item: any, index) => (
							<Draggable key={item.id} draggableId={item.id.toString()} index={index}>
								{(provided: any, snapshot: any) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style
										)}
									>
										{listItem(item.path)}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

const styles = StyleSheet.create({

});

export default DraggableList;