import * as React from "react"
import { Svg, SvgProps, Path } from "react-native-svg"
import Colors from "../../colors/Colors"

const ArrowLeftIcon = (props: SvgProps) => (
  <Svg
  width={13}
  height={21}
  fill="none"
    {...props}
>
  <Path
    d="m12.232 2.666-1.77-1.77-9.9 9.9 9.9 9.9 1.77-1.77-8.13-8.13 8.13-8.13Z"
    fill={props.fill ? props.fill : Colors.Basic900}
  />
</Svg>
)

export default ArrowLeftIcon