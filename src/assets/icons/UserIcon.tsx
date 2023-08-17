import React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const UserIcon = (props: SvgProps) => (
  <Svg width={25} height={24} {...props}>
    <Path
      d="M5.86 21h-1a1 1 0 0 0 1 1v-1Zm14 0v1a1 1 0 0 0 1-1h-1Zm-13 0a6 6 0 0 1 6-6v-2a8 8 0 0 0-8 8h2Zm6-6a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8v2Zm-7 7h14v-2h-14v2ZM15.86 7a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5h-2Zm-3 3a3 3 0 0 1-3-3h-2a5 5 0 0 0 5 5v-2Zm-3-3a3 3 0 0 1 3-3V2a5 5 0 0 0-5 5h2Zm3-3a3 3 0 0 1 3 3h2a5 5 0 0 0-5-5v2Z"
    />
  </Svg>
)

export default UserIcon
