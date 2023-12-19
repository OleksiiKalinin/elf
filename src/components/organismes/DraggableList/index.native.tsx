import React from 'react';
import { StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { DraggableListProps } from '.';

const DraggableList: React.FC<DraggableListProps> = ({
  data,
  onDragEnd,
  keyExtractor,
  renderItem,
  horizontal = false,
  contentContainerStyle,
  style,
}) => {

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={onDragEnd}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      horizontal={horizontal}
      contentContainerStyle={contentContainerStyle}
      style={style}
    />
  );
};

export default DraggableList;