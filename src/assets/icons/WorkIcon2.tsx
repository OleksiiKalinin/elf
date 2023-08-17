import * as React from "react"
import { Svg,  SvgProps, Rect, Path, ClipPath, Defs, G } from "react-native-svg"

const WorkIcon2 = (props: SvgProps) => (
  <Svg
  width={37}
  height={37}
  fill="none"
    {...props}
>
  <Rect x={0.043} y={0.846} width={36} height={36} rx={18} fill="#EFF4FC" />
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M25.001 14.928H10.785a1 1 0 0 0-1 1V25a1 1 0 0 0 1 1h14.216a1 1 0 0 0 1-1v-9.072a1 1 0 0 0-1-1Zm-14.216-2a3 3 0 0 0-3 3V25a3 3 0 0 0 3 3h14.216a3 3 0 0 0 3-3v-9.072a3 3 0 0 0-3-3H10.785Z"
    fill="#080914"
  />
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12.82 12a4 4 0 0 1 4-4h2.15a4 4 0 0 1 4 4v1.57h-2V12a2 2 0 0 0-2-2h-2.15a2 2 0 0 0-2 2v1.57h-2V12Z"
    fill="#080914"
  />
</Svg>
)

export default WorkIcon2