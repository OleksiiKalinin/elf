import * as React from "react"
import {
    Svg,
    SvgProps,
    G,
    Circle,
    Path,
    Defs,
    ClipPath,
    Line,
} from "react-native-svg"

const AlertIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        {...props}
        fill="none"
    >
        {/* <Path stroke={props.fill} d="M12 8v4M12 16h.01" /> */}
        <Line stroke={props.fill} x1="12" x2="12" y1="8" y2="12"/>
        <Line stroke={props.fill} x1="12" x2="12.01" y1="16" y2="16"/>
    </Svg>
)

export default AlertIcon