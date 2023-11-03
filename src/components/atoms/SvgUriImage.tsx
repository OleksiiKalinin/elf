import React, { FC } from 'react';
import { Platform, ViewStyle } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { StyleProp } from 'react-native';
import { Image } from 'tamagui';

type SvgUriImageProps = {
 src: string,
 width?: string | number,
 height?: string | number,
 style?: StyleProp<ViewStyle>;
};

const SvgUriImage: FC<SvgUriImageProps> = ({
  src,
  width = '',
  height = '',
  style
}) => {

  return (
    <>
      {Platform.OS === 'web' ?
        <Image
          src={{ uri: src }}
          width={width}
          height={height}
          style={style}
        />
        :
        <SvgUri 
          uri={src}
          height={width}
          width={height}
          style={style}
        />
      }
    </>
  );
};

export default SvgUriImage;