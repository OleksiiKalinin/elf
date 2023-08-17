import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"
import Colors from "../../colors/Colors"

const ArrowRightSmallIcon = (props: SvgProps) => (
  <Svg
    width={9}
    height={13}
        {...props}
    fill="none"
  >
    <Path
      d="M.91 11.09 5.49 6.5.91 1.91 2.32.5l6 6-6 6-1.41-1.41Z"
      fill="#AEB2C6"
    />
  </Svg>
)

export default ArrowRightSmallIcon