import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const CrossCircleBigIcon = (props: SvgProps) => (
  <Svg
    width={37}
    height={36}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m25.86 12.399-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6 5.6-5.6Z"
      fill="#fff"
    />
    <Path d="M18.86 2.999a15 15 0 1 0 0 30 15 15 0 0 0 0-30Z" fill="#ED095B" />
    <Path
      d="m26.358 23.219-2.13 2.13-5.295-5.31-5.31 5.31-2.115-2.115 5.295-5.31-5.295-5.31 2.115-2.115 5.31 5.295 5.325-5.295 2.13 2.115-5.31 5.385 5.28 5.22Z"
      fill="#fff"
    />
    <Path
      d="m26.358 23.219-2.13 2.13-5.295-5.31-5.31 5.31-2.115-2.115 5.295-5.31-5.295-5.31 2.115-2.115 5.31 5.295 5.325-5.295 2.13 2.115-5.31 5.385 5.28 5.22Z"
      fill="#fff"
    />
  </Svg>
)

export default CrossCircleBigIcon