import * as React from "react"
import { Svg,  SvgProps, Rect, Path } from "react-native-svg"

const SweetsWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
        {...props}
    fill="none"
  >
    <Rect width={34} height={34} rx={17} fill="#FCD" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.37 8.585c1.509-.596 1.575-.616 2.116-.655 1.009-.07 1.98.357 2.876 1.268.9.915 1.619 2.322 1.885 3.695.092.475.098.794.098 4.898 0 3.79-.011 4.45-.082 4.823-.267 1.408-.972 2.792-1.91 3.746-.857.872-1.695 1.265-2.7 1.265-.253 0-.59-.034-.75-.076-.475-.123-14.285-5.666-14.412-5.784l-.116-.108v-3.86c0-3.324.01-3.874.077-3.969.053-.076 1.4-.638 4.514-1.882l2.353-.941.36.744-2.242.897-.007.003-.01.004-.007.003-.1.04L7.9 14.062l.181.077c.1.042.853.345 1.673.673.82.328.9.36.97.407l7.586 3.093c.125 0 .546.142 1.153.39 1.315.533 1.84.697 2.243.697.688 0 1.302-.34 2.09-1.158 1.248-1.296 1.782-2.673 1.705-4.4-.093-2.105-1.256-4.049-2.955-4.942-.263-.139-.351-.158-.722-.158-.265 0-.563.04-.8.105-.307.085-1.676.613-1.834.707-.002-.001-.149.056-.404.157l-.319-.765.902-.36Zm3.259 11.538a6.403 6.403 0 0 0 1.728-1.266c.317-.316.646-.71.84-1.006l.32-.488v2.33c0 1.833-.016 2.425-.077 2.773-.229 1.315-.856 2.527-1.727 3.338-.433.403-1.28.936-1.494.94-.052.001-.062-.654-.052-3.193l.013-3.195.449-.233ZM7.241 21.215c.072.07 13.798 5.54 13.97 5.568l.17.028-.015-1.312-.013-1.312-1.725-.688-1.724-.688-3.035-1.194c-.052-.032-1.792-.738-3.867-1.568l-3.773-1.51-.014 1.32c-.008.724.004 1.335.026 1.356Zm-.012-3.565-.014-1.48c-.008-.813.004-1.477.026-1.475.022.003.848.334 1.837.736l1.487.608 2.66 1.07 5.064 2.036c.063.003.767.268 1.563.59l1.449.584.014 1.48.013 1.48-.194-.078-1.618-.64L18.093 22l-3.246-1.315s-1.86-.73-3.816-1.513L7.229 17.65Z"
      fill="#080914"
    />
    <Path
      d="m19.37 8.585.184.465-.184-.465Zm2.116-.655-.035-.498.035.498Zm2.876 1.268.356-.351-.356.35Zm1.885 3.695-.491.095.49-.095Zm.016 9.72-.491-.093.491.094Zm-1.91 3.747.357.35-.357-.35Zm-3.45 1.19-.126.483.126-.484ZM6.49 21.764l.34-.366-.34.366Zm-.116-.108-.34.366-.16-.148v-.218h.5Zm.077-7.829-.41-.286.41.286Zm4.514-1.882-.186-.465.186.465Zm10.058-3.1.134.482-.134-.482Zm-1.833.707.256.43-.334.198-.275-.273.353-.355Zm-7.878 3.143-.186-.464.186.464ZM7.9 14.062l-.194.46-1.12-.473 1.128-.451.186.464Zm.181.077.195-.46-.195.46Zm1.673.673.186-.464-.186.464Zm.97.407-.188.463-.045-.019-.04-.026.274-.418Zm7.586 3.093v.5h-.098l-.09-.037.188-.463Zm1.153.39.189-.464-.189.463Zm4.333-.461.36.347-.36-.347Zm1.705-4.4.5-.023-.5.022Zm-2.955-4.942-.233.442.233-.442ZM7.215 16.17l.5-.004-.5.004Zm.014 1.48-.186.464-.311-.124-.003-.335.5-.005Zm3.802 1.521-.186.464.186-.464Zm3.816 1.513.183-.466.005.002-.188.464Zm-1.526-3.547.18-.467-.18.466Zm-2.756-1.098-.186.463h-.003l.19-.463Zm-1.487-.608.189-.463-.189.463Zm15.279 3.426-.353-.354.353.354Zm-1.728 1.266-.23-.444.23.444Zm-.449.233-.5-.002.002-.303.268-.139.23.444Zm-.013 3.195-.5-.002.5.002Zm.052 3.193.009.5-.01-.5Zm1.494-.94.34.366-.34-.366Zm1.727-3.338.493.086-.493-.086Zm.077-5.103-.418-.274.918-1.4v1.674h-.5Zm-.32.488-.418-.275.419.274ZM7.242 21.215l-.346.36.346-.36Zm13.97 5.568-.08.494.08-.494Zm.17.028.5-.005.006.594-.587-.096.08-.493Zm-.015-1.312-.5.005.5-.005Zm-.013-1.312.185-.465.311.125.004.335-.5.005Zm-1.725-.688-.185.465.185-.465Zm-1.724-.688.183-.465h.002l-.185.465Zm-3.035-1.194-.183.465-.043-.016-.039-.024.265-.425Zm-3.867-1.568.185-.464-.185.464Zm-3.773-1.51-.5-.004.007-.73.678.27-.185.465Zm-.014 1.32.5.004-.5-.005Zm10.878 2.14-.183.465-.005-.002.188-.463Zm1.423.562.184-.465-.184.465Zm1.618.64.185-.464-.185.464Zm.194.078.5-.005.007.746-.692-.277.185-.464Zm-.013-1.48-.5.005.5-.005Zm-.014-1.48.187-.463.31.125.003.334-.5.004Zm-1.449-.584.187-.464-.187.464Zm-1.563-.59-.023.5-.085-.004-.079-.032.187-.464Zm-6.876-6.489.186.464-.186-.464Zm1.906-1.651-.186-.464.433-.173.203.42-.45.217Zm.36.744.45-.218.233.483-.498.2-.186-.465Zm4.79-2.804-.462.192-.195-.468.47-.188.186.464Zm.318.765.184.465-.457.18-.188-.453.461-.192Zm-7.367 2.943-.186-.464.186.464Zm.017-.007.186.464-.186-.464Zm7.75-4.526c.744-.294 1.16-.458 1.456-.549.326-.1.522-.119.808-.14l.07.998c-.254.018-.363.03-.582.097-.25.078-.622.222-1.385.524l-.367-.93Zm2.264-.688c1.192-.084 2.297.43 3.267 1.415l-.713.701c-.823-.836-1.658-1.177-2.483-1.119l-.07-.997Zm3.267 1.415c.976.991 1.736 2.49 2.02 3.95l-.982.19c-.25-1.284-.925-2.6-1.75-3.439l.712-.701Zm2.02 3.95c.104.537.107.928.107 4.994h-1c0-4.143-.009-4.39-.09-4.803l.983-.19Zm.107 4.994c0 1.894-.003 3.01-.014 3.701-.012.682-.032.98-.076 1.215l-.983-.187c.026-.139.047-.356.059-1.045.011-.68.014-1.787.014-3.684h1Zm-.09 4.916c-.285 1.498-1.033 2.974-2.045 4.003l-.713-.7c.863-.879 1.525-2.17 1.775-3.49l.983.187ZM24.71 26.71c-.93.946-1.89 1.415-3.056 1.415v-1c.842 0 1.558-.317 2.343-1.115l.713.7Zm-3.056 1.415c-.276 0-.66-.036-.877-.092l.252-.968c.103.027.394.06.625.06v1Zm-.877-.092a3.845 3.845 0 0 1-.287-.1c-.13-.048-.305-.115-.518-.197-.425-.164-1.005-.392-1.687-.661-1.365-.54-3.14-1.248-4.905-1.956-1.764-.708-3.518-1.416-4.839-1.955-.66-.269-1.213-.496-1.606-.66a36.537 36.537 0 0 1-.604-.26 1.586 1.586 0 0 1-.09-.045c-.004-.003-.047-.027-.09-.067l.68-.733a.49.49 0 0 0-.093-.068l.016.008.115.05c.104.046.257.11.451.192.389.162.94.388 1.599.657a1059.105 1059.105 0 0 0 9.734 3.907 250.95 250.95 0 0 0 2.186.852c.139.051.191.069.19.068l-.252.968ZM6.15 22.132l-.116-.109.68-.732.117.108-.68.733Zm-.276-.475v-3.86h1v3.86h-1Zm0-3.86c0-1.66.003-2.634.014-3.205.005-.283.013-.48.025-.615a1.59 1.59 0 0 1 .027-.193.662.662 0 0 1 .101-.242l.82.573a.4.4 0 0 0 .047-.09l.01-.03s-.002.004-.003.017a9.008 9.008 0 0 0-.027.6c-.011.559-.014 1.522-.014 3.185h-1Zm.167-4.256a.543.543 0 0 1 .167-.155c.03-.02.063-.037.093-.052.06-.032.139-.07.233-.112a31.5 31.5 0 0 1 .834-.358c.736-.308 1.854-.76 3.411-1.383l.371.929a270.677 270.677 0 0 0-3.397 1.376c-.366.153-.63.267-.805.346-.089.04-.148.069-.184.088l-.02.01c.002 0 .012-.007.026-.019.008-.006.05-.039.09-.096l-.819-.574Zm15.116-4.213c-.125.034-.519.177-.926.335a26.595 26.595 0 0 0-.727.293l-.058.027-.512-.86c.078-.046.235-.113.375-.17.16-.066.36-.145.562-.224.393-.151.837-.315 1.019-.365l.267.964Zm-9.66 3.832-3.41 1.366-.373-.928 3.412-1.366.371.928Zm-3.402.441.181.077-.39.921-.18-.076.389-.921Zm.181.077c.094.04.84.34 1.664.67l-.371.928c-.817-.327-1.577-.632-1.682-.677l.39-.92Zm1.664.67c.408.163.638.255.773.312.133.055.208.09.285.14l-.547.837h-.001l-.002-.002-.008-.003a2.376 2.376 0 0 0-.112-.05 68.524 68.524 0 0 0-.76-.306l.372-.928Zm8.37 3.464c.1 0 .204.024.273.042.082.022.178.051.282.087.21.07.478.172.787.297l-.377.926a13.505 13.505 0 0 0-.73-.276 3.222 3.222 0 0 0-.212-.066c-.064-.016-.06-.01-.023-.01v-1Zm1.341.426c1.342.545 1.77.66 2.055.66v1c-.52 0-1.144-.21-2.43-.734l.375-.926Zm2.055.66c.487 0 .978-.223 1.73-1.004l.72.694c-.823.854-1.56 1.31-2.45 1.31v-1Zm1.73-1.004c1.158-1.202 1.636-2.447 1.566-4.031l.999-.045c.083 1.87-.506 3.38-1.845 4.77l-.72-.694Zm1.566-4.031c-.087-1.948-1.165-3.72-2.689-4.522l.466-.885c1.874.986 3.121 3.101 3.222 5.362l-1 .045ZM22.314 9.34a.776.776 0 0 0-.194-.084 1.503 1.503 0 0 0-.295-.016v-1c.184 0 .348.004.508.039.17.037.307.103.447.176l-.466.885Zm-.49-.1c-.223 0-.476.034-.666.087l-.267-.964c.284-.079.627-.123.934-.123v1ZM7.716 16.166l.014 1.48-1 .009-.014-1.48 1-.01Zm-.3 1.02 3.802 1.52-.372.93-3.802-1.522.371-.928Zm7.124.965c.044.035.072.042-.001.009a8.054 8.054 0 0 0-.245-.103 92.88 92.88 0 0 0-1.154-.454l.363-.933c.556.217.928.363 1.168.46.12.049.21.087.277.117.044.02.137.061.208.116l-.616.788Zm-4.163-1.65-1.487-.607.378-.926 1.487.608-.378.925Zm-1.486-.607a269.183 269.183 0 0 0-1.782-.715.996.996 0 0 0-.021-.008l.006.002.018.005c.001 0 .031.01.07.014l.119-.993c.04.005.071.014.074.014a.666.666 0 0 1 .089.03l.118.046.402.16 1.284.519-.377.926Zm-1.708-.702a.499.499 0 0 0 .495-.254c.03-.054.041-.1.044-.11a.388.388 0 0 0 .007-.033l.001-.01v.014l-.003.038a8.954 8.954 0 0 0-.01.299c-.004.261-.005.626-.001 1.03l-1 .01c-.004-.41-.003-.785.002-1.058.002-.136.006-.25.01-.335.002-.04.005-.082.01-.12a.523.523 0 0 1 .18-.35.501.501 0 0 1 .383-.114l-.118.993Zm17.528 4.02a6.903 6.903 0 0 1-1.85 1.355l-.461-.888a5.913 5.913 0 0 0 1.605-1.176l.706.708Zm-1.85 1.355-.45.233-.46-.888.449-.233.46.888Zm-.18-.209-.013 3.195-1-.005.013-3.194 1 .004Zm-.013 3.195a147.31 147.31 0 0 0 .003 2.539c.003.24.01.387.016.47.004.046.006.052.003.038a.49.49 0 0 0-.479-.356l.017 1a.51.51 0 0 1-.457-.27.597.597 0 0 1-.056-.151 1.304 1.304 0 0 1-.025-.18 9.21 9.21 0 0 1-.02-.535c-.007-.487-.007-1.29-.002-2.56l1 .005Zm-.457 2.691c-.056.001-.081.015-.05.004.02-.007.054-.021.102-.045a5.537 5.537 0 0 0 1.11-.765l.681.732a6.499 6.499 0 0 1-1.352.931c-.068.034-.14.065-.208.09a.852.852 0 0 1-.265.053l-.018-1Zm1.162-.806c.782-.728 1.363-1.836 1.576-3.058l.985.172c-.246 1.409-.919 2.724-1.88 3.618l-.68-.732Zm1.576-3.058c.051-.294.07-.83.07-2.687h1c0 1.81-.015 2.457-.085 2.86l-.985-.173Zm.07-2.687v-2.33h1v2.33h-1Zm.918-2.056-.32.488-.837-.549.32-.487.837.548Zm-.32.488a7.49 7.49 0 0 1-.906 1.086l-.706-.708c.3-.298.604-.665.775-.927l.837.549Zm-18.03 2.729c-.038-.038-.075-.06-.08-.062-.01-.008-.02-.013-.024-.015l-.01-.005a.035.035 0 0 1 .003.001l.013.006.113.049.443.182a1620.876 1620.876 0 0 0 12.702 5.063 55.814 55.814 0 0 0 .605.23c.02.007-.015-.006-.06-.013l-.16.987a.943.943 0 0 1-.144-.041 377.979 377.979 0 0 1-2.204-.86 1699.634 1699.634 0 0 1-11.117-4.44 56.435 56.435 0 0 1-.581-.242 1.861 1.861 0 0 1-.077-.037.534.534 0 0 1-.03-.017c-.006-.003-.043-.026-.083-.064l.692-.722Zm13.706 5.436.169.027-.161.987-.17-.027.162-.987Zm-.412.526-.014-1.312 1-.01.014 1.312-1 .01Zm-.014-1.312-.013-1.312 1-.01.013 1.312-1 .01Zm.301-.853-1.724-.688.37-.928 1.725.688-.37.928Zm-1.724-.688-1.724-.687.37-.93 1.725.689-.37.928Zm-4.839-1.922c.035.022.065.033.033.02a646.568 646.568 0 0 0-3.821-1.547l.372-.93a639.146 639.146 0 0 1 3.537 1.43 26.847 26.847 0 0 1 .318.132s.05.022.09.047l-.528.848Zm-3.788-1.528-3.773-1.509.371-.928 3.774 1.509-.372.928ZM7.73 18.545l-.014 1.318-1-.01.014-1.318 1 .01Zm-.014 1.318c-.004.36-.003.688.002.928a8.031 8.031 0 0 0 .013.33l-.005-.025a.446.446 0 0 0-.017-.058c-.004-.01-.035-.101-.121-.184l-.692.722c-.088-.084-.12-.178-.125-.192a.555.555 0 0 1-.033-.145 1.937 1.937 0 0 1-.01-.115 8.945 8.945 0 0 1-.01-.314 34.137 34.137 0 0 1-.002-.957l1 .01Zm10.562 1.671 1.423.562-.368.93-1.422-.562.367-.93Zm1.423.562 1.619.64-.37.93-1.617-.64.368-.93Zm1.619.64.195.078-.371.93-.195-.079.371-.928Zm-.49.547-.014-1.48 1-.009.013 1.48-1 .01Zm-.014-1.48-.014-1.48 1-.008.014 1.48-1 .009Zm.299-1.02-1.449-.584.374-.928 1.449.585-.374.927Zm-1.449-.584c-.395-.16-.767-.305-1.046-.41a14.27 14.27 0 0 0-.423-.152l-.008-.003.017.004c.007.001.03.005.061.007l.046-1c.058.003.107.016.116.018l.06.017c.035.01.078.025.124.041.093.032.217.078.36.132.288.108.666.256 1.067.418l-.374.928Zm-8.538-7.967.1-.04.372.928-.1.04-.372-.928Zm.472.888-.1.04-.372-.928.1-.04.372.928Zm-.819-1.639 2.353-.94.371.928-2.353.941-.37-.929Zm2.989-.694.36.744-.9.436-.36-.744.9-.436Zm4.514-2.306.903-.361.368.93-.9.36-.371-.93Zm.32.764a65.118 65.118 0 0 1 .438-.17.508.508 0 0 1 .202-.02c.02.003.171.015.3.143l-.705.71a.499.499 0 0 0 .463.133l.035-.01.01-.003.004-.001-.01.004-.075.028-.294.116-.368-.93Zm.327-.492.319.765-.923.384-.32-.765.924-.384Zm-7.703 3.439.007-.003.372.928-.007.003-.372-.928Zm0 0 .007-.003.372.928-.007.003-.372-.928Zm-.313 2.564 7.586 3.093-.377.926-7.586-3.093.377-.926Zm.303 3.95a685.212 685.212 0 0 0 3.492 1.386l.237.093.062.025.016.006.004.002h.001l-.182.466-.183.465h-.001l-.004-.002-.016-.006-.063-.025-.238-.093a614.945 614.945 0 0 1-3.497-1.388l.372-.928Zm3.818 1.514 3.246 1.316-.375.926-3.247-1.315.376-.927Zm.017.932 3.035 1.194-.366.93-3.035-1.194.366-.93Zm-3.818-8.963.01-.004.371.928-.01.004-.371-.928Zm2.63.024-2.24.897-.373-.928c.539-.216 1.347-.54 2.242-.897l.371.928Zm-2.241.897-.008.004-.371-.929.007-.003.372.928Zm-.38-.925.005-.001.003-.002.372.928-.004.002-.004.002-.371-.929Zm-.009.004.01-.004.371.928a.393.393 0 0 0-.01.004l-.371-.928Zm-.482 3.386 2.659 1.07-.373.927-2.66-1.07.374-.927Zm2.659 1.07 5.065 2.036-.373.928-5.065-2.037.373-.928Zm-.271.957c.002.001.002.002 0 0a.133.133 0 0 0-.014-.003l-.004-.001.205-.98c.07.016.134.037.175.052l-.362.932Zm-.018-.004c-.018-.004.023.008.09-.002a.47.47 0 0 0 .39-.46h-1a.53.53 0 0 1 .468-.53.75.75 0 0 1 .257.013l-.205.979Z"
      fill="#080914"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.212 5.732c.989.525 1.539 1.409 1.53 2.459l-.004.31.403.167c.518.216.73.361 1.124.767.668.69 1.02 1.653.93 2.543l-.03.294c-.075.938-.654 1.515-.828 1.686-.174.17-.817.688-1.235.844-1.29.482-2.657.167-3.62-.834-.504-.526-.9-1.56-.875-2.292-.027-.527.044-.766.212-1.164.027-.006.075-.09.107-.185.079-.234.35-.622.646-.92a3.179 3.179 0 0 1 1.883-.938c.445-.055.436-.04.364-.614-.083-.666-.638-1.261-1.425-1.528-.25-.084-.315-.129-.39-.265a.471.471 0 0 1 .065-.524c.146-.177.58-.104 1.143.194Zm.632 4.754c.16-.007.333-.235.512-.673l.174-.428.25.087c.575.2 1.046.649 1.322 1.26.183.406.24.727.21 1.183-.055.81-.502 1.499-1.23 1.898-.633.347-1.27.406-1.942.18-1.189-.4-1.876-1.667-1.548-2.855.198-.713.606-1.242 1.193-1.546.245-.126.717-.277.79-.253.016.005-.041.168-.126.362-.147.337-.15.361-.07.522a.495.495 0 0 0 .465.263Z"
      fill="#080914"
    />
    <Path
      d="m16.212 5.732.234-.441-.234.441Zm1.53 2.459-.5-.005.5.005Zm-.004.31-.192.46-.31-.129.002-.336.5.004Zm.403.167.192-.461-.192.461Zm1.124.767.358-.349-.358.349Zm.93 2.543.497.051-.497-.05Zm-.03.294-.5-.04.002-.011.497.05Zm-6.346-1.76-.46-.195.099-.233.247-.058.114.486Zm.753-1.106.356.352-.356-.352Zm1.883-.937.061.496-.061-.496Zm.364-.614.496-.061-.496.061Zm-1.425-1.528.16-.473-.16.473Zm-.39-.265-.438.24.439-.24Zm.065-.524.386.318-.386-.318Zm2.287 4.275.463.189-.463-.189Zm-.512.673.022.5-.022-.5Zm-.465-.263.447-.223-.447.223Zm.07-.522-.458-.2.458.2Zm-.664-.109-.23-.444.23.444Zm-1.193 1.546.482.133-.482-.133Zm1.548 2.855.16-.474-.16.474Zm1.942-.18-.24-.438.24.438Zm1.23-1.898-.5-.034.5.034Zm-.21-1.183.455-.206-.455.206Zm-1.323-1.26-.164.472.164-.472Zm-.249-.087-.463-.188.18-.44.448.156-.165.472Zm.572 5.417.175.468-.175-.468Zm-3.62-.834.361-.347-.36.347Zm-.875-2.292.5-.026V11.692l-.5-.016Zm2.839-6.385c1.14.604 1.806 1.652 1.795 2.904l-1-.009c.008-.848-.426-1.568-1.264-2.012l.469-.883Zm1.795 2.904-.003.31-1-.01.003-.309 1 .009Zm-.31-.156.402.168-.385.923-.402-.168.385-.923Zm.402.168c.272.113.49.219.698.36.208.142.386.307.592.52l-.717.696a2.84 2.84 0 0 0-.438-.39 2.809 2.809 0 0 0-.52-.264l.385-.922Zm1.29.88c.763.786 1.176 1.893 1.069 2.942l-.995-.102c.075-.73-.217-1.552-.791-2.144l.718-.697Zm1.069 2.942-.03.294-.995-.102.03-.294.995.102Zm-6.987-2.003a.47.47 0 0 0-.261.168.11.11 0 0 0-.006.01l.005-.01a.259.259 0 0 0 .01-.025l.948.317c-.025.075-.059.15-.097.217a.77.77 0 0 1-.082.118c-.016.018-.114.137-.288.178l-.229-.973Zm-.253.143c.062-.185.182-.387.306-.565.13-.186.29-.38.458-.55l.712.704a3.362 3.362 0 0 0-.35.42c-.106.15-.161.259-.177.308l-.949-.317Zm.764-1.114a3.679 3.679 0 0 1 2.177-1.082l.123.992a2.68 2.68 0 0 0-1.588.793l-.712-.703Zm2.177-1.082c.06-.007.101-.012.138-.018a.653.653 0 0 0 .057-.01c.005 0-.022.005-.059.027a.36.36 0 0 0-.128.13.323.323 0 0 0-.044.119c-.002.014 0 .015-.001-.01a1.8 1.8 0 0 0-.01-.11l-.023-.184.992-.123c.017.131.034.263.04.367a.793.793 0 0 1-.094.451.672.672 0 0 1-.43.304c-.098.025-.223.038-.315.05l-.123-.993Zm-.07-.056c-.053-.426-.432-.893-1.09-1.116l.32-.947c.917.31 1.65 1.034 1.762 1.94l-.992.123Zm-1.09-1.116a1.556 1.556 0 0 1-.38-.174.893.893 0 0 1-.287-.325l.877-.48c.01.018.01.016.003.007a.157.157 0 0 0-.03-.028l.02.009c.024.01.06.024.118.044l-.32.947Zm-.667-.499a.97.97 0 0 1 .117-1.082l.772.636c-.005.006-.004.008-.003.003 0-.006 0-.02-.009-.037l-.877.48Zm.117-1.082c.257-.312.657-.295.885-.256.27.046.571.164.878.327l-.469.883a2.086 2.086 0 0 0-.576-.224c-.063-.01-.084-.006-.077-.007a.243.243 0 0 0 .131-.087l-.772-.636Zm3.136 4.782a2.724 2.724 0 0 1-.328.612c-.11.143-.314.358-.625.371l-.044-.999a.274.274 0 0 0-.143.044c-.014.01-.007.008.016-.022.047-.062.116-.183.198-.384l.926.378Zm-.953.983a.995.995 0 0 1-.934-.538l.894-.447c-.006-.012-.012-.016-.011-.015l.007.001.044 1Zm-.934-.538c-.043-.085-.13-.253-.1-.486.022-.155.098-.322.159-.46l.916.4a4.31 4.31 0 0 0-.086.21l.003-.017a.273.273 0 0 0-.009-.112l-.004-.014a.824.824 0 0 0 .015.032l-.895.447Zm.059-.946c.04-.09.07-.167.087-.217l.01-.03a.296.296 0 0 0-.009.068.497.497 0 0 0 .338.491l.317-.948a.504.504 0 0 1 .344.51.632.632 0 0 1-.017.112c-.01.044-.026.09-.04.128-.028.08-.068.182-.114.287L15.99 9.5Zm.427.312a.437.437 0 0 0 .162.022c.006 0 0 0-.019.004a2.785 2.785 0 0 0-.547.197l-.459-.888a3.74 3.74 0 0 1 .795-.286c.039-.009.085-.017.132-.022.023-.002.133-.015.252.025l-.317.948Zm-.403.223c-.448.232-.776.639-.94 1.236l-.964-.267c.229-.83.718-1.482 1.444-1.857l.46.888Zm-.94 1.236c-.256.924.28 1.93 1.225 2.247l-.319.948c-1.434-.482-2.272-2.011-1.87-3.462l.963.266Zm1.225 2.247c.536.18 1.029.136 1.541-.144l.481.877c-.752.412-1.535.486-2.341.215l.319-.948Zm1.541-.144c.583-.32.929-.86.972-1.494l.997.068c-.066.984-.615 1.824-1.488 2.303l-.48-.877Zm.972-1.494a1.735 1.735 0 0 0-.167-.943l.911-.412c.219.483.29.887.253 1.423l-.997-.068Zm-.167-.943c-.226-.5-.598-.843-1.031-.994L17.944 9c.719.25 1.287.804 1.613 1.526l-.91.412Zm-1.031-.994-.25-.087.33-.944.249.087-.33.944Zm.378-.37-.174.428-.926-.378.174-.427.926.377Zm1.694 4.74c-.11.11-.336.297-.583.476-.24.174-.55.377-.826.48l-.35-.937c.14-.053.36-.186.59-.353.223-.161.406-.317.47-.38l.7.715Zm-1.41.956c-1.478.553-3.056.188-4.155-.956l.721-.693c.826.859 1.984 1.124 3.084.712l.35.937Zm-4.155-.956c-.312-.325-.568-.78-.743-1.236-.174-.457-.287-.967-.271-1.419l1 .034c-.01.28.062.653.206 1.028.143.375.337.7.53.9l-.722.693Zm6.54-2.003c-.089 1.13-.784 1.817-.975 2.004l-.7-.714c.158-.155.62-.621.679-1.369l.997.08Zm-7.554-.61a2.963 2.963 0 0 1 .042-.754c.045-.226.122-.423.209-.63l.92.39a2.235 2.235 0 0 0-.149.437 1.983 1.983 0 0 0-.023.506l-.999.051Z"
      fill="#080914"
    />
  </Svg>
)

export default SweetsWorkIcon