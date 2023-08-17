import * as React from "react"
import { Svg,  SvgProps, Rect, Path, G, Circle, Defs, ClipPath } from "react-native-svg"

const BlankCandidateIcon = (props: SvgProps) => (
  <Svg
  width={49}
  height={49}
  fill="none"
    {...props}
>
  <G clipPath="url(#a)">
    <Circle cx={24.021} cy={24.758} r={24} fill="#E2E6EF" />
    <Path
      d="M12.364 37.59h-1.5a1.5 1.5 0 0 0 1.5 1.5v-1.5Zm23.314 0v1.5a1.5 1.5 0 0 0 1.5-1.5h-1.5Zm-21.814 0c0-5.609 4.548-10.156 10.157-10.156v-3c-7.266 0-13.157 5.89-13.157 13.157h3Zm10.157-10.156c5.61 0 10.157 4.547 10.157 10.157h3c0-7.267-5.89-13.157-13.157-13.157v3ZM12.364 39.09h23.314v-3H12.364v3Z"
      fill="#8789A2"
    />
    <Path
      d="M29.18 18.39c0 2.85-2.31 5.161-5.16 5.161v3a8.161 8.161 0 0 0 8.16-8.161h-3Zm-5.16 5.161a5.161 5.161 0 0 1-5.162-5.161h-3a8.161 8.161 0 0 0 8.161 8.161v-3Zm-5.162-5.161c0-2.85 2.311-5.162 5.161-5.162v-3a8.161 8.161 0 0 0-8.16 8.162h3Zm5.161-5.162c2.85 0 5.162 2.311 5.162 5.162h3a8.161 8.161 0 0 0-8.162-8.162v3Z"
      fill="#8789A2"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M46.93 11.747v-1.98h-7.919v-7.92h-1.98v7.92h-7.92v1.98h7.92v7.92h1.98v-7.92h7.92Z"
      fill="#F5F9FD"
    />
    <Path
      d="M45.092 3.686A10 10 0 1 0 30.95 17.828 10 10 0 0 0 45.092 3.686Z"
      fill="#080914"
    />
    <Path
      d="M39.097 16.754H37.09l.007-4.999H32.09V9.761l4.999-.007.007-5h1.994l.007 5 5.006.014.008 2.001-5.042.036.028 4.95Z"
      fill="#F5F9FD"
    />
    <Path
      d="M39.097 16.754H37.09l.007-4.999H32.09V9.761l4.999-.007.007-5h1.994l.007 5 5.006.014.008 2.001-5.042.036.028 4.95Z"
      fill="#F5F9FD"
    />
  </G>
  <Defs>
    <ClipPath id="a">
      <Path fill="#fff" transform="translate(.021 .758)" d="M0 0h48v48H0z" />
    </ClipPath>
  </Defs>
</Svg>
)


export default BlankCandidateIcon
