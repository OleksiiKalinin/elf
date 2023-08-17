import * as React from "react"
import { Svg,  SvgProps, Path, Circle } from "react-native-svg"

const CalendarIcon = (props: SvgProps) => (
  <Svg
  width={25}
  height={24}
    {...props}
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4.86 5h16v3h-16V5Zm4-2h8V2a1 1 0 1 1 2 0v1h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-16a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2V2a1 1 0 0 1 2 0v1Zm-4 7h16v11h-16V10Zm2.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm1.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm3.5-3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm1.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm3.5-3.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
  />
</Svg>
)

export default CalendarIcon