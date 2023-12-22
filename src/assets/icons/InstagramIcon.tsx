import * as React from "react"
import { Svg, SvgProps, Rect, Circle } from "react-native-svg"

const InstagramIcon = (props: SvgProps) => (
  <Svg
    width={37}
    height={36}
    {...props}
    fill='none'
  >
    <Rect
      x={4.859}
      y={3.88}
      width={28}
      height={28.12}
      rx={3}
      stroke={props.fill}
      strokeWidth={2}
    />
    <Circle cx={18.86} cy={18} r={6.404} stroke={props.fill} strokeWidth={2} />
    <Circle cx={26.786} cy={10.595} r={1.877} fill={props.fill} />
  </Svg>
)

export default InstagramIcon