import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, ClipPath, Defs } from "react-native-svg"

const MapMarker2Icon = (props: SvgProps) => (
  <Svg
  width={37}
  height={37}
    {...props}
  fill="none"
>
  <Rect x={0.043} y={0.846} width={36} height={36} rx={18} fill="#EFF4FC" />
  <G clipPath="url(#a)">
    <Path
      d="M18.043 8.846c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"
      stroke="#080914"
      strokeWidth={2}
    />
  </G>
  <Defs>
    <ClipPath id="a">
      <Path
        fill="#fff"
        transform="translate(6.043 6.846)"
        d="M0 0h24v24H0z"
      />
    </ClipPath>
  </Defs>
</Svg>
)


export default MapMarker2Icon
