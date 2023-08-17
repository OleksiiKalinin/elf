import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, Defs, ClipPath } from "react-native-svg"

const UkrainianIcon = (props: SvgProps) => (
  <Svg
    width={17}
    height={13}
    fill="none"
        {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#3273D3" d="M.566.91h16v6h-16z" />
      <Path fill="#FFD018" d="M.566 6.91h16v6h-16z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(.566 .91)" d="M0 0h16v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)


export default UkrainianIcon
