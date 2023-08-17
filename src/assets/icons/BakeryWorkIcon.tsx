import * as React from "react"
import { Svg,  SvgProps, Rect, Path } from "react-native-svg"

const BakeryWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
        {...props}
  >
    <Rect width={34} height={34} rx={17} fill="#FED78B" />
    <Path
      d="M8.941 25h8.118a3 3 0 0 0 3-3v-5.333c.941-.834.941-.958.941-2.084C21 12.052 17.418 10 13 10s-8 2.052-8 4.583c0 .966.05 1.345.941 2.084V22a3 3 0 0 0 3 3Z"
      stroke="#000"
      strokeWidth={2}
    />
    <Path
      d="M17.5 25h7.56a3 3 0 0 0 3-3v-5.333c.94-.834.94-.958.94-2.084C29 12.052 25.42 10 21 10h-7.5"
      stroke="#000"
      strokeWidth={2}
    />
    <Path
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      d="M16 19v-1M11 21v-1M12 15v-1"
    />
  </Svg>
)

export default BakeryWorkIcon
