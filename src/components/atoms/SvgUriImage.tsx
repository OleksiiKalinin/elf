import React, { FC } from 'react';
import { ImageProps, Platform, TextStyle } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { StyleProp } from 'react-native';
import { Image } from 'tamagui';

type SvgUriImageProps = {
 src: string,
 width?: string | number,
 height?: string | number,
 style?: StyleProp<TextStyle>;
}

const SvgUriImage: FC<SvgUriImageProps> = ({
  src,
  width = '',
  height = '',
  ...style
}) => {

  return (
    <>
      {Platform.OS === 'web' ?
        <Image
          src={{ uri: src }}
          width={width}
          height={height}
          {...style}
        />

        :

        <SvgUri 
          uri={src}
          height={width}
          width={height}
          {...style}
        />
      }
    </>
  );
};

export default SvgUriImage;