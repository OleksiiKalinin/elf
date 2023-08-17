import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const ListIcon = (props: SvgProps) => (
  <Svg
  width={25}
  height={24}
  fill="none"
    {...props}
>
  <Path
    d="M15.293 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm0-4h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Zm2-6h-1.18a3 3 0 0 0-2.82-2h-2a3 3 0 0 0-2.82 2h-1.18a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-7 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V5Zm8 14a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6h1a1 1 0 0 1 1 1v12Z"
    fill={props.fill ? props.fill : "#080914"}
  />
</Svg>
)

export default ListIcon