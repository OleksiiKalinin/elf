import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, Defs, ClipPath } from "react-native-svg"

const RussianIcon = (props: SvgProps) => (
  <Svg
    width={17}
    height={13}
    fill="none"
        {...props}
  >
    <Path fill="#F5F8FB" d="M.566.91h16v4h-16z" />
    <Path fill="#41479B" d="M.566 4.91h16v4h-16z" />
    <Path fill="#DC251C" d="M.566 8.91h16v4h-16z" />
  </Svg>
)


export default RussianIcon
