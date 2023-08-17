import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const PhoneCall1Icon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    {...props}
    fill="none"
  >
    <Path
      d="M10.91 4.064a3.83 3.83 0 0 1 3.026 3.026M10.91 1A6.894 6.894 0 0 1 17 7.082m-.766 6.112v2.298a1.53 1.53 0 0 1-1.67 1.532 15.158 15.158 0 0 1-6.61-2.351 14.936 14.936 0 0 1-4.596-4.596 15.159 15.159 0 0 1-2.352-6.641 1.532 1.532 0 0 1 1.525-1.67h2.297A1.532 1.532 0 0 1 6.36 3.083c.097.736.277 1.458.537 2.153a1.532 1.532 0 0 1-.345 1.616l-.973.973a12.255 12.255 0 0 0 4.596 4.596l.973-.973a1.532 1.532 0 0 1 1.616-.345c.695.26 1.417.44 2.152.537a1.532 1.532 0 0 1 1.318 1.554Z"
      stroke={props.fill ? props.fill : "#080914"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default PhoneCall1Icon