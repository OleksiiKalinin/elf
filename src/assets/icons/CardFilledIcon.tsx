import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const CardFilledIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    {...props}
  >
    <Path
      d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2Z"
    />
  </Svg>
)

export default CardFilledIcon