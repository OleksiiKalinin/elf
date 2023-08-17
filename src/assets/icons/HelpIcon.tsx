import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, Circle } from "react-native-svg"

const HelpIcon = (props: SvgProps) => (
  <Svg width={24} height={24} {...props}>
    <Path
      fill="#494c4e"
      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2m0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"
    />
    <Circle fill="#494c4e" cx={12} cy={19} r={1} />
    <Path
      fill="#494c4e"
      d="M17 9a5 5 0 0 1-4 4.9V16c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1 1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3c0 .55-.45 1-1 1s-1-.45-1-1c0-2.76 2.24-5 5-5s5 2.24 5 5z"
    />
  </Svg>
)


export default HelpIcon
