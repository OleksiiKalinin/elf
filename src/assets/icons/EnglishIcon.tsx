import * as React from 'react';
import { Svg, SvgProps, Rect, Path, G, Defs, ClipPath} from 'react-native-svg';

const EnglishIcon = (props: SvgProps) => (
  <Svg
    width={17}
    height={13}
    fill="none"
        {...props}>
    <Path d="M.566.91h16v12h-16v-12Z" fill="#41479B" />
    <Path
      d="M16.566 11.348 10.65 6.91l5.916-4.437V.91h-2.083L8.566 5.348 2.65.91H.566v1.563L6.483 6.91.566 11.348v1.562H2.65l5.916-4.437 5.917 4.437h2.083v-1.562Z"
      fill="#fff"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.567.91v.625L7.732 6.91.566 12.285v.625H1.4l7.167-5.375 7.166 5.375h.833v-.625L9.4 6.91l7.166-5.375V.91h-.833L8.567 6.285 1.4.91H.567Z"
      fill="#DC251C"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.566 4.91v-4h4v4h6v4h-6v4h-4v-4h-6v-4h6Z"
      fill="#fff"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.566 5.91v-5h2v5h7v2h-7v5h-2v-5h-7v-2h7Z"
      fill="#DC251C"
    />
  </Svg>
);

export default EnglishIcon;
