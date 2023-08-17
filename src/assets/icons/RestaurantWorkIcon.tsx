import * as React from "react"
import { Svg,  SvgProps, Rect, Path } from "react-native-svg"

const RestaurantWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
        {...props}
    fill="none"
  >
    <Rect width={34} height={34} rx={17} fill="#CDE0FF" />
    <Path
      d="M23.133 8.18c.288-.096.671-.096 1.054-.096 2.875 0 5.271 2.395 5.271 5.27 0 2.875-2.396 5.271-5.27 5.271l.479 8.625H9.332l.48-8.625c-2.876 0-5.272-2.396-5.272-5.27 0-2.876 2.396-5.271 5.271-5.271.384 0 .767 0 1.055.095"
      stroke="#080914"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23.708 10.958A6.667 6.667 0 0 0 17 4.25a6.667 6.667 0 0 0-6.709 6.708M23.708 23.13l-13.438-.006"
      stroke="#080914"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default RestaurantWorkIcon
