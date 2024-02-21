import * as React from "react"
import { Svg,  SvgProps, Path, Mask, Rect } from "react-native-svg"

const MeetingIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill="none"
  >
    <Mask id="a7897897987" fill="#fff">
      <Path d="M5.731 5a1 1 0 0 1 1-1h11.867a1 1 0 0 1 1 1v15H5.731V5Z" />
    </Mask>
    <Path
      d="M5.731 5a1 1 0 0 1 1-1h11.867a1 1 0 0 1 1 1v15H5.731V5Z"
      stroke={props.fill ? props.fill : "#080914"}
      strokeWidth={4}
      mask="url(#a7897897987)"
    />
    <Rect x={8.932} y={7.2} width={3.2} height={2.133} rx={1} fill="#080914" />
    <Rect x={13.198} y={7.2} width={3.2} height={2.133} rx={1} fill="#080914" />
    <Rect x={8.932} y={10.4} width={3.2} height={2.133} rx={1} fill="#080914" />
    <Rect
      x={11.065}
      y={13.6}
      width={3.2}
      height={5.333}
      rx={1}
      fill={props.fill ? props.fill : "#080914"}
    />
    <Rect
      x={13.198}
      y={10.4}
      width={3.2}
      height={2.133}
      rx={1}
      fill={props.fill ? props.fill : "#080914"}
    />
    <Path
      stroke={props.fill ? props.fill : "#080914"}
      strokeWidth={2}
      strokeLinecap="round"
      d="M3.531 19h18.267M5.665 5.133h14"
    />
  </Svg>
)

export default MeetingIcon