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
        {...props}
        fill="none"
    >
        <Circle cx={24.861} cy={24.361} r={24} fill="#4A32CD" />
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth={2}
            d="M24.861 16.361v16M16.861 24.361h16"
        />
    </Svg>
)

export default AddBigIcon
