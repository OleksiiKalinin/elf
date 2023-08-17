import * as React from 'react';
import { Svg, SvgProps, Rect, Path, G} from 'react-native-svg';

const HamburgerIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
  width={25}
  height={25}
  {...props}
>
  <Path d="M3 5a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3zm0 6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3zm0 6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3z" />
</Svg>
);

export default HamburgerIcon;
