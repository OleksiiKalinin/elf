import * as React from "react"
import { SvgProps, Svg, Path, G, Defs, ClipPath } from "react-native-svg";

const ArrowBottomIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="m17.445 8.709-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6-1.41-1.41Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          transform="matrix(-1 0 0 1 24.855 .12)"
          d="M0 0h24v24H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ArrowBottomIcon;
