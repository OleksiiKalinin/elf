import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G } from "react-native-svg"

const MapMarkerIcon = (props: SvgProps) => (
  <Svg
  width={17}
  height={22}
    {...props}
  fill="none"
>
  <Path
    d="M8.55 1.098c-3.87 0-7 2.973-7 6.65 0 4.987 7 12.35 7 12.35s7-7.363 7-12.35c0-3.677-3.13-6.65-7-6.65Zm0 9.025c-1.38 0-2.5-1.064-2.5-2.375s1.12-2.375 2.5-2.375 2.5 1.064 2.5 2.375c0 1.31-1.12 2.375-2.5 2.375Z"
    stroke="#8789A2"
    strokeWidth={2}
  />
</Svg>
)


export default MapMarkerIcon
