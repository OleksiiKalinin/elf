import * as React from "react"
import { Svg, SvgProps, Path } from "react-native-svg"

const InternetIcon = (props: SvgProps) => (
  <Svg
    width={37}
    height={36}
    {...props}
    fill="none"
  >
    <Path
      d="M18.903 31.9c7.953 0 14.4-6.447 14.4-14.4s-6.447-14.4-14.4-14.4-14.4 6.447-14.4 14.4 6.447 14.4 14.4 14.4Z"
      stroke={props.fill}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M18.904 31.9c3.977 0 7.2-6.447 7.2-14.4s-3.223-14.4-7.2-14.4c-3.976 0-7.2 6.447-7.2 14.4s3.224 14.4 7.2 14.4Z"
      stroke={props.fill}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M7.724 26.762c2.64-1.625 6.668-2.663 11.18-2.663 4.451 0 8.43 1.01 11.071 2.595M30.084 8.237C27.443 9.862 23.415 10.9 18.903 10.9c-4.45 0-8.43-1.009-11.071-2.594M4.503 17.5h28.8M18.902 3.1v28.8"
      stroke={props.fill}
      strokeWidth={2}
      strokeMiterlimit={10}
    />
  </Svg>
)

export default InternetIcon