import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, Circle } from "react-native-svg"
import Colors from "../../colors/Colors"

const ColorCircleSelectedIcon = (props: SvgProps) => (
  <Svg
    width={28}
    height={28}
        {...props}
    fill="none"
  >
    <Circle cx={14} cy={14} r={10} fill={props.fill ? props.fill : "#171937"} />
    <Path
      d="m12 19.42-5-5 1.41-1.41L12 16.59 19.59 9 21 10.42l-9 9Z"
      fill={(props.fill === Colors.Basic800 || props.fill === Colors.Blue500) ? Colors.White : "#171937"}
    />
    <Circle cx={14} cy={14} r={13} stroke="#171937" strokeWidth={2} />
  </Svg>
)


export default ColorCircleSelectedIcon
