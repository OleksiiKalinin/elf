import * as React from "react"
import { Svg,  SvgProps, Rect, Path } from "react-native-svg"

const SpaWorkIcon = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
        {...props}
  >
    <Rect width={34} height={34} rx={17} fill="#99D5CF" />
    <Path
      d="M10.438 13.819a4.33 4.33 0 0 1-1.26-.17 3.085 3.085 0 0 1-1.07-.62.788.788 0 0 1-.2-.25.62.62 0 0 1-.07-.28c0-.154.053-.287.16-.4a.555.555 0 0 1 .42-.18c.126 0 .24.04.34.12.253.206.503.363.75.47.253.106.563.16.93.16.246 0 .473-.037.68-.11.206-.08.373-.184.5-.31a.637.637 0 0 0 .19-.45c0-.2-.06-.37-.18-.51s-.304-.257-.55-.35c-.247-.1-.56-.177-.94-.23a4.385 4.385 0 0 1-.95-.24 2.411 2.411 0 0 1-.69-.42 1.75 1.75 0 0 1-.41-.6 2.083 2.083 0 0 1-.14-.78c0-.434.11-.804.33-1.11.226-.307.53-.54.91-.7.38-.16.8-.24 1.26-.24.433 0 .833.066 1.2.2.373.126.676.29.91.49.193.153.29.33.29.53a.57.57 0 0 1-.17.4.533.533 0 0 1-.4.18c-.1 0-.19-.03-.27-.09a1.704 1.704 0 0 0-.43-.26 3.227 3.227 0 0 0-.57-.21 2.13 2.13 0 0 0-1.29.02.992.992 0 0 0-.44.3.69.69 0 0 0-.15.44c0 .2.056.366.17.5.12.126.29.23.51.31.22.073.483.14.79.2.4.073.75.16 1.05.26.306.1.56.23.76.39.2.153.35.35.45.59.1.233.15.52.15.86 0 .433-.12.806-.36 1.12-.24.313-.557.553-.95.72-.387.166-.807.25-1.26.25Zm6.606-7.1c.347 0 .67.1.97.3.307.2.554.47.74.81.187.34.28.72.28 1.14 0 .413-.093.79-.28 1.13-.186.34-.433.613-.74.82-.3.2-.623.3-.97.3h-1.84l.1-.18v2.07c0 .173-.053.32-.16.44a.55.55 0 0 1-.42.17.538.538 0 0 1-.41-.17.638.638 0 0 1-.16-.44v-5.78a.599.599 0 0 1 .61-.61h2.28Zm0 3.36c.127 0 .25-.054.37-.16a1.282 1.282 0 0 0 .42-.95c0-.194-.04-.374-.12-.54-.08-.167-.18-.3-.3-.4a.555.555 0 0 0-.37-.16h-1.86l.12-.18v2.55l-.11-.16h1.85Zm5.305-1.79-2.16 5.08a.632.632 0 0 1-.22.3.521.521 0 0 1-.31.1c-.18 0-.313-.05-.4-.15a.545.545 0 0 1-.13-.37c0-.06.01-.124.03-.19l2.49-5.98a.663.663 0 0 1 .24-.31.542.542 0 0 1 .36-.09c.12 0 .23.036.33.11a.557.557 0 0 1 .23.29l2.46 5.86c.034.086.05.166.05.24 0 .18-.06.323-.18.43a.541.541 0 0 1-.71.05.734.734 0 0 1-.22-.3l-2.15-5.01.29-.06Zm-1.85 3.86.55-1.15h2.7l.19 1.15H20.5Z"
      fill="#080914"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.388 17.256c-.74.714-1.372 1.517-1.794 2.28a8.72 8.72 0 0 1-.144.255 3.06 3.06 0 0 1-.367-.156c-.786-.363-2.138-.725-2.96-.793a9 9 0 0 1-.432-.044l-.126-.019-.088.383c-.178.775-.226 1.232-.23 2.169a15.93 15.93 0 0 0 .033 1.208l.035.31-.26.05c-1.018.193-2.23.667-3.167 1.238a3.97 3.97 0 0 0-.337.217c0 .07.49 1.071.682 1.392.885 1.48 1.92 2.538 3.059 3.126.919.475 1.548.625 2.585.617 1.22-.01 2.373-.287 3.616-.871.251-.118.458-.19.53-.184.066.005.294.092.508.193 1.207.572 2.379.853 3.591.862 1.038.008 1.667-.142 2.586-.617 1.138-.588 2.173-1.645 3.059-3.126.192-.32.682-1.321.682-1.392 0-.006-.152-.104-.337-.217-.936-.571-2.149-1.045-3.167-1.238l-.26-.05.035-.31c.02-.17.034-.714.032-1.208-.003-.937-.051-1.394-.23-2.169l-.087-.383-.126.019a9 9 0 0 1-.432.044c-.823.068-2.174.43-2.96.793a3.06 3.06 0 0 1-.368.156 10.658 10.658 0 0 0-1.078-1.615c-.385-.48-1.366-1.437-1.471-1.437-.041 0-.316.233-.612.517Zm.994 1.531c.768.902 1.302 1.864 1.54 2.776.125.478.151 1.276.059 1.768-.126.67-.474 1.477-.942 2.184-.282.424-.712.97-.916 1.163l-.13.122-.219-.234c-.885-.948-1.559-2.192-1.757-3.247-.09-.474-.063-1.285.058-1.743.207-.79.628-1.612 1.224-2.388.29-.379.666-.814.705-.815.013 0 .183.186.378.414Zm-5.137 1.507c.493.126 1.189.374 1.515.54l.21.105-.1.4c-.142.565-.176 1.541-.074 2.115.157.892.586 1.916 1.162 2.776.157.235.277.427.265.427-.063 0-.78-.298-1.08-.449-1.498-.752-2.28-1.814-2.599-3.52-.077-.414-.103-1.892-.041-2.325l.033-.233.13.024c.071.014.332.077.579.14Zm10.239-.034c.013.073.036.463.05.867.06 1.62-.278 2.89-1.009 3.783-.41.502-1.006.966-1.668 1.298-.3.151-1.017.45-1.08.45-.012 0 .107-.193.265-.428.576-.86 1.005-1.884 1.162-2.776.101-.574.068-1.55-.073-2.115l-.1-.4.209-.106c.46-.233 1.567-.587 2.194-.701.014-.003.037.055.05.128Zm-11.79 3.98c.498 1.324 1.492 2.364 2.959 3.093.397.197 1.168.508 1.261.508.022 0 .05.016.062.036.027.043-.618.226-1.086.308-1.37.239-2.542.007-3.539-.7-.354-.25-1.15-1.047-1.464-1.464-.244-.324-.744-1.107-.744-1.164 0-.092 1.435-.608 2.082-.748.392-.085.388-.086.47.13Zm13.265-.087c.6.147 1.898.628 1.898.704 0 .054-.474.804-.712 1.127-.33.446-1.06 1.184-1.442 1.46a4.37 4.37 0 0 1-2.845.828c-.645-.044-1.981-.34-1.817-.403l.469-.173c1.885-.69 3.21-1.898 3.796-3.46l.074-.196.167.027c.092.014.277.053.412.086Z"
      fill="#080914"
      stroke="#080914"
    />
  </Svg>
)

export default SpaWorkIcon
