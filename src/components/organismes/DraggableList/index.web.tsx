import React from 'react';
import { View } from 'react-native';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DraggableListProps } from '.';
import { isString } from 'lodash';
import { ScrollView } from '../../molecules/ScrollView';

type DraggableProvidedType = { draggableProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; dragHandleProps: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; innerRef: React.LegacyRef<HTMLDivElement> | undefined; };

const DraggableList: React.FC<DraggableListProps> = ({
	data,
	onDragEnd,
	renderItem,
	horizontal = false,
	contentContainerStyle,
	style,
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

	const getRenderItem = (items: any[]) => (provided: DraggableProvidedType, snapshot: { isDragging: boolean; }, rubric: { source: { index: string | number; }; }) => {

		const index = isString(rubric.source.index) ? parseInt(rubric.source.index) : rubric.source.index;

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
				direction={horizontal ? 'horizontal' : 'vertical'}
				renderClone={renderElement}
			>
				{(provided: any) => (
					<View
						ref={provided.innerRef}
						style={{
							width: '100%',
							flexDirection: horizontal ? 'row' : 'column',
							...contentContainerStyle,
						}}
						{...provided.droppableProps}
					>
						{data.map((item: any, index) => (
							<Draggable key={item.id} draggableId={item.id.toString()} index={index}>
								{renderElement}
							</Draggable>
						))}
						{provided.placeholder}
					</View>
				)}
			</Droppable>
		</DragDropContext>
	)

	const renderElement = getRenderItem(data);

	return (
		<>
			{horizontal ?
				<ScrollView horizontal>
					<DraggableContent />
				</ScrollView>

				:

				<View style={style}>
					<DraggableContent />
				</View>
			}
		</>
	);
};

export default DraggableList;