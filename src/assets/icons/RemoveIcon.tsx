import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G } from "react-native-svg"

const RemoveIcon = (props: SvgProps) => (
  <Svg
  width={23}
  height={23}
    {...props}
  fill="none"
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="m19.521 5.158-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6Z"
    fill="#080914"
  />
  <Path d="M12.521.758a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" fill="#E2E6EF" />
  <Path
    d="M13.552 11.748h-6.98V9.705l5-.008h2.008l5.006.015.007 2-5.041.036Z"
    fill="#080914"
  />
  <Path
    d="M13.552 11.748h-6.98V9.705l5-.008h2.008l5.006.015.007 2-5.041.036Z"
    fill="#080914"
  />
</Svg>
)


export default RemoveIcon
