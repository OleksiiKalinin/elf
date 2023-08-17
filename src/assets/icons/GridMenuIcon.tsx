import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G } from "react-native-svg"
import Colors from "../../colors/Colors"

const GridMenuIcon = (props: SvgProps) => (
  <Svg
    width={15}
    height={15}
    fill="none"
        {...props}
  >
    <Rect x={0.765} y={0.445} width={6} height={6} rx={1} fill={props.fill ? props.fill : Colors.Basic600} />
    <Rect x={0.765} y={8.445} width={6} height={6} rx={1} fill={props.fill ? props.fill : Colors.Basic600} />
    <Rect x={8.765} y={0.445} width={6} height={6} rx={1} fill={props.fill ? props.fill : Colors.Basic600} />
    <Rect x={8.765} y={8.445} width={6} height={6} rx={1} fill={props.fill ? props.fill : Colors.Basic600} />
  </Svg>
)


export default GridMenuIcon
