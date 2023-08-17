import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, LinearGradient, Stop, Defs } from "react-native-svg"

const Shadow = (props: SvgProps) => (
  <Svg
    width={400}
    height={577}
    fill="none"
        {...props}
  >
    <Path fill="url(#a)" d="M0 0h400v577H0z" />
    <Defs>
      <LinearGradient
        id="a"
        x1={200}
        y1={-9.467}
        x2={200}
        y2={577}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#100E27" stopOpacity={0.3} />
        <Stop offset={0.149} stopColor="#100E27" stopOpacity={0} />
        <Stop offset={0.68} stopColor="#100E27" stopOpacity={0} />
        <Stop offset={1} stopColor="#100E27" stopOpacity={0.5} />
      </LinearGradient>
    </Defs>
  </Svg>
)


export default Shadow
