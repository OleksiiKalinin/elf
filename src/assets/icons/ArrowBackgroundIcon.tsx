import * as React from "react"
import { Svg, SvgProps, Rect, Path, G } from "react-native-svg"

const ArrowBackgroundIcon = (props: SvgProps) => (
  <Svg
  width={40}
  height={41}
  fill="none"
    {...props}
>
  <Rect y={0.068} width={40} height={40} rx={20} fill="#fff" />
  <Path
    d="M8.717 19.068a1 1 0 1 0 0 2v-2Zm23.273 1.707a1 1 0 0 0 0-1.414l-6.364-6.364a1 1 0 0 0-1.415 1.415l5.657 5.656-5.657 5.657a1 1 0 0 0 1.415 1.414l6.364-6.363Zm-23.273.293h22.566v-2H8.716v2Z"
    fill="#080914"
  />
</Svg>
)


export default ArrowBackgroundIcon
