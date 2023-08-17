import * as React from "react"
import { Svg,  SvgProps, Rect, Path, Circle } from "react-native-svg"

const PhotoIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill="none"
  >
    <Rect
      x={3.573}
      y={6.339}
      width={18.571}
      height={13.429}
      rx={1}
      stroke={props.fill}
      strokeWidth={2}
    />
    <Path
      d="M9.252 4.98a1 1 0 0 1 .968-.748h5.131a1 1 0 0 1 .95.69l.324.988H9.01l.241-.93Z"
      stroke={props.fill}
      strokeWidth={2}
    />
    <Circle
      cx={12.86}
      cy={13.024}
      r={3.857}
      stroke={props.fill}
      strokeWidth={2}
    />
  </Svg>
)

export default PhotoIcon