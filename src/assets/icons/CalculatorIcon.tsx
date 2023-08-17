import * as React from "react"
import { Svg,  SvgProps, Path, Rect } from "react-native-svg"

const CalculatorIcon = (props: SvgProps) => (
  <Svg
  width={25}
  height={24}
    {...props}
  fill="none"
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6.293 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-12Zm1 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-10Z"
    fill={props.fill ? props.fill : "#080914"}
  />
  <Path stroke={props.fill ? props.fill : "#080914"} strokeWidth={2} d="M5.293 10h14" />
  <Rect x={7.293} y={12} width={2} height={2} rx={1} fill="#080914" />
  <Rect x={7.293} y={16} width={2} height={2} rx={1} fill="#080914" />
  <Rect x={11.293} y={12} width={2} height={2} rx={1} fill="#080914" />
  <Rect x={11.293} y={16} width={2} height={2} rx={1} fill="#080914" />
  <Rect x={15.293} y={12} width={2} height={2} rx={1} fill="#080914" />
  <Rect x={15.293} y={16} width={2} height={2} rx={1} fill="#080914" />
</Svg>
)

export default CalculatorIcon