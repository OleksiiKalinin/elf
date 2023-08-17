import * as React from "react"
import { Svg,  SvgProps, Rect, Path, ClipPath, Defs, G } from "react-native-svg"

const RenovationWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
        {...props}
  >
    <G clipPath="url(#a)">
      <Rect width={34} height={34} rx={17} fill="#CCF2F7" />
      <Path
        d="M17.497 4.228a2.125 2.125 0 0 0-3.005 0L3.974 14.746a2.125 2.125 0 0 0 0 3.006l1.503 1.502a2.125 2.125 0 0 0 3.005 0L19 8.736a2.125 2.125 0 0 0 0-3.005 1.062 1.062 0 0 1 1.503 0l.751.751a1.063 1.063 0 0 1 0 1.503l-5.26 5.259a3.187 3.187 0 0 0 0 4.508l.752.75-.751.752a1.062 1.062 0 0 0 0 1.503l7.513 7.513a1.062 1.062 0 0 0 1.503 0l3.005-3.005a1.063 1.063 0 0 0 0-1.503l-7.513-7.513a1.063 1.063 0 0 0-1.503 0L18.25 17l-.752-.751a1.062 1.062 0 0 1 0-1.503l5.26-5.259a3.188 3.188 0 0 0 0-4.507l-.752-.752a3.188 3.188 0 0 0-4.508 0ZM6.98 17.752l-1.502-1.503L15.995 5.731l1.502 1.502L6.98 17.752Zm18.783 6.761-1.503 1.503-6.01-6.01 1.502-1.503 6.01 6.01Z"
        fill="#080914"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={34} height={34} rx={17} fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default RenovationWorkIcon
