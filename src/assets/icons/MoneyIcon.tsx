import * as React from "react"
import { Svg,  SvgProps, Rect, Path, Circle } from "react-native-svg"

const MoneyIcon = (props: SvgProps) => (
  <Svg
    width={37}
    height={37}
        {...props}
    fill="none"
  >
    <Rect x={0.043} y={0.924} width={36} height={36} rx={18} fill="#EFF4FC" />
    <Circle cx={17.973} cy={19.424} r={11.5} stroke="#080914" strokeWidth={2} />
    <Path
      d="M18.027 24.209c-.664 0-1.254-.092-1.77-.277-.517-.184-1.01-.488-1.48-.912a.795.795 0 0 1-.235-.263.857.857 0 0 1-.07-.332.67.67 0 0 1 .194-.47.66.66 0 0 1 .899-.055c.35.322.715.566 1.093.732.387.166.839.25 1.355.25.369 0 .705-.06 1.01-.18a1.91 1.91 0 0 0 .747-.485c.184-.202.276-.438.276-.705 0-.332-.097-.604-.29-.816-.185-.221-.457-.4-.816-.54a6.814 6.814 0 0 0-1.273-.373 6.411 6.411 0 0 1-1.244-.345 3.387 3.387 0 0 1-.927-.553 2.358 2.358 0 0 1-.595-.817 2.686 2.686 0 0 1-.207-1.092c0-.563.147-1.046.442-1.452.296-.406.697-.72 1.204-.94.507-.222 1.078-.332 1.715-.332.58 0 1.124.092 1.631.276.508.175.918.415 1.231.72.222.193.332.4.332.622a.68.68 0 0 1-.207.47.605.605 0 0 1-.457.207.514.514 0 0 1-.332-.11 1.994 1.994 0 0 0-.594-.415 4.406 4.406 0 0 0-.802-.318 2.786 2.786 0 0 0-.802-.125c-.415 0-.77.06-1.065.18-.295.11-.521.267-.678.47a1.065 1.065 0 0 0-.235.692c0 .313.087.571.263.774.184.203.438.369.76.498.323.12.692.23 1.107.332.507.11.959.235 1.355.373.406.139.747.318 1.023.54.277.212.49.48.637.802.147.323.22.724.22 1.203 0 .553-.156 1.037-.47 1.452a3.118 3.118 0 0 1-1.244.968 4.065 4.065 0 0 1-1.701.346Zm.802 1.01c0 .193-.07.36-.207.497a.65.65 0 0 1-.498.208.635.635 0 0 1-.484-.208.704.704 0 0 1-.194-.498V13.63c0-.203.065-.369.194-.498a.695.695 0 0 1 .511-.207c.194 0 .355.069.484.207.13.13.194.295.194.498v11.59Z"
      fill="#080914"
    />
  </Svg>
)

export default MoneyIcon