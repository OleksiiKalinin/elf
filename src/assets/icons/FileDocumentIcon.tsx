import * as React from "react"
import { Svg,  SvgProps, Path } from "react-native-svg"

const FileDocumentIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={24}
        {...props}
    >
        <Path
            d="M6.918 21v-1 1Zm12.706 0v1-1Zm1.059-1h-1 1Zm0-11.208h1-1Zm-.282-.68-.714.7.714-.7Zm-4.698-4.791.714-.7-.714.7ZM14.926 3V2v1ZM6.918 3v1-1ZM5.86 4h1-1Zm0 16h-1 1Zm1.06 2h12.705v-2H6.918v2Zm14.764-2V8.792h-2V20h2Zm-.568-12.588-4.698-4.791-1.428 1.4 4.698 4.792 1.428-1.4ZM14.926 2H6.918v2h8.008V2ZM4.86 4v16h2V4h-2Zm2.06-2c-1.083 0-2.06.842-2.06 2h2a.05.05 0 0 1-.004.02c-.002.004-.003.003.001 0 .008-.007.027-.02.062-.02V2Zm9.498.62a2.089 2.089 0 0 0-1.49-.62v2c.016 0 .03.003.042.008a.06.06 0 0 1 .02.013l1.428-1.4Zm5.266 6.172a1.97 1.97 0 0 0-.568-1.38l-1.428 1.4c.002.003.001.002 0-.002a.048.048 0 0 1-.004-.018h2ZM19.624 22c1.082 0 2.059-.842 2.059-2h-2c0-.007.002-.014.004-.02.002-.004.003-.003 0 0-.009.007-.028.02-.063.02v2ZM6.918 20c-.035 0-.054-.013-.062-.02-.004-.003-.003-.004 0 0a.051.051 0 0 1 .003.02h-2c0 1.158.977 2 2.06 2v-2ZM10.078 16a1 1 0 0 0 0 2v-2Zm6.353 2a1 1 0 1 0 0-2v2Zm-6.353 0h6.353v-2h-6.353v2ZM10.078 12.998a1 1 0 0 0 0 2v-2Zm6.353 2a1 1 0 0 0 0-2v2Zm-6.353 0h6.353v-2h-6.353v2Z"
            fill={props.fill ? props.fill : "#080914"}
        />
        <Path
            d="M20.68 10a1 1 0 1 0 0-2v2Zm-5.295-1v1-1Zm-1.059-1h-1 1Zm1-5a1 1 0 1 0-2 0h2Zm5.353 5h-5.294v2h5.294V8Zm-5.353 0V3h-2v5h2Zm.059 0c-.035 0-.054-.013-.062-.02-.004-.003-.003-.004-.001 0a.051.051 0 0 1 .004.02h-2c0 1.158.977 2 2.059 2V8Z"
            fill={props.fill ? props.fill : "#080914"}
        />
    </Svg>
)

export default FileDocumentIcon