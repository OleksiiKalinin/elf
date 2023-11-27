import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View} from 'react-native';
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
import { ReadDirItem } from 'react-native-fs';
import MediaSelector from '../../components/organismes/MediaSelector';


type Params = NonNullable<MenuStackParamList['default']['ImageScreen']>;

const { useParam } = createParam<Params>();

const ImageScreen: React.FC<InitialPropsFromParams<Params>> = () => {
  const router = useRouter();

  const [images, setImages] = useState<ReadDirItem[]>([]);

  // const handleImages = (images: ReadDirItem[]) => {
  //   setImages(images);
  // };

/*   const goToImagePickerScreen = () => {
    router.push({
      stack: 'MenuStack',
      screen: 'ImageScreen',
      params: {
        subView: 'ImagePickerScreen',
        callback: handleImages,
        initialSelected: images,
        selectionLimit: 5,
      },
    });
  }; */

  const callbackMultiple = (images: any[]) =>{
    // console.log('Screen:', images)
    setImages(images);
  };

  const callbackSingle = (image: any) =>{
    const array = [];
    array.push(image);
    // console.log('Screen:', image)
    setImages(array as any);
  };

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      {/* <Button onPress={() => goToImagePickerScreen()}>
        Dodaj zdjęcia
      </Button> */}

      <View style={{gap: 20, flex: 1}}>
        <MediaSelector
          type='image'
          render={(onPress) =>
            <Button onPress={() => onPress()}>
              Dodaj zdjęcie
            </Button>
          }
          callback={callbackSingle}
        />

        <MediaSelector
          type='image'
          crop
          render={(onPress) =>
            <Button onPress={() => onPress()}>
              Dodaj zdjęcie - crop
            </Button>
          }
          callback={callbackSingle}
        />

        <MediaSelector
          type='image'
          multiple
          render={(onPress) =>
            <Button onPress={() => onPress()}>
              Dodaj zdjęcia
            </Button>
          }
          callback={callbackMultiple}
          selectionLimit={5}
        />
        <View style={{flex: 1, backgroundColor: Colors.Basic200}}>
          {images.map(item=> 
            <Image
              source={{ uri: 'file://' + item.path}}
              style={{
                width: 100,
                height: 100,
              }}
            />  
          )}
        </View>
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
