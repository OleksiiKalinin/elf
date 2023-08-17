import * as React from "react"
import { Svg,  SvgProps, Rect, Path } from "react-native-svg"

const FloweryWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
        {...props}
    fill="none"
  >
    <Rect width={34} height={34} rx={17} fill="#D3FCB8" />
    <Path
      d="M18.5 17a1 1 0 0 0-2 0h2Zm-2 13a1 1 0 1 0 2 0h-2Zm0-13v13h2V17h-2Z"
      fill="#080914"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.079 3.058a3.318 3.318 0 0 0-.54.205c-.252.123-.382.218-.654.482-.29.282-.363.38-.51.676-.193.39-.284.769-.284 1.176 0 .367.065.972.146 1.362.037.177.065.324.063.327a6.403 6.403 0 0 1-.352-.188c-.352-.196-1.152-.522-1.456-.593a2.677 2.677 0 0 0-.972-.045A2.615 2.615 0 0 0 8.536 7.86c-.223.443-.29.766-.264 1.276l.02.398-.181.194c-.229.246-.376.498-.506.868-.091.258-.103.346-.105.766-.002.398.012.517.085.747.146.46.324.75.674 1.097.36.358.699.544 1.282.708.361.1 1.103.235 1.299.235.066 0 .127.008.137.017.01.01-.177.21-.415.447-.932.924-1.237 1.5-1.24 2.342-.001.572.126.988.447 1.464.37.547 1.047.974 1.695 1.07.147.02.168.039.277.232.255.45.626.794 1.108 1.024.388.186.696.254 1.152.254.456 0 .764-.068 1.152-.254.403-.193.678-.42.962-.79.255-.333.623-.953.77-1.296.049-.114.098-.208.108-.208.01 0 .085.143.167.317.338.717.773 1.34 1.162 1.66.258.212.72.44 1.05.515.343.08.926.073 1.271-.013.687-.172 1.298-.637 1.614-1.226l.099-.184.29-.059c.925-.187 1.695-.918 1.951-1.85.088-.32.089-.956.002-1.274-.151-.552-.449-.993-1.149-1.7a6.51 6.51 0 0 1-.437-.464c0-.013.057-.024.127-.024.2 0 .938-.133 1.304-.235.584-.164.922-.35 1.283-.708.478-.474.72-.992.767-1.642.05-.708-.21-1.446-.67-1.897l-.13-.127.021-.389c.025-.44-.018-.723-.165-1.087a2.615 2.615 0 0 0-1.243-1.343c-.44-.216-.708-.276-1.22-.274-.38.002-.468.015-.798.121-.449.145-.93.35-1.287.548-.146.082-.274.14-.285.13-.01-.01.009-.154.042-.32.194-.96.172-1.799-.06-2.342a3.04 3.04 0 0 0-.58-.848c-.505-.496-1.106-.736-1.846-.737-.417 0-.697.058-1.048.218l-.232.106-.233-.106a3.239 3.239 0 0 0-.453-.162c-.279-.07-.924-.07-1.228.002Zm1.514 1.32a2.192 2.192 0 0 0-.401-.21c-.24-.088-.687-.099-.937-.022a1.573 1.573 0 0 0-.876.738c-.149.292-.187.525-.16.992.075 1.356.553 2.57 1.445 3.675.102.126.204.222.228.212.023-.01.154-.053.292-.096l.251-.079a3.572 3.572 0 0 1 1.115-.004l.303.097c.166.054.305.094.31.088.003-.005.11-.146.238-.312.79-1.027 1.207-2.038 1.343-3.25.026-.224.037-.546.026-.717a1.457 1.457 0 0 0-.483-1.017c-.287-.255-.535-.355-.924-.374-.387-.018-.59.038-.931.26-.204.131-.262.152-.44.152-.175 0-.231-.018-.4-.134ZM14.12 9.371c-.714-.799-1.912-1.55-2.846-1.785a2.045 2.045 0 0 0-.41-.065 1.537 1.537 0 0 0-1.347.854c-.16.334-.178.61-.068 1.05l.085.342-.081.164a.77.77 0 0 1-.23.266 1.41 1.41 0 0 0-.495.598c-.104.215-.115.273-.114.585 0 .406.085.658.313.941.264.328.646.504 1.45.667.462.094 1.46.13 1.957.07a7.901 7.901 0 0 0 1.481-.34l.372-.124v-.643c.084-.486.17-.705.351-1.045.034 0 .373-.45.373-.494 0-.053-.52-.738-.791-1.041Zm10.42.05c.247-.866-.27-1.704-1.15-1.867-.361-.066-.61-.024-1.176.2a6.55 6.55 0 0 0-2.368 1.64c-.247.277-.772.971-.772 1.02 0 .045.341.492.375.492.196.368.277.593.35 1.047l-.011.303c-.008.217.002.31.037.332.098.062.952.32 1.311.396.275.058.556.083 1.078.097.613.017.769.01 1.178-.059.59-.098 1.112-.257 1.345-.408.228-.148.44-.41.549-.678.067-.166.085-.282.086-.558.001-.33-.006-.363-.138-.624a1.423 1.423 0 0 0-.316-.43l-.278-.245c-.167-.146-.195-.328-.1-.658Zm-6.342 1.725a1.56 1.56 0 0 0-.68-.42c-.438-.145-1.03-.078-1.412.159-.2.124-.463.397-.574.598-.462.832-.13 1.831.75 2.258.247.12.311.134.632.147.54.02.931-.128 1.284-.489a1.605 1.605 0 0 0 0-2.253ZM14.9 14.1c-.01-.026-.09-.14-.176-.253-.087-.114-.176-.206-.199-.205-.066.002-.803.235-1.015.32a7.05 7.05 0 0 0-1.723 1.01c-.542.444-1.114 1.108-1.254 1.457-.227.565-.08 1.187.378 1.612.296.275.5.353 1.027.394.437.034.495.085.707.61.118.294.39.576.699.725.233.113.269.12.657.12.389 0 .423-.007.659-.12.314-.152.565-.418.878-.933.39-.644.629-1.251.79-2.016.055-.26.081-.559.096-1.106l.02-.749-.307-.099a2.364 2.364 0 0 0-.314-.089c-.436-.173-.63-.326-.923-.678Zm8.298 1.903c-.772-1.007-1.906-1.794-3.158-2.193-.648-.207-.595-.211-.794.063-.095.13-.172.245-.172.257-.281.304-.5.457-.91.648a2.318 2.318 0 0 0-.316.09l-.307.099.02.748c.036 1.267.279 2.119.892 3.13.307.506.56.774.873.925.235.113.27.12.658.12.366 0 .431-.01.622-.098.385-.177.69-.527.812-.933.057-.191.286-.408.434-.411.802-.019 1.262-.265 1.551-.829.27-.524.197-1.093-.205-1.616Z"
      fill="#080914"
    />
    <Path
      d="m15.079 3.058-.092-.39.092.39Zm-.54.205-.173-.36.174.36Zm-.654.482-.279-.287.28.287Zm-.51.676-.358-.178.358.178Zm-.138 2.538.392-.082-.392.082Zm.063.327-.276-.29-.002.002.278.288Zm-.352-.188.195-.35-.195.35Zm-1.456-.593.092-.39-.091.39Zm-.972-.045-.056-.396.056.396ZM8.536 7.86l.357.18-.357-.18Zm-.264 1.276-.4.02.4-.02Zm.02.398.293.273.115-.124-.009-.17-.4.021Zm-.181.194-.293-.273.293.273Zm-.506.868.377.133-.377-.133Zm-.105.766.4.001-.4-.001Zm.085.747-.382.12.382-.12Zm.674 1.097-.282.284.282-.284Zm1.282.708.108-.386-.108.386Zm1.436.252.28-.285-.28.285Zm-.415.447-.282-.284.282.284Zm-1.24 2.342.4.002-.4-.002Zm.447 1.464.332-.224-.332.224Zm1.695 1.07-.058.395.058-.396Zm.277.232-.348.196.348-.196Zm1.108 1.024-.173.361.173-.36Zm2.304 0-.173-.36.173.36Zm.962-.79.318.243-.318-.243Zm.77-1.296-.368-.157.368.157Zm.275.109.362-.17-.362.17Zm1.162 1.66-.254.309.254-.309Zm1.05.515-.09.39.09-.39Zm1.271-.013.098.388-.098-.388Zm1.614-1.226-.353-.189.353.19Zm.099-.184-.08-.392-.184.038-.089.165.353.19Zm.29-.059.08.392-.08-.392Zm1.951-1.85-.386-.106.386.106Zm.002-1.274.386-.105-.386.105Zm-1.149-1.7.284-.281-.284.281Zm.994-.723-.108-.386.108.386Zm1.283-.708.281.284-.281-.284Zm.767-1.642.398.029-.398-.029Zm-.67-1.897.28-.286-.28.286Zm-.13-.127-.4-.023-.01.181.13.127.28-.285Zm.021-.389.4.023-.4-.023Zm-.165-1.087.37-.15-.37.15Zm-1.243-1.343.177-.359-.177.36Zm-1.22-.274-.001-.4.002.4Zm-.798.121.123.381-.123-.38Zm-1.287.548-.194-.35.194.35Zm-.285.13-.28.285.28-.285Zm.042-.32-.392-.08.392.08Zm-.06-2.342-.368.157.368-.157Zm-.58-.848-.28.286.28-.286ZM18.274 3v.4V3Zm-1.048.218.166.363-.166-.363Zm-.232.106-.166.363.166.076.166-.076-.166-.363Zm-.233-.106-.166.363.166-.363Zm-.453-.162-.098.387.098-.387Zm-.115 1.112.137-.376-.137.376Zm.4.21.227-.33-.226.33Zm.4.133v-.4.4Zm.44-.153-.218-.335.218.335Zm.93-.259.02-.4-.02.4Zm.925.374-.265.299.265-.3Zm.483 1.017.4-.026-.4.026Zm-.026.717.398.045-.398-.045Zm-1.343 3.25-.317-.243.317.243Zm-.548.224-.123.381.123-.38Zm-.303-.097.123-.381-.035-.011-.036-.005-.052.397Zm-1.115.004-.053-.396-.034.004-.032.01.12.382Zm-.25.079-.12-.382.12.382Zm-.293.096-.155-.369.155.369Zm-.228-.212-.31.252.31-.252Zm-1.446-3.675-.4.022.4-.022Zm.161-.992-.356-.182.356.182Zm.876-.738-.117-.383.117.383Zm-3.981 3.441.097-.388-.097.388Zm2.846 1.785.298-.266-.298.266Zm.418 1.535v-.4h-.24l-.113.212.353.188Zm-.351 1.045-.394-.069-.006.034v.035h.4Zm0 .643.126.38.274-.091v-.289h-.4Zm-.372.123-.126-.38.126.38Zm-1.48.342-.048-.397.047.397Zm-1.958-.07-.08.391h.001l.08-.392Zm-1.45-.668-.312.251.312-.25Zm-.313-.941h-.4.4Zm.114-.585.36.174-.36-.174Zm.495-.598-.225-.33.225.33Zm.23-.266.359.178-.36-.178Zm.081-.164.359.177.065-.132-.036-.142-.388.097Zm-.085-.342-.388.097.388-.097Zm.068-1.05.36.172-.36-.172Zm1.347-.854.012.4-.012-.4Zm12.525.033.073-.393-.073.393Zm1.15 1.867-.384-.11.385.11Zm.1.658-.263.3v.001l.264-.3Zm.28.245-.264.3.263-.3Zm.315.43.357-.18-.357.18Zm.138.624-.4-.002.4.002Zm-.086.558.37.15-.37-.15Zm-.549.678-.218-.335.218.335Zm-1.345.408-.066-.394.066.394Zm-1.178.06-.01.4.01-.4Zm-1.078-.098.083-.392-.083.392Zm-1.311-.396-.214.338.214-.338Zm-.037-.332-.4-.015.4.015Zm.01-.303.4.015.002-.039-.006-.038-.395.063Zm-.348-1.047.353-.188-.113-.212h-.24v.4Zm.396-1.512-.298-.266.298.266Zm2.368-1.64.147.372-.147-.372Zm-4.697 2.971-.125.38.125-.38Zm.68.421-.285.28.286-.28Zm0 2.253-.285-.28.286.28Zm-1.283.489.016-.4-.016.4Zm-.632-.147-.174.36.174-.36Zm-.75-2.258.35.194-.35-.194Zm.574-.598-.21-.34.21.34Zm-1.382 2.96.318-.242-.318.243Zm.176.254-.373.146.024.06.041.05.308-.256Zm.923.678-.147.372.293.116.181-.258-.327-.23Zm.314.09.123-.381-.123.38Zm.307.098.4.011.008-.3-.285-.091-.123.38Zm-.02.75.4.01-.4-.01Zm-.096 1.105.392.083-.392-.083Zm-.79 2.015.341.208-.341-.207Zm-.878.934-.174-.36.174.36Zm-1.316 0-.174.36.174-.36Zm-.7-.724-.37.149.37-.15Zm-.706-.611.031-.399-.03.399Zm-1.027-.394-.272.293.272-.293Zm-.378-1.612-.372-.149.372.15Zm1.254-1.456.253.31-.253-.31Zm1.723-1.012.148.372-.148-.372Zm1.015-.32-.016-.399.016.4Zm5.515.169-.121.38.121-.38Zm3.158 2.193-.317.243.317-.243Zm.205 1.616-.356-.182.356.182Zm-1.551.829-.01-.4.01.4Zm-.434.41-.383-.114.383.115Zm-.812.934.167.363-.167-.363Zm-1.28-.022.174-.36-.174.36Zm-.873-.926.342-.207-.342.207Zm-.891-3.129.4-.01-.4.01Zm-.021-.748-.123-.381-.286.092.009.3.4-.011Zm.307-.1.123.38-.123-.38Zm.316-.089-.31.254.198.24.28-.131-.168-.363Zm.91-.648.294.271.106-.115v-.156h-.4Zm.172-.258-.324-.235.324.236ZM14.986 2.67a3.676 3.676 0 0 0-.62.234l.348.72c.16-.077.373-.156.457-.176l-.184-.778Zm-.62.234c-.303.146-.467.271-.76.555l.558.574c.25-.244.346-.31.55-.409l-.348-.72Zm-.76.555a3.365 3.365 0 0 0-.349.378 2.43 2.43 0 0 0-.24.407l.717.355c.07-.14.111-.213.162-.28.053-.07.125-.147.268-.286l-.558-.574Zm-.59.785a2.985 2.985 0 0 0-.325 1.354h.8c0-.341.075-.66.243-.999l-.717-.355Zm-.325 1.354c0 .396.068 1.03.154 1.443l.784-.163a7.596 7.596 0 0 1-.138-1.28h-.8Zm.154 1.443a14.364 14.364 0 0 1 .057.285v.004a.311.311 0 0 1-.002-.068.398.398 0 0 1 .124-.265l.552.58c.089-.086.11-.186.113-.199a.406.406 0 0 0 .01-.068c.002-.023 0-.042 0-.048a.848.848 0 0 0-.009-.069 15.885 15.885 0 0 0-.062-.315l-.783.163Zm.177-.042a.4.4 0 0 1 .188-.102c.043-.01.08-.01.1-.01a.398.398 0 0 1 .128.025l.015.006a.143.143 0 0 1 .006.002l-.008-.003a18.095 18.095 0 0 1-.309-.167l-.388.699a18.287 18.287 0 0 0 .37.198l.032.014a.414.414 0 0 0 .233.016.4.4 0 0 0 .189-.103l-.556-.575Zm.12-.25a8.152 8.152 0 0 0-.789-.364 6.23 6.23 0 0 0-.768-.269l-.185.779c.12.028.37.117.651.231.277.113.548.237.703.323l.389-.7Zm-1.557-.633a3.077 3.077 0 0 0-1.121-.051l.113.792c.265-.038.559-.025.823.038l.184-.779Zm-1.121-.051A3.015 3.015 0 0 0 8.178 7.68l.715.36c.32-.636.942-1.08 1.684-1.185l-.113-.792ZM8.178 7.68c-.255.507-.335.9-.306 1.476l.8-.04c-.023-.443.03-.697.221-1.076l-.715-.36Zm-.306 1.476.02.398.8-.04-.02-.398-.8.04ZM8 9.262l-.18.194.585.546.18-.194L8 9.262Zm-.18.194a2.699 2.699 0 0 0-.592 1.008l.755.266c.115-.327.236-.53.422-.728l-.586-.546Zm-.592 1.008a1.93 1.93 0 0 0-.104.401 3.879 3.879 0 0 0-.023.496l.8.003c0-.212.005-.314.015-.39.01-.067.025-.124.067-.244l-.755-.266Zm-.127.897c-.002.416.012.583.103.87l.763-.242c-.055-.173-.068-.245-.066-.625l-.8-.003Zm.103.87c.167.523.38.87.774 1.26l.563-.568a2.023 2.023 0 0 1-.574-.934l-.763.242Zm.774 1.26c.418.414.82.63 1.457.809l.215-.77c-.53-.15-.804-.305-1.109-.607l-.563.568Zm1.457.809c.197.055.487.117.747.164.247.045.518.086.659.086v-.8a8.41 8.41 0 0 1-1.19-.22l-.216.77Zm1.406.25.04.002-.016-.003a.328.328 0 0 1-.088-.036.387.387 0 0 1-.078-.06l.559-.572a.418.418 0 0 0-.2-.109 1.162 1.162 0 0 0-.218-.022v.8Zm-.143-.097a.398.398 0 0 1-.086-.444c.014-.032.029-.053.03-.055.007-.01.01-.012.002-.003a11.338 11.338 0 0 1-.363.378l.563.569c.122-.121.232-.234.312-.32.04-.042.075-.082.102-.114a.801.801 0 0 0 .045-.06.41.41 0 0 0 .072-.187.402.402 0 0 0-.117-.335l-.56.57Zm-.417-.123c-.476.472-.819.88-1.04 1.299-.227.43-.316.85-.318 1.326l.8.002c.002-.365.067-.654.225-.954.165-.312.44-.653.896-1.105l-.563-.568Zm-1.358 2.625c-.002.652.15 1.147.516 1.689l.663-.448a1.982 1.982 0 0 1-.379-1.239l-.8-.002Zm.516 1.689a3.022 3.022 0 0 0 1.968 1.241l.117-.791a2.224 2.224 0 0 1-1.422-.898l-.663.448Zm1.968 1.241a.746.746 0 0 1 .03.005.199.199 0 0 1-.037-.015.229.229 0 0 1-.06-.048l.002.003.02.032.032.056.696-.393c-.043-.077-.11-.203-.215-.29-.133-.111-.28-.13-.351-.141l-.117.791Zm-.013.034c.296.524.73.924 1.283 1.188l.345-.721a2.062 2.062 0 0 1-.932-.861l-.696.394Zm1.283 1.188a2.8 2.8 0 0 0 1.325.293v-.8c-.4 0-.648-.056-.98-.214l-.345.721Zm1.325.293c.513 0 .88-.08 1.325-.293l-.346-.721c-.33.158-.579.214-.979.214v.8Zm1.325-.293c.462-.222.786-.49 1.107-.908l-.636-.486a2.07 2.07 0 0 1-.817.672l.346.722Zm1.107-.908a8.112 8.112 0 0 0 .82-1.381l-.736-.315a7.37 7.37 0 0 1-.72 1.21l.636.486Zm.82-1.381c.021-.051.042-.094.055-.12l.007-.013s-.01.016-.027.035a.376.376 0 0 1-.14.1.398.398 0 0 1-.174.032l.037-.8a.403.403 0 0 0-.325.14.488.488 0 0 0-.044.06 1.017 1.017 0 0 0-.044.077c-.025.049-.054.11-.081.174l.736.315Zm-.279.034a.4.4 0 0 1-.259-.113c-.02-.02-.033-.036-.036-.04-.008-.012-.012-.019-.01-.014a5.335 5.335 0 0 1 .128.255l.725-.341a6.063 6.063 0 0 0-.168-.329.635.635 0 0 0-.078-.101.403.403 0 0 0-.264-.116l-.038.799Zm-.176.087c.35.744.817 1.425 1.27 1.799l.509-.617c-.325-.268-.73-.831-1.055-1.522l-.724.34Zm1.27 1.799c.305.252.825.507 1.213.596l.18-.78a2.603 2.603 0 0 1-.884-.433l-.509.617Zm1.213.596c.214.05.48.068.73.066.25-.003.516-.028.73-.081l-.195-.776c-.132.033-.33.055-.544.057a2.489 2.489 0 0 1-.541-.045l-.18.78Zm1.46-.015c.788-.198 1.496-.73 1.868-1.424l-.705-.379c-.259.484-.773.88-1.358 1.027l.195.776Zm1.868-1.424.1-.185-.706-.378-.099.184.705.379Zm-.174.018.291-.059-.159-.784-.29.06.158.783Zm.291-.059c1.077-.218 1.962-1.063 2.257-2.136l-.772-.212c-.217.791-.872 1.408-1.644 1.564l.16.784Zm2.257-2.136c.057-.21.08-.49.08-.743a3.01 3.01 0 0 0-.078-.742l-.772.21c.03.11.05.307.05.53 0 .225-.021.423-.052.533l.772.212Zm.002-1.486c-.178-.65-.533-1.15-1.25-1.875l-.57.563c.684.69.924 1.07 1.048 1.523l.772-.21Zm-1.25-1.875a17.571 17.571 0 0 1-.387-.403c-.01-.011-.012-.015-.011-.014l.003.005a.371.371 0 0 1 .054.107c.007.02.02.064.02.122h-.8c0 .098.037.17.04.176a.423.423 0 0 0 .054.085 4.73 4.73 0 0 0 .142.16c.082.086.194.202.316.325l.568-.563Zm-.322-.183a.394.394 0 0 1-.23.357c-.034.015-.059.02-.06.02h.017v-.8a.913.913 0 0 0-.163.013.529.529 0 0 0-.114.034.406.406 0 0 0-.25.376h.8Zm-.273.376c.142 0 .413-.04.661-.086.26-.047.55-.108.75-.164l-.215-.77a8.378 8.378 0 0 1-1.196.22v.8Zm1.412-.25c.637-.178 1.038-.395 1.456-.81l-.563-.567c-.304.302-.578.458-1.109.606l.216.77Zm1.456-.81c.545-.539.831-1.147.884-1.896l-.797-.057c-.04.549-.238.977-.65 1.386l.563.568Zm.884-1.896c.059-.812-.236-1.67-.789-2.212l-.56.572c.367.36.595.978.552 1.583l.797.057Zm-.789-2.212-.13-.127-.56.571.13.128.56-.572Zm-.01.181.022-.388-.8-.046-.021.389.799.045Zm.022-.388c.027-.492-.022-.835-.194-1.26l-.742.3c.123.303.159.526.137.915l.799.045Zm-.194-1.26a3.014 3.014 0 0 0-1.437-1.552l-.353.718c.46.226.852.649 1.048 1.133l.742-.299Zm-1.437-1.552a2.979 2.979 0 0 0-.672-.25 3.176 3.176 0 0 0-.726-.065l.003.8c.24-.001.402.013.547.046.145.032.29.087.495.187l.353-.718Zm-1.398-.315c-.19 0-.333.004-.476.026-.146.022-.276.06-.443.115l.245.761c.163-.052.241-.073.318-.085.078-.012.17-.016.36-.017l-.004-.8Zm-.92.14a8.03 8.03 0 0 0-1.358.58l.388.699a7.234 7.234 0 0 1 1.216-.517l-.245-.761Zm-1.358.58a2.47 2.47 0 0 1-.165.084c-.021.01-.029.012-.026.011a.206.206 0 0 1 .044-.01.375.375 0 0 1 .184.015c.04.013.098.04.152.093l-.56.572a.405.405 0 0 0 .355.109.522.522 0 0 0 .081-.02 1.1 1.1 0 0 0 .101-.042c.064-.029.142-.069.222-.113l-.388-.7Zm.19.194a.397.397 0 0 1 .116.267v.006l.001-.01.004-.028c.006-.047.017-.115.032-.191l-.784-.158a3.76 3.76 0 0 0-.042.245 1.33 1.33 0 0 0-.01.103.575.575 0 0 0 .013.145c.004.018.026.11.109.19l.56-.57Zm.153.044c.2-.992.194-1.926-.084-2.578l-.736.314c.186.434.223 1.178.036 2.106l.784.158Zm-.084-2.578a3.427 3.427 0 0 0-.667-.977l-.56.572c.177.173.395.493.491.719l.736-.314ZM20.4 3.45c-.584-.573-1.287-.85-2.126-.851l-.001.8c.64 0 1.139.203 1.567.623l.56-.572ZM18.274 2.6c-.47 0-.808.068-1.215.254l.332.727c.294-.134.517-.182.882-.181v-.8Zm-1.215.254-.232.106.332.727.232-.106-.332-.727Zm.1.106-.232-.106-.333.727.233.106.332-.727Zm-.232-.106a3.626 3.626 0 0 0-.522-.186l-.197.775c.097.025.278.089.386.138l.332-.727Zm-.522-.186a3.136 3.136 0 0 0-.704-.064c-.245 0-.518.019-.714.065l.184.778a2.71 2.71 0 0 1 .532-.043c.226 0 .416.017.506.04l.196-.776Zm-.351 1.875c.079.03.23.108.312.164l.453-.66a2.584 2.584 0 0 0-.49-.255l-.275.751Zm.312.164c.086.06.182.122.297.16.121.04.233.044.33.044l-.002-.8c-.077 0-.081-.005-.074-.003 0 0-.016-.004-.098-.06l-.453.66Zm.628.204a.996.996 0 0 0 .34-.05c.113-.039.215-.102.315-.167l-.435-.671a.841.841 0 0 1-.143.083c-.002 0-.004.002-.011.002a.621.621 0 0 1-.069.003l.003.8Zm.655-.217c.155-.1.252-.145.338-.17.085-.023.185-.033.357-.025l.038-.8a1.877 1.877 0 0 0-.61.055 2.008 2.008 0 0 0-.558.269l.435.671Zm.694-.195c.164.008.277.032.37.07.094.037.19.097.309.203l.53-.599a1.853 1.853 0 0 0-.54-.346c-.199-.08-.405-.116-.63-.127l-.039.799Zm.679.273c.205.182.33.436.35.743l.798-.05a1.857 1.857 0 0 0-.618-1.292l-.53.599Zm.35.743c.008.142-.002.44-.025.647l.795.09c.027-.24.04-.587.028-.788l-.799.051Zm-.025.647c-.128 1.136-.516 2.079-1.263 3.052l.634.487c.83-1.081 1.279-2.16 1.424-3.45l-.795-.089Zm-1.263 3.052c-.121.158-.239.31-.249.325l.655.46.011-.015.052-.067.165-.216-.634-.487Zm-.249.325a.399.399 0 0 1 .325-.17c.028 0 .049.004.053.004l.013.003a6.253 6.253 0 0 1-.25-.075l-.246.761a6.98 6.98 0 0 0 .315.093c.011.003.03.007.052.01.008.001.033.005.063.005.014 0 .047 0 .088-.01.022-.005.151-.032.242-.16l-.655-.46Zm.14-.238-.302-.098-.246.761.303.098.246-.761Zm-1.66-.095-.25.079.239.763.25-.078-.238-.764Zm-.25.079c-.128.04-.283.09-.328.109l.31.738.01-.004.063-.02c.05-.017.116-.039.184-.06l-.24-.763Zm-.328.11a.39.39 0 0 1 .281-.008c.036.013.058.028.063.031.012.008.013.01 0-.003a1.208 1.208 0 0 1-.106-.115l-.622.503c.06.073.124.143.182.198a.833.833 0 0 0 .105.084.416.416 0 0 0 .406.046l-.31-.737Zm.238-.095c-.842-1.043-1.286-2.178-1.357-3.446l-.8.044c.082 1.444.593 2.738 1.535 3.905l.622-.503Zm-1.357-3.446c-.024-.425.011-.58.117-.788l-.712-.364c-.192.376-.233.687-.204 1.196l.799-.044Zm.117-.788c.12-.235.39-.462.638-.538l-.235-.765a1.97 1.97 0 0 0-1.115.939l.712.364Zm.638-.538c.068-.02.195-.036.345-.033.15.004.273.025.336.048l.275-.75a1.935 1.935 0 0 0-.592-.098 1.98 1.98 0 0 0-.599.068l.235.765Zm-4.197 3.447c.849.213 1.98.917 2.646 1.663l.596-.532c-.76-.852-2.026-1.65-3.047-1.907l-.195.776Zm2.646 1.663a11.178 11.178 0 0 1 .725.935l-.001-.002a.286.286 0 0 1-.014-.033c-.003-.01-.02-.058-.02-.125h.8a.42.42 0 0 0-.047-.192 2.36 2.36 0 0 0-.111-.179 11.845 11.845 0 0 0-.736-.937l-.597.533Zm.69.775a.387.387 0 0 1 .029-.147l.008-.016a3.333 3.333 0 0 1-.26.346l-.006.007.005-.004a.307.307 0 0 1 .069-.048.383.383 0 0 1 .181-.044v.8a.408.408 0 0 0 .253-.087.565.565 0 0 0 .054-.048c.025-.024.05-.052.07-.076a4.01 4.01 0 0 0 .33-.452.625.625 0 0 0 .03-.059c.002-.005.037-.078.037-.172h-.8Zm-.725 1.539v.321h.8v-.321h-.8Zm0 .321v.322h.8v-.322h-.8Zm.274-.058-.372.124.252.759.372-.123-.252-.76Zm-.372.124a7.509 7.509 0 0 1-1.402.324l.095.794a8.294 8.294 0 0 0 1.56-.359l-.253-.76Zm-1.402.324a6.789 6.789 0 0 1-.93.019 6.305 6.305 0 0 1-.9-.085l-.159.784c.263.053.654.087 1.03.1.378.014.775.01 1.054-.024l-.095-.794Zm-1.83-.066c-.787-.16-1.047-.313-1.219-.526l-.623.502c.358.444.861.641 1.683.808l.16-.784Zm-1.219-.526a.944.944 0 0 1-.173-.3 1.233 1.233 0 0 1-.051-.391l-.8.002c0 .23.024.44.092.642.068.204.173.38.31.55l.622-.503Zm-.224-.691c0-.161.003-.215.01-.251a.656.656 0 0 1 .064-.16l-.72-.347a1.402 1.402 0 0 0-.129.353 2.1 2.1 0 0 0-.025.407l.8-.002Zm.074-.41c.106-.219.212-.34.36-.44l-.45-.662c-.282.191-.474.43-.63.754l.72.348Zm.36-.44c.145-.1.286-.263.364-.42l-.718-.355a.385.385 0 0 1-.096.112l.45.662Zm.364-.42.08-.165-.717-.354-.08.164.717.354Zm.11-.439-.085-.342-.776.194.085.341.776-.193Zm-.085-.342a1.451 1.451 0 0 1-.056-.442.893.893 0 0 1 .097-.34l-.722-.344a1.688 1.688 0 0 0-.173.632 2.23 2.23 0 0 0 .078.688l.776-.194Zm.04-.781c.173-.362.558-.613.999-.626l-.024-.8c-.724.022-1.387.434-1.696 1.081l.722.345Zm1-.626.02.002.08.01c.063.01.136.025.2.041l.194-.776a3.234 3.234 0 0 0-.269-.054 1.452 1.452 0 0 0-.25-.023l.024.8Zm12.44.026c.647.12 1.021.723.838 1.364l.77.22c.311-1.09-.348-2.164-1.463-2.37l-.145.786Zm.838 1.364a1.345 1.345 0 0 0-.059.568c.032.21.135.374.28.5l.528-.6c-.015-.013-.018-.019-.017-.017.002.002.001.003 0-.003a.613.613 0 0 1 .037-.228l-.769-.22Zm.221 1.07.279.243.527-.601-.278-.244-.528.601Zm.279.243c.068.06.147.161.222.31l.715-.36a1.819 1.819 0 0 0-.41-.551l-.527.601Zm.222.31a.91.91 0 0 1 .085.192c.007.031.01.075.01.25l.8.003c0-.154 0-.292-.029-.425a1.595 1.595 0 0 0-.151-.38l-.715.36Zm.095.442c0 .25-.016.309-.057.409l.741.301c.094-.232.115-.405.116-.707l-.8-.003Zm-.057.409c-.08.198-.241.393-.396.494l.436.67c.301-.195.564-.524.701-.863l-.74-.301Zm-.396.494c-.068.044-.214.109-.437.176a6.148 6.148 0 0 1-.756.173l.131.789c.31-.052.605-.12.857-.196.245-.074.477-.165.64-.272l-.435-.67Zm-1.193.349c-.375.062-.503.07-1.1.053l-.023.8c.627.017.811.01 1.254-.064l-.131-.79Zm-1.1.053c-.516-.014-.768-.038-1.007-.089l-.165.783c.31.066.62.092 1.15.106l.021-.8Zm-1.007-.089a10.542 10.542 0 0 1-.721-.194 10.368 10.368 0 0 1-.457-.15c-.037-.015-.027-.013-.002.002l-.428.676a.828.828 0 0 0 .137.066 11.19 11.19 0 0 0 .519.171c.273.083.59.17.787.212l.165-.783Zm-1.18-.341c.095.06.13.14.139.166.01.03.011.045.01.034a2.75 2.75 0 0 1 0-.18l-.8-.03a2.12 2.12 0 0 0 .005.298c.005.042.014.1.036.159.02.056.07.157.182.228l.428-.675Zm.148.02.011-.303-.8-.029-.01.302.8.03Zm-.738-1.765a.397.397 0 0 1 .249.09l.005.005-.006-.007a3.108 3.108 0 0 1-.26-.343l.007.016a.337.337 0 0 1 .024.077.39.39 0 0 1 .006.07h-.8c0 .095.035.168.037.174.01.024.022.044.03.058.017.03.037.06.055.088a4.097 4.097 0 0 0 .348.439.574.574 0 0 0 .119.088c.02.01.09.045.186.045v-.8Zm.025-.092c0 .07-.02.123-.023.13a.3.3 0 0 1-.013.032c-.004.007-.005.008 0 0l.05-.075a10.82 10.82 0 0 1 .657-.841l-.597-.532a11.504 11.504 0 0 0-.792 1.03.785.785 0 0 0-.057.114c-.005.013-.025.069-.025.142h.8Zm.67-.754a6.151 6.151 0 0 1 2.217-1.534l-.294-.744c-.932.369-1.87 1.018-2.52 1.746l.598.532Zm2.217-1.534c.278-.11.45-.164.585-.187a.982.982 0 0 1 .37.008l.146-.786a1.777 1.777 0 0 0-.65-.01c-.22.037-.456.117-.745.231l.294.744Zm-4.97 2.979c.226.075.365.162.52.32l.573-.558a1.959 1.959 0 0 0-.842-.522l-.25.76Zm.52.32c.464.475.464 1.22 0 1.694l.573.56a2.006 2.006 0 0 0 0-2.812l-.572.559Zm0 1.694c-.266.274-.545.386-.981.369l-.031.8c.643.024 1.147-.162 1.585-.61l-.572-.559Zm-.981.369a1.533 1.533 0 0 1-.269-.023.988.988 0 0 1-.205-.084l-.348.72c.125.06.238.112.372.143.129.03.26.037.419.043l.03-.799Zm-.474-.107c-.683-.332-.92-1.082-.575-1.704l-.699-.388c-.579 1.042-.15 2.29.926 2.812l.348-.72Zm-.575-1.704c.034-.06.102-.15.193-.245.09-.095.18-.169.243-.207l-.421-.68c-.139.085-.28.21-.399.333-.118.123-.237.27-.315.41l.7.39Zm.436-.452c.279-.173.747-.228 1.075-.12l.25-.76c-.546-.18-1.26-.101-1.746.2l.42.68Zm-1.911 2.863a4.279 4.279 0 0 1 .136.19l.003.005a.324.324 0 0 1-.018-.039l.746-.29c-.02-.049-.048-.093-.055-.103a4.962 4.962 0 0 0-.176-.247l-.636.484Zm1.744.919a.4.4 0 0 1-.326.17c-.028 0-.048-.004-.052-.004l-.013-.003.05.014c.051.014.124.037.205.063l.246-.761a6.999 6.999 0 0 0-.319-.095.699.699 0 0 0-.052-.01c-.008 0-.032-.004-.062-.005-.014 0-.047 0-.088.01-.02.004-.152.031-.243.161l.654.46Zm-.136.24.307.099.246-.761-.307-.1-.246.762Zm.03-.292-.02.748.8.022.02-.749-.8-.021Zm-.02.748c-.015.543-.04.811-.087 1.035l.783.165c.063-.298.089-.626.104-1.178l-.8-.022Zm-.087 1.035a5.716 5.716 0 0 1-.741 1.89l.684.415c.414-.683.67-1.333.84-2.14l-.783-.165Zm-.741 1.89c-.299.491-.5.679-.71.78l.348.721c.418-.202.718-.547 1.046-1.086l-.684-.415Zm-.71.78a.662.662 0 0 1-.17.07c-.043.008-.109.01-.315.01v.8c.183 0 .329 0 .459-.023.146-.027.257-.08.373-.136l-.347-.72Zm-.485.08a2.1 2.1 0 0 1-.315-.01.651.651 0 0 1-.169-.069l-.347.72c.116.056.227.11.373.136.13.023.275.024.458.024v-.8Zm-.484-.079a1.065 1.065 0 0 1-.501-.514l-.742.299c.158.394.505.747.896.936l.347-.72Zm-.501-.514a3.788 3.788 0 0 0-.156-.35.99.99 0 0 0-.222-.293c-.209-.18-.466-.201-.668-.217l-.063.798c.234.018.225.04.207.024-.004-.004.009.005.04.062.03.059.067.143.12.274l.742-.298Zm-1.046-.86c-.255-.02-.39-.046-.49-.084a.9.9 0 0 1-.297-.204l-.544.586c.17.157.337.281.556.365.209.08.439.113.712.135l.063-.798Zm-.787-.288c-.342-.317-.441-.765-.279-1.17l-.743-.298c-.29.725-.098 1.52.478 2.054l.544-.586Zm-.279-1.17c.044-.11.184-.321.408-.581.215-.25.477-.51.728-.715l-.506-.62a6.886 6.886 0 0 0-.828.813c-.233.27-.448.566-.545.805l.743.298Zm1.136-1.296a6.653 6.653 0 0 1 1.618-.95l-.297-.742a7.453 7.453 0 0 0-1.827 1.073l.506.62Zm1.618-.95c.09-.035.314-.11.534-.18a12.36 12.36 0 0 1 .377-.111c.04-.01.014-.001-.028 0l-.032-.799c-.058.002-.121.02-.135.023a13.501 13.501 0 0 0-1.012.325l.296.743Zm.883-.29a.387.387 0 0 1-.237-.072l.01.01c.022.023.056.062.092.11l.636-.486a2.075 2.075 0 0 0-.154-.181.906.906 0 0 0-.085-.078.525.525 0 0 0-.072-.049c-.015-.008-.102-.059-.222-.054l.032.8Zm5.378.149c1.177.376 2.241 1.116 2.962 2.055l.635-.487c-.824-1.073-2.027-1.907-3.354-2.33l-.243.762Zm2.962 2.055c.322.419.355.823.166 1.191l.712.365c.35-.682.238-1.416-.243-2.043l-.635.487Zm.166 1.191a.98.98 0 0 1-.416.448c-.176.095-.423.155-.788.163l.018.8c.436-.01.82-.083 1.147-.257.335-.179.576-.447.751-.79l-.712-.364Zm-1.204.611a.673.673 0 0 0-.306.088c-.079.044-.15.099-.211.157-.116.11-.236.268-.291.45l.766.231.004-.01a.404.404 0 0 1 .118-.128c.003 0 .001 0-.007.003a.2.2 0 0 1-.055.009l-.018-.8Zm-.808.696c-.09.296-.315.555-.596.684l.334.727c.49-.225.873-.665 1.028-1.18l-.766-.231Zm-.596.684a.475.475 0 0 1-.14.05c-.05.008-.126.012-.315.012v.8c.177 0 .317-.002.439-.021.14-.022.242-.064.35-.114l-.334-.727Zm-.455.062c-.206 0-.272-.003-.315-.011a.662.662 0 0 1-.17-.07l-.347.721c.116.056.228.11.374.136.13.024.275.024.458.024v-.8Zm-.484-.08c-.21-.102-.413-.29-.705-.773l-.684.415c.322.532.624.877 1.04 1.078l.349-.72Zm-.705-.773c-.575-.947-.8-1.73-.834-2.933l-.8.023c.038 1.33.298 2.25.95 3.325l.684-.415Zm-.834-2.933-.02-.749-.8.023.02.749.8-.023Zm-.297-.357.307-.1-.246-.76-.307.099.245.761Zm.307-.1a6.316 6.316 0 0 1 .256-.075c.005-.002-.002 0-.014.002-.004 0-.023.003-.05.004a.398.398 0 0 1-.308-.146l.617-.508a.403.403 0 0 0-.375-.141 1.943 1.943 0 0 0-.14.033 6.958 6.958 0 0 0-.232.07l.246.762Zm1.503-1.117a.394.394 0 0 1-.04.171l-.004.008.027-.041c.027-.042.067-.098.112-.16l-.647-.47a5.85 5.85 0 0 0-.178.26.713.713 0 0 0-.042.084c-.002.004-.028.066-.028.148h.8Zm.095-.022c.034-.046.042-.06.064-.088.016-.023.021-.028.02-.026a.249.249 0 0 1-.146.066c-.022.001-.031-.002-.018 0a.768.768 0 0 1 .073.019c.08.022.187.058.357.112l.243-.762c-.155-.05-.285-.093-.383-.12a.974.974 0 0 0-.336-.047.56.56 0 0 0-.37.18c-.057.06-.118.15-.15.195l.646.47Zm-3.08-4.123a3.183 3.183 0 0 1 1.01-.005l.103-.793a3.963 3.963 0 0 0-1.22.005l.107.793Zm-2.304.734c-.2.376-.3.635-.392 1.164l.788.137c.077-.442.149-.621.31-.925l-.706-.376Zm.407 3.637c.155.186.3.34.477.471.177.132.37.23.607.323l.294-.744a1.776 1.776 0 0 1-.424-.22 1.993 1.993 0 0 1-.338-.341l-.616.51Zm3.74.785c.452-.21.715-.392 1.036-.74l-.588-.542c-.24.26-.414.384-.785.556l.337.726Zm1.862-3.25a3.22 3.22 0 0 0-.391-1.172l-.707.376c.176.33.243.513.308.922l.79-.125Zm4.988-1.867-.278-.244-.528.601.279.244.527-.6ZM18.5 27.558l-.989-.15-.122.797.755.288.356-.935Zm8.459-4.474-.132.992.132-.992Zm.366.606-.931-.363.931.363Zm-7.837 4.02c.032-.21.183-.592.542-1.068.346-.46.846-.953 1.487-1.386 1.275-.863 3.08-1.477 5.31-1.18l.264-1.983c-2.76-.367-5.052.395-6.694 1.506a8.26 8.26 0 0 0-1.965 1.84c-.473.628-.821 1.317-.92 1.968l1.976.302Zm6.906-4.383c-1.029 2.635-4.378 4.502-7.538 3.297l-.713 1.869c4.28 1.632 8.723-.876 10.114-4.44l-1.863-.726Zm.433.749a.552.552 0 0 1-.433-.75l1.863.727c.354-.907-.264-1.84-1.166-1.96l-.264 1.983Z"
      fill="#080914"
    />
  </Svg>
)

export default FloweryWorkIcon
