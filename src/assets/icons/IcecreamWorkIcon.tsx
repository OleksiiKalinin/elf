import * as React from "react"
import { Svg,  SvgProps, Rect, Path } from "react-native-svg"

const IcecreamWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
        {...props}
    fill="none"
  >
    <Rect width={34} height={34} rx={17} fill="#F7B3CA" />
    <Path
      d="M22.693 13.707c.56-.934.84-2.054.84-3.174A6.493 6.493 0 0 0 17 4a6.493 6.493 0 0 0-6.534 6.533c0 1.12.28 2.24.84 3.174-1.12.653-1.773 1.493-1.773 2.426 0 2.054 3.36 2.8 7.467 2.8 4.107 0 7.466-.746 7.466-2.8 0-.933-.653-1.773-1.773-2.426Z"
      stroke="#080914"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.4 18.933 17 32l5.6-13.067M11.4 13.52c1.4.56 3.36.747 5.6.747"
      stroke="#080914"
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default IcecreamWorkIcon
