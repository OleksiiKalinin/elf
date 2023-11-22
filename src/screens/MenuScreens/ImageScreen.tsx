import React, {useEffect, useState} from 'react';
import { StyleSheet,} from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import {ScrollView} from '../../components/molecules/ScrollView';
import CornerCircleButton from '../../components/molecules/CornerCircleButton';
import {MenuStackParamList} from '../../navigators/MenuNavigator';
import {createParam} from 'solito';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {InitialPropsFromParams} from '../../hooks/types';
import useRouter from '../../hooks/useRouter';
import { ReadDirItem } from 'react-native-fs';


type Params = NonNullable<MenuStackParamList['default']['ImageScreen']>;

const {useParam} = createParam<Params>();

const ImageScreen: React.FC<InitialPropsFromParams<Params>> = () => {
  const router = useRouter();

  const [images, setImages] = useState<ReadDirItem[]>([]);

  const handleImages = (images: ReadDirItem[]) =>{
    setImages(images);
  };

  const goToImagePickerScreen = () => {
    router.push({
      stack: 'MenuStack',
      screen: 'ImageScreen',
      params: {
        subView: 'ImagePickerScreen',
        callback: handleImages,
        initialSelected: images,
      },
    });
  };

  return (
    <ScreenHeaderProvider mainTitlePosition="flex-start">
      <Button onPress={()=> goToImagePickerScreen()}>
        Dodaj zdjęcia
      </Button>
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
