import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G } from "react-native-svg"

const ThreeDotsIcon = (props: SvgProps) => (
  <Svg
  width={25}
  height={24}
    {...props}
  fill="none"
>
  <Path
    d="M12.469 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
    fill="#000"
  />
</Svg>
)


export default ThreeDotsIcon
