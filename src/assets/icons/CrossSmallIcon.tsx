import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const CrossSmallIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m19.86 6.399-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6Z"
      fill="#080914"
    />
    <Path d="M12.86 1.999a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" fill="#fff" />
    <Path
      d="m17.86 15.479-1.42 1.42-3.53-3.54-3.54 3.54-1.41-1.41 3.53-3.54-3.53-3.54 1.41-1.41 3.54 3.53 3.55-3.53 1.42 1.41-3.54 3.59 3.52 3.48Z"
      fill="#080914"
    />
    <Path
      d="m17.86 15.479-1.42 1.42-3.53-3.54-3.54 3.54-1.41-1.41 3.53-3.54-3.53-3.54 1.41-1.41 3.54 3.53 3.55-3.53 1.42 1.41-3.54 3.59 3.52 3.48Z"
      fill="#080914"
    />
  </Svg>
)

export default CrossSmallIcon