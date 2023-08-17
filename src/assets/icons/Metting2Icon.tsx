import * as React from "react"
import { Svg, 
  SvgProps,
  G,
  Circle,
  Mask,
  Path,
  Rect,
  Defs,
  ClipPath,
} from "react-native-svg"

const Metting2Icon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill="none"
  >
    <G clipPath="url(#a)">
      <Circle cx={12.859} cy={11.999} r={12} fill="#D2D7E2" />
      <Mask id="b" fill="#fff">
        <Path d="M6.66 5.999a1 1 0 0 1 1-1h10.133a1 1 0 0 1 1 1v13H6.659v-13Z" />
      </Mask>
      <Path
        d="M6.66 5.999a1 1 0 0 1 1-1h10.133a1 1 0 0 1 1 1v13H6.659v-13Z"
        stroke="#000"
        strokeWidth={4}
        mask="url(#b)"
      />
      <Rect
        x={9.459}
        y={7.799}
        width={2.8}
        height={1.867}
        rx={0.933}
        fill="#080914"
      />
      <Rect
        x={13.193}
        y={7.799}
        width={2.8}
        height={1.867}
        rx={0.933}
        fill="#080914"
      />
      <Rect
        x={9.459}
        y={10.599}
        width={2.8}
        height={1.867}
        rx={0.933}
        fill="#080914"
      />
      <Rect
        x={11.326}
        y={13.399}
        width={2.8}
        height={4.667}
        rx={1}
        fill="#080914"
      />
      <Rect
        x={13.193}
        y={10.599}
        width={2.8}
        height={1.867}
        rx={0.933}
        fill="#080914"
      />
      <Path
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        d="M4.859 17.999h15.734M6.726 5.866h12"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(.86 -.001)" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default Metting2Icon