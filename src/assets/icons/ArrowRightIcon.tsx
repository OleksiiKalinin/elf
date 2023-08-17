import * as React from "react"
import { Svg, SvgProps, Path } from "react-native-svg"
import Colors from "../../colors/Colors"

const ArrowRightIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={21}
    fill="none"
        {...props}
  >
    <Path
      d="m.287 2.666 1.77-1.77 9.9 9.9-9.9 9.9-1.77-1.77 8.13-8.13-8.13-8.13Z"
      fill={props.fill ? props.fill : Colors.Basic900}
    />
  </Svg>
)

export default ArrowRightIcon