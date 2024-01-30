import * as React from "react"
import { Svg, SvgProps, Path } from "react-native-svg"

const AppleLittleIcon = (props: SvgProps) => (
  <Svg
    width={28}
    height={34}
    fill="none"
        {...props}
  >
    <Path
      d="M27.146 26.1a17.713 17.713 0 0 1-1.751 3.15c-.922 1.314-1.676 2.223-2.257 2.728-.901.828-1.867 1.253-2.9 1.277-.742 0-1.637-.212-2.68-.64-1.044-.426-2.005-.637-2.883-.637-.921 0-1.91.21-2.966.637-1.059.428-1.911.652-2.563.674-.991.042-1.98-.394-2.966-1.311-.63-.55-1.417-1.49-2.36-2.824-1.012-1.424-1.844-3.076-2.496-4.958C.626 22.163.276 20.194.276 18.287c0-2.183.472-4.067 1.417-5.645A8.312 8.312 0 0 1 4.661 9.64a7.983 7.983 0 0 1 4.012-1.132c.787 0 1.82.244 3.103.722 1.28.48 2.1.724 2.461.724.27 0 1.182-.284 2.73-.852 1.463-.527 2.698-.745 3.71-.659 2.74.221 4.8 1.302 6.17 3.249-2.452 1.485-3.665 3.566-3.64 6.235.021 2.08.776 3.81 2.258 5.183a7.422 7.422 0 0 0 2.257 1.48 24.39 24.39 0 0 1-.576 1.51ZM20.86 1.36c0 1.63-.595 3.151-1.782 4.56-1.432 1.674-3.164 2.641-5.042 2.488a5.08 5.08 0 0 1-.038-.617c0-1.564.681-3.239 1.89-4.607.604-.693 1.372-1.27 2.303-1.73.93-.452 1.808-.703 2.635-.746.024.218.034.436.034.652Z"
      fill="#fff"
    />
  </Svg>
)

export default AppleLittleIcon