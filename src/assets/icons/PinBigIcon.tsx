import * as React from "react"
import { Svg,  SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const PinBigIcon = (props: SvgProps) => (
    <Svg
        width={36}
        height={36}
        {...props}
        fill="none"
    >
        <G filter="url(#b)" clipPath="url(#a)">
            <Path
                d="m13.264 20.799 1.414 1.414-8.485 8.485-2.122.707.707-2.12 8.486-8.486Z"
                fill={props.fill || "#F5F9FD"}
            />
            <Path
                stroke={props.fill || "#F5F9FD"}
                strokeWidth={2}
                strokeLinecap="round"
                d="m21.041 1.707 12.728 12.728"
            />
            <Path
                d="m14.677 20.8-5.724-5.725c-.363-.363-.396-.95-.033-1.313 1.916-1.924 3.867-2.037 5.057-1.722.432.115.918.056 1.234-.26l7.952-7.951 4.242 4.242"
                stroke={props.fill || "#F5F9FD"}
                strokeWidth={2}
            />
            <Path
                d="m14.677 20.8 5.724 5.723c.364.364.95.396 1.314.034 1.923-1.917 2.037-3.867 1.721-5.058-.114-.431-.056-.917.26-1.233l7.952-7.952-4.243-4.243"
                stroke={props.fill || "#F5F9FD"}
                strokeWidth={2}
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h36v36H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default PinBigIcon
