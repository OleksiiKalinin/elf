import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.297 10.503a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.242 6.917a9 9 0 1 1 1.386-1.443l3.962 3.962a1 1 0 0 1-1.414 1.415l-3.934-3.934Z"
    />
  </Svg>
)

export default SearchIcon