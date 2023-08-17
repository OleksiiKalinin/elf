import * as React from "react"
import { Svg,  SvgProps, Mask, Path, Rect } from "react-native-svg"

const Metting1Icon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill="none"
  >
    <Mask id="a" fill="#fff">
      <Path d="M6.86 4.999a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v14h-13v-14Z" />
    </Mask>
    <Path
      d="M6.86 4.999a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v14h-13v-14Z"
      stroke={props.fill ? props.fill : "#080914"}
      strokeWidth={4}
      mask="url(#a)"
    />
    <Rect x={9.859} y={6.999} width={3} height={2} rx={1} fill="#080914" />
    <Rect x={13.859} y={6.999} width={3} height={2} rx={1} fill="#080914" />
    <Rect x={9.859} y={9.999} width={3} height={2} rx={1} fill="#080914" />
    <Rect x={11.859} y={12.999} width={3} height={5} rx={1} fill="#080914" />
    <Rect x={13.859} y={9.999} width={3} height={2} rx={1} fill="#080914" />
    <Path
      stroke={props.fill ? props.fill : "#080914"}
      strokeWidth={2}
      strokeLinecap="round"
      d="M4.859 17.999h17M6.859 4.999h13"
    />
  </Svg>
)

export default Metting1Icon