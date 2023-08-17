import * as React from "react"
import { Svg,  SvgProps, Path, G, ClipPath } from "react-native-svg"
import Colors from "../../colors/Colors"

const CreateCircleSmallIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
        {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.905 11.034V6.5h2v4.534H17.5v2h-4.595V17.5h-2v-4.466H6.5v-2h4.405ZM12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Z"
        fill={props.fill ? props.fill : Colors.White}
      />
    </G>
  
  </Svg>
)

export default CreateCircleSmallIcon