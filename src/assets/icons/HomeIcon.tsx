import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const HomeIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={21}
    {...props}
    fill='none'
  >
    <Path
      d="M6.443 19.75H2.359a1 1 0 0 1-1-1V8.263a1 1 0 0 1 .376-.78l7.79-6.23a1 1 0 0 1 1.254.005l7.671 6.224a1 1 0 0 1 .37.777V18.75a1 1 0 0 1-1 1h-4.142a1 1 0 0 1-1-1.006l.04-6.358a1 1 0 0 0-1-1.007H8.443a1 1 0 0 0-1 1v6.371a1 1 0 0 1-1 1Z"
      strokeWidth={2}
      stroke={props.fill}
    />
  </Svg>
)

export default HomeIcon