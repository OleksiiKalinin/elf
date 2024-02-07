import React, { Fragment, forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { DraggableListProps } from '.';

const DraggableList: React.FC<DraggableListProps> = forwardRef(({
  data,
  onDragEnd,
  keyExtractor,
  renderItem,
  horizontal = false,
  contentContainerStyle,
  style,
}, ref) => {
  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        ref={ref as any}
        data={data}
        onDragEnd={onDragEnd}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal={horizontal}
        contentContainerStyle={contentContainerStyle}
        style={style}
      />
    </View>
  );
});

export default DraggableList;