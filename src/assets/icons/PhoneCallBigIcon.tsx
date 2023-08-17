import * as React from "react"
import { Svg,  SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const PhoneCallBigIcon = (props: SvgProps) => (
    <Svg
        width={36}
        height={36}
        fill="none"
                {...props}
    >
        <G filter="url(#b)" clipPath="url(#a)">
            <Path
                d="M20.653 8.458a6.822 6.822 0 0 1 5.39 5.39M20.652 3A12.28 12.28 0 0 1 31.5 13.833m-1.364 10.888v4.094a2.73 2.73 0 0 1-2.975 2.729 27.002 27.002 0 0 1-11.775-4.19A26.607 26.607 0 0 1 7.2 19.169 27.002 27.002 0 0 1 3.01 7.338a2.729 2.729 0 0 1 2.715-2.974H9.82a2.729 2.729 0 0 1 2.73 2.347c.172 1.31.492 2.596.954 3.834a2.729 2.729 0 0 1-.614 2.88l-1.732 1.732a21.83 21.83 0 0 0 8.186 8.186l1.733-1.732a2.728 2.728 0 0 1 2.879-.614c1.238.462 2.524.782 3.834.955a2.729 2.729 0 0 1 2.347 2.77Z"
                stroke="#F5F9FD"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                //@ts-ignore
                shapeRendering="crispEdges"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h36v36H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default PhoneCallBigIcon
