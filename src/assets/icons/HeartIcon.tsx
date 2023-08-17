import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const HeartIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path
      d="M12.86 4.527a6 6 0 0 0-8.243 8.715l6.828 6.828a2 2 0 0 0 2.829 0l6.828-6.828a6 6 0 0 0-8.243-8.715ZM11.687 6.17l.464.464a1 1 0 0 0 1.415 0l.464-.464a4 4 0 0 1 5.657 5.657l-6.829 6.828-6.828-6.828a4 4 0 0 1 5.657-5.657Z"
    />
  </Svg>
)

export default HeartIcon