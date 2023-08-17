import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const CloseXIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
        {...props}
    fill="none"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4Z"
      fill="#7A7C99"
    />
  </Svg>
)

export default CloseXIcon