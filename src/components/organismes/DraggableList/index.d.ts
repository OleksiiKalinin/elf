export type DraggableListProps = {
  list: any[],
  callback: (list: any[]) => void,
  listItem: (path: string) => JSX.Element;
};
 

declare const DraggableList: React.FC<DraggableListProps>;

export default DraggableList;