import * as React from "react"
import {
    Svg,
    SvgProps,
    G,
    Circle,
    Path,
    Defs,
    ClipPath,
} from "react-native-svg"

const AddBigIcon = (props: SvgProps) => (
    <Svg
        width={49}
        height={49}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Circle cx={24.415} cy={24.609} r={24} fill="#4A32CD" />
            <Path
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                d="M24.415 16.609v16M16.415 24.609h16"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" transform="translate(.415 .61)" d="M0 0h48v48H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default AddBigIcon
