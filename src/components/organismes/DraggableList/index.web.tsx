import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DraggableListProps } from '.';
import { isString } from 'lodash';
import { tree } from 'next/dist/build/templates/app-page';
import { ScrollView } from '../../molecules/ScrollView';

type DroppableProvidedType = { innerRef: React.LegacyRef<HTMLDivElement> | undefined; droppableProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; placeholder: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; };

type DraggableProvidedType = { draggableProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; dragHandleProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; innerRef: React.LegacyRef<HTMLDivElement> | undefined; };

const DraggableList: React.FC<DraggableListProps> = ({
	data,
	onDragEnd,
	renderItem,
	horizontal = false,
}) => {

	const handleDragEnd = (result: { destination: { index: number; }; source: { index: number; }; }) => {
		if (!result.destination) {
			return;
		}

		const reorderedList = Array.from(data);
		const [moved] = reorderedList.splice(result.source.index, 1);
		reorderedList.splice(result.destination.index, 0, moved);

		return onDragEnd({ data: reorderedList });
	};

	const getListStyle = (isDraggingOver: boolean) => ({
		display: horizontal ? 'flex' : 'initial',
		// background: isDraggingOver ? "lightblue" : "lightgrey",
		width: '100%',
		// overflow: 'scroll',
		// flexDirection: horizontal ? 'row' : 'column'
	});

	const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
		...draggableStyle,
		userSelect: "none",
		// padding: grid * 2,
		// margin: `0 0 ${grid}px 0`,
		// position: 'static !important',
		// opacity: isDragging ? .5 : 1,

		// background: isDragging ? "lightgreen" : '',
	});

	const getRenderItem = (items: any[]) => (provided: DraggableProvidedType, snapshot: { isDragging: boolean; }, rubric: { source: { index: string | number; }; }) => {

		const index = isString(rubric.source.index) ? parseInt(rubric.source.index) : rubric.source.index;

		return (
			<div
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				ref={provided.innerRef}
				style={getItemStyle(
					snapshot.isDragging,
					provided.draggableProps.style
				)}
			>
				{renderItem({
					item: items[index],
					drag: () => { },
					getIndex: () => index,
					isActive: snapshot.isDragging,
				})}
			</div>
		)
	};

	const DraggableContent = () => (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable
				droppableId="droppable"
				direction={horizontal}
				renderClone={renderElement}
			>
				{(provided: DroppableProvidedType, snapshot: { isDraggingOver: boolean; }) => (
					<div
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
						{...provided.droppableProps}
					>
						{data.map((item: any, index) => (
							<Draggable key={item.id} draggableId={item.id.toString()} index={index}>
								{renderElement}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)

	const renderElement = getRenderItem(data);

	return (
		<>
			{horizontal ? 
				<ScrollView horizontal>
					<DraggableContent/>
				</ScrollView>

				:

				<DraggableContent/>
			}
		</>
	);
};

const styles = StyleSheet.create({

});

export default DraggableList;