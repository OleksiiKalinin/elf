import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const CardOutlinedIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={19}
        {...props}
    fill="none"
  >
    <Path
      d="M1.01 2.605v-.001c0-.554.449-1 .99-1h10c.548 0 1 .452 1 1v14.483l-5.606-2.402L7 14.516l-.394.169-5.605 2.402.009-14.482Z"
      stroke={props.fill ? props.fill : "#000"}
      strokeWidth={2}
    />
  </Svg>
)

export default CardOutlinedIcon