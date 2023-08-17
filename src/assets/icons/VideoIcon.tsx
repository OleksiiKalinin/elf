import * as React from "react"
import { Svg,  SvgProps, G, Rect, Path, Defs, ClipPath } from "react-native-svg"

const VideoIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
        {...props}
    fill="none"
  >
    <Rect
      x={1}
      y={4}
      width={22}
      height={16.595}
      rx={3}
      stroke="#7A7C99"
      strokeWidth={2}
    />
    <Path
      d="M15.3 12.104a.3.3 0 0 1 0 .52L9.45 16a.3.3 0 0 1-.45-.26V8.986a.3.3 0 0 1 .45-.26l5.85 3.378Z"
      stroke="#7A7C99"
      strokeWidth={2}
    />
  </Svg>
)

export default VideoIcon