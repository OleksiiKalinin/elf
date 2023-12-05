import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { ScrollView } from '../../components/molecules/ScrollView';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { createParam } from 'solito';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { InitialPropsFromParams } from '../../hooks/types';
import useRouter from '../../hooks/useRouter';
import MediaSelector, { MediaFileType } from '../../components/organismes/MediaSelector';

type Params = NonNullable<MenuStackParamList['default']['ImageScreen']>;

const { useParam } = createParam<Params>();

const ImageScreen: React.FC<InitialPropsFromParams<Params>> = () => {
  const router = useRouter();

  const [images, setImages] = useState<MediaFileType[]>([]);
  const [progress, setProgress] = useState(0);
  const { windowSizes } = useTypedSelector(state => state.general);

  const callback = (image: MediaFileType[]) => {
    setImages(image);
    console.log('Otrzymana tablica:', image);
  };

  const handleProgress = (progress: number) => {
    console.log(progress);
    setProgress(progress);
  };

  // const cropCallback = (path: string) =>{
  //   console.log(path);
  //   setBase64Image(path);
  // };

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <View style={{ gap: 20, flex: 1, width: '100%', height: '100%' }}>
        {/* <MediaSelector
          key={'132313'}
          type='video'
          render={(onPress) =>
            <Button onPress={() => onPress()}>
              Dodaj wideo
            </Button>
          }
          callback={callback}
          compressionProgress={handleProgress}
          maxAllowedFileSize={8388608}
          minSizeToCompress={5000000}
        />

        <MediaSelector
          key={'1217878'}
          type='image'
          render={(onPress) =>
            <Button onPress={() => onPress()}>
              Dodaj zdjęcie
            </Button>
          }
          callback={callback}
        /> */}



        {/* <MediaSelector
          key={'8798789'}
          type='image'
          crop
          cropResolution={{
            width: 500,
            height: 500,
          }}
          imageCompressionSettings={{
            quality: .7,
          }}
          render={(onPress) =>
            <Button onPress={() => onPress()}>
              Dodaj zdjęcie - crop
            </Button>
          }
          callback={callback}
        /> */}

        <MediaSelector
          key={'2121'}
          type='image'
          multiple
          render={(onPress) =>
            <Button onPress={() => onPress()}>
              Dodaj zdjęcia - multiple
            </Button>
          }
          callback={callback}
          selectionLimit={20}
          initialSelected={images}
        />


        <View style={{ width: windowSizes.width * progress, height: 3, backgroundColor: 'green' }}>

        </View>
        {images.length > 0 &&
          <View style={{ width: '100%', height: 600, backgroundColor: 'red' }}>
            <Image
              source={{ uri: images[0].path }}
              resizeMode="contain"
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        }
        <ScrollView style={{ flex: 1, backgroundColor: Colors.Basic200 }}>
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            {images.map(item =>
              <Image
                source={{ uri: item.path }}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    minHeight: '100%',
    flex: 1,
  },
});

export default ImageScreen;