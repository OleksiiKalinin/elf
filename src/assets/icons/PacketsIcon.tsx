import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const PacketsIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill="none"
  >
    <Path
      d="M5.623 9.342a2 2 0 0 1 1.973-1.671h10.31a2 2 0 0 1 1.968 1.64l1.804 9.875a2 2 0 0 1-1.968 2.359H5.951a2 2 0 0 1-1.973-2.329l1.645-9.874Z"
      strokeWidth={2}
      stroke={props.fill}
    />
    <Path
      d="M16.649 10.631V5.394a2 2 0 0 0-2-2h-3.583a2 2 0 0 0-2 2v5.237"
      strokeWidth={2}
      strokeLinecap="round"
      stroke={props.fill}
    />
  </Svg>
)

export default PacketsIcon