import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const FacebookLittleIcon = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
        {...props}
  >
    <Path
      d="M35.25 18.105C35.25 8.578 27.527.855 18 .855 8.473.855.75 8.578.75 18.105c0 8.61 6.308 15.746 14.555 17.04V23.091h-4.38v-4.986h4.38v-3.8c0-4.324 2.575-6.712 6.515-6.712 1.888 0 3.862.337 3.862.337v4.245h-2.175c-2.143 0-2.812 1.33-2.812 2.694v3.236h4.785l-.765 4.986h-4.02v12.054c8.247-1.294 14.555-8.43 14.555-17.04Z"
      fill="#fff"
    />
  </Svg>
)

export default FacebookLittleIcon
