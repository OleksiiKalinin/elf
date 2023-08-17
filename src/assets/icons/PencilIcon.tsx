import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const PencilIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill="none"
  >
    <Path
      d="M21.57 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75 1.84-1.83ZM3.86 17.25V21h3.75L18.67 9.93l-3.75-3.75L3.86 17.25Z"
      fill="#9FA1AE"
    />
  </Svg>
)

export default PencilIcon