import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, Circle } from "react-native-svg"

const ColorCircleIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
        {...props}
  >
    <Circle cx={10} cy={10} r={10} fill={props.fill ? props.fill : "red"} />
  </Svg>
)


export default ColorCircleIcon
