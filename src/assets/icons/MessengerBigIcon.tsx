import * as React from "react"
import { Svg, 
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"

const MessengerBigIcon = (props: SvgProps) => (
  <Svg
    width={61}
    height={60}
    {...props}
    fill="none"
  >
    <Path
      d="M30.86-.001c16.901 0 30 12.381 30 29.101s-13.099 29.101-30 29.101a32.677 32.677 0 0 1-8.686-1.152 2.4 2.4 0 0 0-1.602.117l-5.952 2.628a2.4 2.4 0 0 1-3.369-2.12l-.165-5.341a2.391 2.391 0 0 0-.804-1.71C4.444 45.406.86 37.85.86 29.1.86 12.38 13.96 0 30.86 0ZM12.843 37.611l8.811-13.98a4.499 4.499 0 0 1 6.51-1.2l7.008 5.25a1.8 1.8 0 0 0 2.17 0l9.464-7.188c1.263-.957 2.913.555 2.067 1.899l-8.81 13.98a4.5 4.5 0 0 1-6.51 1.2l-7.009-5.25a1.8 1.8 0 0 0-2.169 0l-9.465 7.185c-1.263.958-2.913-.555-2.067-1.899v.003Z"
      fill="url(#a)"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m21.655 23.63-8.81 13.981v-.003c-.847 1.344.803 2.857 2.066 1.9l9.465-7.186a1.8 1.8 0 0 1 2.17 0l7.007 5.25a4.501 4.501 0 0 0 6.51-1.2l8.811-13.98c.846-1.344-.804-2.856-2.067-1.9l-9.465 7.189a1.8 1.8 0 0 1-2.169 0l-7.008-5.25a4.5 4.5 0 0 0-6.51 1.2Z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={81.539}
        y1={-50.944}
        x2={12.951}
        y2={60.046}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.461} stopColor="#FF6F65" />
        <Stop offset={0.555} stopColor="#F04D94" />
        <Stop offset={0.732} stopColor="#9937FF" />
        <Stop offset={1} stopColor="#178AFF" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default MessengerBigIcon