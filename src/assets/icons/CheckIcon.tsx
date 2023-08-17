import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const CheckIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
        {...props}
    fill="none"
  >
    <Path
      d="M9.86 16.2 5.66 12l-1.4 1.4 5.6 5.6 12-12-1.4-1.4-10.6 10.6Z"
      fill="#000"
    />
  </Svg>
)

export default CheckIcon