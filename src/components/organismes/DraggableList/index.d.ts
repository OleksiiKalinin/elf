import { DetailedHTMLProps, FC, HTMLAttributes, HTMLDivElement, ReactNode, Ref } from "react";
import { DragEndParams } from "react-native-draggable-flatlist";
import { ScrollViewProps } from "../../molecules/ScrollView";

export type RenderItemParams<T> = {
  item: T,
  getIndex: () => number | undefined,
  isActive: boolean,
  /**only native */
  drag: () => void,
};

export type DraggableListProps = {
  ref?: Ref,
  data: any[],
  onDragEnd: (params: DragEndParams<any>) => void,
  /**only native */
  keyExtractor: (item: any, index: number) => string,
  // renderItem: RenderItem<any> = (params: RenderItemParams<T>) => React.ReactNode,
  renderItem: (params: RenderItemParams<T>) => ReactNode,
} & Pick<ScrollViewProps, 'horizontal' | 'disableWindowScroll' | 'contentContainerStyle' | 'style'>;

declare const DraggableList: React.FC<DraggableListProps>;

export default DraggableList;