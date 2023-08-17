import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const WeightIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill="none"
  >
    <Path
      stroke={props.fill}
      strokeWidth={2}
      strokeLinecap="round"
      d="m7.109 6.833 11.345-4.39M12.596 5.533v-1.72"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.503 9.328c-.496-.99-1.905-1-2.416-.019l-2.77 5.32c-1.554 2.986.613 6.556 3.979 6.556 3.282 0 5.415-3.455 3.946-6.389l-2.74-5.468Zm-3.15 5.72 1.926-3.697 1.852 3.698H5.354Zm-.52 2a2.486 2.486 0 0 0 2.463 2.137 2.414 2.414 0 0 0 2.4-2.136H4.833ZM19.698 5.418c-.496-.99-1.905-1.001-2.416-.02l-2.77 5.32c-1.554 2.987.613 6.557 3.98 6.557 3.281 0 5.415-3.455 3.945-6.389l-2.74-5.468Zm-3.149 5.72 1.925-3.697 1.852 3.697H16.55Zm-.521 2a2.486 2.486 0 0 0 2.463 2.137 2.414 2.414 0 0 0 2.4-2.137h-4.863Z"
      fill={props.fill}
    />
  </Svg>
)

export default WeightIcon