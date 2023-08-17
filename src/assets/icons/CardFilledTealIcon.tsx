import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const CardFilledTealIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={19}
    fill="none"
        {...props}
  >
    <Path
      d="M12 .104H2c-1.1 0-1.99.9-1.99 2l-.01 16 7-3 7 3v-16c0-1.1-.9-2-2-2Z"
      fill="#70EEFF"
    />
  </Svg>
)

export default CardFilledTealIcon