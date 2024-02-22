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
        width={48}
        height={48}
        {...props}
        fill="none"
    >
        <Circle cx={24} cy={24} r={24} fill="#4A32CD" />
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth={2}
            d="M24.600 16.361v16M16.861 24h16"
        />
    </Svg>
)

export default AddBigIcon
