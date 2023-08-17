import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, Circle, Defs } from "react-native-svg"

const PlayIcon = (props: SvgProps) => (
  <Svg
    width={66}
    height={66}
        {...props}
    fill="none"
  >
    <Circle cx={33} cy={33} r={28} fill="#fff" fillOpacity={0.3} />
    <Circle cx={33} cy={33} r={31.5} stroke="#fff" strokeWidth={3} />
    <G filter="url(#a)">
      <Path
        d="M49 32.268c1.333.77 1.333 2.694 0 3.464L28 47.856c-1.333.77-3-.192-3-1.732V21.876c0-1.54 1.667-2.502 3-1.732l21 12.124Z"
        fill="#fff"
      />
    </G>
    <Defs></Defs>
  </Svg>
)


export default PlayIcon
