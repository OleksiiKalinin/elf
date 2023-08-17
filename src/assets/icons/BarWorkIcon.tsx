import * as React from "react"
import { Svg,  SvgProps, Rect, Path } from "react-native-svg"

const BarWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
        {...props}
    fill="none"
  >
    <Rect width={34} height={34} rx={17} fill="#DDB5E4" />
    <Path
      d="M19.422 11.715c.005-.066.02-.133.02-.2a2.114 2.114 0 0 0-2.113-2.112 2.114 2.114 0 0 0-2.113 2.112c0 .072.014.134.02.2h4.186Z"
      fill="#080914"
    />
    <Path
      d="M27.5 7h-3.936a.1.1 0 0 0-.09.058L20.5 13.5m0 0H7.741a.1.1 0 0 0-.07.17L15.5 21.5m5-8h2.759a.1.1 0 0 1 .07.17L15.5 21.5m0 0v8m0 0h-4m4 0h4"
      stroke="#080914"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)

export default BarWorkIcon
