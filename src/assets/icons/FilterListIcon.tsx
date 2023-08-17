import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const FilterListIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path
      d="M10.86 17.999h4v-2h-4v2Zm-7-12v2h18v-2h-18Zm3 7h12v-2h-12v2Z"
    />
  </Svg>
)

export default FilterListIcon