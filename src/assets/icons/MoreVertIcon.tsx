import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const MoreVertIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill="none"
  >
    <Path
      d="M12.86 7.999c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
      fill="#080914"
      stroke="#D2D7E2"
    />
  </Svg>
)

export default MoreVertIcon