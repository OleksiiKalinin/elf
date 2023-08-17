import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const CloseCircleIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path
      d="M12.86 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.48-1.42 1.42-3.53-3.54-3.54 3.54-1.41-1.41 3.53-3.54-3.53-3.54L9.37 7l3.54 3.53L16.46 7l1.42 1.41L14.34 12l3.52 3.48Z"
    />
  </Svg>
)

export default CloseCircleIcon