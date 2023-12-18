type RenderItemParams<T> = {
  item: T,
  getIndex: () => number | undefined,
  drag: () => void,
  isActive: boolean,
};

export type DraggableListProps = {
  data: any[],
  onDragEnd: (params: DragEndParams<any>) => void,
  keyExtractor: (item: any, index: number) => string,
  renderItem: RenderItem<any> = (params: RenderItemParams<T>) => React.ReactNode,
  horizontal?: boolean,
};
 
declare const DraggableList: React.FC<DraggableListProps>;

export default DraggableList;