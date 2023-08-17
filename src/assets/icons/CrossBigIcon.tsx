import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"
import Colors from "../../colors/Colors"

const CrossBigIcon = (props: SvgProps) => (
  <Svg
    width={15}
    height={14}
        {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.36 1.4 12.96 0l-5.6 5.6L1.76 0 .36 1.4 5.96 7l-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4L8.76 7l5.6-5.6Z"
      fill={props.fill || Colors.Basic700}
    />
  </Svg>
)

export default CrossBigIcon