import * as React from "react"
import { Svg,  SvgProps, Path, Circle } from "react-native-svg"

const CreateCircleIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
        {...props}
  >
    <Circle cx={17} cy={17} r={14} fill="#fff" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.812 0C7.622.098.137 7.508 0 16.749v.534c.153 9.18 7.566 16.58 16.747 16.716 9.388.14 17.112-7.358 17.251-16.745C34.138 7.865 26.64.14 17.252.003a17.412 17.412 0 0 0-.44-.002Zm-1.426 6.853h3.228c.099 0 .178.079.178.178v8.176h8.177c.099 0 .178.08.178.178v3.228c0 .1-.08.18-.178.18h-8.177v8.176c0 .1-.079.179-.178.179h-3.228a.178.178 0 0 1-.179-.179v-8.175H7.031a.18.18 0 0 1-.179-.18v-3.229c0-.099.08-.178.179-.178h8.176V7.03c0-.099.08-.178.179-.178Z"
      fill="#03D6B0"
    />
  </Svg>
)

export default CreateCircleIcon