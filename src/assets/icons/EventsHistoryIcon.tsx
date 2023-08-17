import * as React from "react"
import { Svg, 
    SvgProps,
    G,
    Path,
    Circle,
    Defs,
    ClipPath,
} from "react-native-svg"

const EventsHistoryIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        {...props}
        fill="none"
    >
        <G clipPath="url(#a)">
            <Path
                d="M18.338 11.647c0 3.519-2.787 6.335-6.18 6.335s-6.18-2.816-6.18-6.335c0-3.518 2.787-6.335 6.18-6.335s6.18 2.817 6.18 6.335Z"
                stroke="#000"
                strokeWidth={2}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.575 2.104a1 1 0 0 0-1.743.98l1.642 2.92a1 1 0 1 0 1.743-.98l-1.642-2.92Zm7.925 4.11A1 1 0 0 0 17.942 7.6l3.623-3.774a1 1 0 0 0-1.443-1.385L16.5 6.215Zm1.236 7.915a1 1 0 0 1 1.36-.387l3.013 1.675a1 1 0 1 1-.972 1.748l-3.013-1.675a1 1 0 0 1-.388-1.36Zm-5.768 7.882a1 1 0 0 1-1-1v-2.36a1 1 0 1 1 2 0v2.36a1 1 0 0 1-1 1ZM1.635 15.722a1 1 0 0 1 .582-1.289l3.39-1.281a1 1 0 1 1 .708 1.87l-3.39 1.282a1 1 0 0 1-1.29-.582Z"
                fill="#080914"
            />
            <Path
                d="M15.826 16.657v0c0-1.099-.89-1.989-1.988-1.989h-3.676c-1.098 0-1.988.89-1.988 1.989v0"
                stroke="#080914"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <Circle
                cx={11.834}
                cy={10.19}
                r={1.869}
                stroke="#080914"
                strokeWidth={2}
            />
            <Circle cx={22.011} cy={16.993} r={1.989} fill="#080914" />
            <Circle cx={1.989} cy={15.661} r={1.989} fill="#080914" />
            <Circle cx={12} cy={22.012} r={1.989} fill="#080914" />
            <Circle cx={22.011} cy={1.989} r={1.989} fill="#080914" />
            <Path
                d="M9.419 2.067a1.989 1.989 0 1 1-3.978 0 1.989 1.989 0 0 1 3.978 0Z"
                fill="#080914"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default EventsHistoryIcon;
