import * as React from "react"
import { Svg,  SvgProps, Rect, Path } from "react-native-svg"

const TaxiWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
        {...props}
    fill="none"
  >
    <Rect width={34} height={34} rx={17} fill="#FFEF99" />
    <Path
      d="M9.425 9.89a3 3 0 0 0-2.854 2.077l-2.426 7.5a3 3 0 0 0 2.854 3.923h20.933c2.093 0 3.542-2.087 2.811-4.048l-2.796-7.5a3 3 0 0 0-2.811-1.951H9.426Z"
      stroke="#080914"
      strokeWidth={2}
    />
    <Path
      stroke="#080914"
      strokeWidth={1.5}
      strokeLinecap="round"
      d="M25.253 19.198v-4.589M22.671 19.21l-3.024-4.46M19.942 19.21l3.024-4.46M8.851 14.573h3.972M10.806 19.198V15.1M14.658 17.66h2.01"
    />
    <Path
      d="M13.197 19.02a.75.75 0 1 0 1.423.477l-1.423-.476Zm3.737.469a.75.75 0 1 0 1.427-.46l-1.427.46Zm-.652-4.475-.714.23.714-.23Zm-1.662 4.483 1.423-4.25-1.422-.477-1.424 4.25 1.423.477Zm.948-4.254 1.366 4.246 1.427-.46-1.365-4.245-1.428.46Zm.475.003a.25.25 0 0 1-.475-.003l1.428-.46c-.37-1.148-1.992-1.158-2.375-.013l1.422.476Z"
      fill="#080914"
    />
  </Svg>
)

export default TaxiWorkIcon
