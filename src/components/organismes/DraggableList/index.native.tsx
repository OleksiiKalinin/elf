import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { DraggableListProps } from '.';

const DraggableList: React.FC<DraggableListProps> = ({
  data,
  onDragEnd,
  keyExtractor,
  renderItem,
  horizontal = false,
}) => {

  return (
      <DraggableFlatList
        data={data}
        onDragEnd={onDragEnd}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal={horizontal}
      />
  );
};

const styles = StyleSheet.create({

});

export default DraggableList;