import * as React from "react"
import { Svg,  SvgProps, Path, Rect } from "react-native-svg"

const EmailIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={24}
        {...props}
        fill="none"
    >
        <Path
            d="m6.86 8.499 4.648 4.261a2 2 0 0 0 2.703 0L18.859 8.5"
            stroke={props.fill}
            strokeWidth={2}
            strokeLinecap="round"
        />
        <Rect
            x={3.859}
            y={4.999}
            width={18}
            height={14}
            rx={1}
            stroke={props.fill}
            strokeWidth={2}
        />
    </Svg>
)

export default EmailIcon
