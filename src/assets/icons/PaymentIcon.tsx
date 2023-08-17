import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const PaymentIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path
      d="M7.86 14.999h3a1 1 0 1 0 0-2h-3a1 1 0 0 0 0 2Zm12-10h-14a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Zm1 12a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-6h16v6Zm0-8h-16v-1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1Z"
    />
  </Svg>
)

export default PaymentIcon