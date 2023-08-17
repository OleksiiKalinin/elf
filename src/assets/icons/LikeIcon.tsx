import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const LikeIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.86 8.999c1.1 0 2 .9 2 2l-.01.08.01.01v1.91c0 .26-.05.5-.14.73l-3.02 7.05c-.3.72-1.01 1.22-1.84 1.22h-9c-1.1 0-2-.9-2-2v-10c0-.55.22-1.05.59-1.41l6.58-6.59 1.06 1.05c.27.27.44.65.44 1.06l-.03.32-.95 4.57h6.31Zm-16 13h-4v-12h4v12Z"
    />
  </Svg>
)

export default LikeIcon