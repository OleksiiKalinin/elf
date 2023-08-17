import * as React from "react"
import { Svg, 
  SvgProps,
  Path,

  Rect,
} from "react-native-svg"

const WomanIcon = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
        {...props}
    fill="none"
  >
    <Rect width={48} height={48} rx={24} fill="#E2E6EF" />
    <Path
      d="M10.195 30V16h2.82l4.38 8.96 4.38-8.96h2.8v14h-1.98V18.56L17.375 29l-5.22-10.44V30h-1.96Zm17.227 0V16h6.48c.92 0 1.72.18 2.4.54.68.347 1.213.833 1.6 1.46s.58 1.353.58 2.18c0 .827-.193 1.553-.58 2.18a4.05 4.05 0 0 1-1.62 1.48c-.68.347-1.473.52-2.38.52h-4.38V30h-2.1Zm2.1-7.42h4.16c.827 0 1.48-.213 1.96-.64.493-.44.74-1.02.74-1.74s-.247-1.293-.74-1.72c-.48-.427-1.133-.64-1.96-.64h-4.16v4.74Z"
      fill="#7A7C99"
    />
  </Svg>
)

export default WomanIcon
