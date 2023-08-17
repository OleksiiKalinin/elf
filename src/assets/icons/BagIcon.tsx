import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G } from "react-native-svg"

const BagIcon = (props: SvgProps) => (
  <Svg
  width={25}
  height={25}
    {...props}
  fill="none"
>
  <Path
    d="M5.56 9.843a2 2 0 0 1 1.974-1.671h10.31a2 2 0 0 1 1.967 1.64l1.804 9.874a2 2 0 0 1-1.967 2.36H5.888a2 2 0 0 1-1.972-2.329l1.645-9.874Z"
    stroke={props.fill ? props.fill : "#080914"}
    strokeWidth={2}
  />
  <Path
    d="M16.587 11.132V5.895a2 2 0 0 0-2-2h-3.583a2 2 0 0 0-2 2v5.237"
    stroke={props.fill ? props.fill : "#080914"}
    strokeWidth={2}
    strokeLinecap="round"
  />
</Svg>
)


export default BagIcon
