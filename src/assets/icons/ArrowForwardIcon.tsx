import * as React from "react"
import {
  Svg,
  SvgProps,
  G,
  Circle,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg"

const ArrowForwardIcon = (props: SvgProps) => (
  <Svg width={25} height={24} {...props}>
    <G clipPath="url(#a)">
      <Circle cx={12.859} cy={11.999} r={12} fill="#080914" />
      <Path
        d="m4.86 11.999 1.41 1.41 5.59-5.58v12.17h2V7.829l5.59 5.58 1.41-1.41-8-8-8 8Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          transform="rotate(-90 12.43 11.57)"
          d="M0 0h24v24H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ArrowForwardIcon;