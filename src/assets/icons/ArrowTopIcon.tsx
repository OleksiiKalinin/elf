import * as React from "react"
import { SvgProps, Path, Svg } from "react-native-svg"
import Colors from "../../colors/Colors"

const ArrowTopIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    {...props}
  >
    <Path
      d="m8.27 15.41 4.59-4.58 4.59 4.58L18.86 14l-6-6-6 6 1.41 1.41Z"
      fill={props.fill ? props.fill : Colors.Basic300}
    />
  </Svg>
)

export default ArrowTopIcon