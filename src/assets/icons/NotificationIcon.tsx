import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, ClipPath, Defs, Circle } from "react-native-svg"

const NotificationIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
        {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M22 19c2.5.5-21.5.5-19.5 0S6 15 6 13V8.5C6 5.5 8.5 3 12 3s6 2.5 6 5.5V13c0 1 1.5 5.5 4 6Z"
        stroke="#080914"
        strokeWidth={2}
        strokeLinejoin="round"
        fill="none"
      />
      <Path d="M9 19a3 3 0 0 0 6 0" stroke="#080914" fill="none" strokeWidth={2} />
      <Circle cx={12} cy={2} r={1} fill="#080914" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)


export default NotificationIcon
