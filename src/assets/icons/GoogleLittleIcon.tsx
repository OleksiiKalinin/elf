import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const GoogleLittleIcon = (props: SvgProps) => (
  <Svg
  width={32}
  height={32}
  fill="none"
    {...props}
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M30.72 16.349c0-1.088-.098-2.133-.28-3.137H16v5.931h8.252c-.356 1.917-1.436 3.541-3.06 4.628v3.848h4.956c2.899-2.67 4.572-6.6 4.572-11.27Z"
    fill="#4285F4"
  />
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.999 31.333c4.14 0 7.61-1.373 10.148-3.715l-4.956-3.847c-1.373.92-3.129 1.464-5.192 1.464-3.994 0-7.374-2.697-8.58-6.322H2.297v3.973c2.523 5.011 7.708 8.447 13.702 8.447Z"
    fill="#34A853"
  />
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M7.42 18.913A9.217 9.217 0 0 1 6.94 16c0-1.01.173-1.993.48-2.913V9.114H2.297A15.327 15.327 0 0 0 .667 16c0 2.474.592 4.816 1.63 6.886l5.123-3.973Z"
    fill="#FBBC05"
  />
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.999 6.765c2.251 0 4.272.774 5.861 2.293l4.398-4.398C23.603 2.186 20.132.667 16 .667c-5.994 0-11.18 3.436-13.702 8.447l5.122 3.973C8.625 9.462 12.005 6.765 16 6.765Z"
    fill="#EA4335"
  />
</Svg>
)

export default GoogleLittleIcon