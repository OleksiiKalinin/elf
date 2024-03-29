import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const SettingsIcon = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    {...props}
    fill='none'
  >
    <Path
      clipRule="evenodd"
      d="m21.112 8.114-.595-.984c-.503-.833-1.619-1.12-2.493-.642v0c-.416.234-.913.3-1.381.184a1.813 1.813 0 0 1-1.113-.801 1.61 1.61 0 0 1-.244-.834v0a1.7 1.7 0 0 0-.517-1.265 1.874 1.874 0 0 0-1.312-.528H12.26c-.485 0-.949.184-1.29.511-.342.327-.532.77-.53 1.232v0c-.014.953-.829 1.718-1.828 1.718a1.815 1.815 0 0 1-.875-.234v0c-.875-.478-1.99-.19-2.494.642l-.638 1.001c-.503.832-.206 1.894.665 2.377v0c.565.31.914.886.914 1.509a1.73 1.73 0 0 1-.914 1.51v0c-.87.478-1.167 1.538-.665 2.367v0l.603.993c.236.405.632.704 1.1.831.468.127.97.07 1.394-.156v0a1.889 1.889 0 0 1 1.38-.177c.467.12.864.411 1.104.81.157.253.242.541.245.835v0c0 .962.819 1.742 1.829 1.742h1.198c1.007 0 1.824-.775 1.829-1.734v0c-.003-.463.19-.907.533-1.235.343-.327.81-.51 1.295-.508.307.008.608.088.875.234v0c.872.479 1.987.195 2.493-.634v0l.63-1c.244-.4.31-.875.186-1.32a1.748 1.748 0 0 0-.85-1.057v0c-.42-.23-.727-.61-.852-1.057a1.664 1.664 0 0 1 .186-1.32c.159-.264.388-.482.665-.633v0c.865-.483 1.162-1.539.665-2.369v0-.008Z"
      stroke={props.fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M12.863 14.402c1.392 0 2.52-1.075 2.52-2.402 0-1.326-1.128-2.401-2.52-2.401-1.391 0-2.52 1.075-2.52 2.401 0 1.326 1.129 2.402 2.52 2.402Z"
      stroke={props.fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SettingsIcon