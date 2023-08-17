import * as React from "react"
import { Svg,  SvgProps, Rect, Path, ClipPath, Defs, G } from "react-native-svg"

const WorkIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
      >
    <Rect
      x={3.531}
      y={7.629}
      width={18.216}
      height={13.072}
      rx={2}
      stroke={props.fill}
      strokeWidth={2}
    />
    <Path
      d="M16.715 7.27V5.702a3 3 0 0 0-3-3h-2.149a3 3 0 0 0-3 3v1.57"
      stroke={props.fill}
      strokeWidth={2}
    />
  </Svg>
)

export default WorkIcon