import * as React from "react"
import { Svg,  SvgProps, Rect, Path, Mask } from "react-native-svg"

const TransportWorkIcon = (props: SvgProps) => (
<Svg
    width={34}
    height={34}
        {...props}
    fill="none"
  >
    <Rect width={34} height={34} rx={17} fill="#FFC599" />
    <Path
      d="M13.312 21.075h6.739v-9.016c0-.822-.667-1.49-1.489-1.49H6.982c-.823 0-1.489.667-1.489 1.49v9.016h1.77M26.897 21.075h1.751v-2.922c0-.284-1.07-3.094-1.49-4.108-.42-1.015-.666-1.49-1.49-1.49h-5.617v8.52h.797"
      stroke="#080914"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.5 21.075h.994M28.506 21.075h.994M28.166 16.815h-5.134M10.206 22.936a1.861 1.861 0 1 0 0-3.722 1.861 1.861 0 0 0 0 3.722ZM23.916 22.936a1.86 1.86 0 1 0 0-3.722 1.86 1.86 0 0 0 0 3.722Z"
      stroke="#080914"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </Svg>
)

export default TransportWorkIcon
