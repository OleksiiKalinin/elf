import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G } from "react-native-svg"
import Colors from "../../colors/Colors"

const HorizontalMenuIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    fill="none"
        {...props}
  >
    <Rect width={14} height={4} rx={1} fill={props.fill ? props.fill : Colors.Basic600} />
    <Rect y={5} width={14} height={4} rx={1} fill={props.fill ? props.fill : Colors.Basic600} />
    <Rect y={10} width={14} height={4} rx={1} fill={props.fill ? props.fill : Colors.Basic600} />
  </Svg>
)


export default HorizontalMenuIcon
