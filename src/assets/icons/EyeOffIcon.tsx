import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const EyeOffIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path
      d="M5.566 3.292a1 1 0 1 0-1.414 1.414L6.576 7.13C5.146 8.206 3.9 9.684 2.965 11.552a1 1 0 0 0 0 .894C5.123 16.763 8.956 19 12.859 19c1.556 0 3.1-.355 4.531-1.055l2.762 2.762a1 1 0 1 0 1.415-1.414l-16-16Zm10.307 13.135c-.98.383-2 .572-3.014.572-2.968 0-6.002-1.62-7.87-5 .818-1.479 1.858-2.62 3.019-3.437l2.144 2.144a3 3 0 0 0 4.001 4.001l1.72 1.72ZM19.412 13.895c.483-.556.926-1.187 1.318-1.896-1.869-3.38-4.902-5-7.87-5-.113 0-.225.002-.337.007L10.74 5.222a10.214 10.214 0 0 1 2.12-.223c3.903 0 7.737 2.236 9.895 6.553a1 1 0 0 1 0 .894 13.11 13.11 0 0 1-1.926 2.865l-1.416-1.416Z"
    />
  </Svg>
)

export default EyeOffIcon