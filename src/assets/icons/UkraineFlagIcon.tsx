import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G } from "react-native-svg"

const UkraineFlagIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={27}
        {...props}
    fill="none"
  >
    <Path fill="#FFEB3B" d="M0 .82h36v25.333H0z" />
    <Path fill="#0288D1" d="M0 .82h36v12.667H0z" />
  </Svg>
)


export default UkraineFlagIcon
