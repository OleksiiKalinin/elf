import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const EyeOnIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path d="M15.86 11.999a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <Path
      d="M22.754 11.552c-2.158-4.317-5.992-6.553-9.895-6.553-3.903 0-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C5.123 16.763 8.956 19 12.859 19c3.903 0 7.737-2.236 9.895-6.553a1 1 0 0 0 0-.894Zm-9.895 5.447c-2.968 0-6.002-1.62-7.87-5 1.868-3.38 4.902-5 7.87-5 2.97 0 6.002 1.62 7.87 5-1.868 3.38-4.9 5-7.87 5Z"
    />
  </Svg>
)

export default EyeOnIcon