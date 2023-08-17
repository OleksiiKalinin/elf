import * as React from "react"
import { Svg,  SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ShareArowIcon = (props: SvgProps) => (
    <Svg
        width={36}
        height={36}
        fill="none"
                {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M31.5 18.75 18.779 31.5v-9.208c-9.2.498-11.283 1.91-14.279 9.208v-5c0-6.627 5.373-12 12-12h2.279V6L31.5 18.75Z"
                stroke="#fff"
                strokeWidth={2}
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h36v36H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default ShareArowIcon
