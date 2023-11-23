import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList, Touchable, Dimensions} from 'react-native';
import Colors from '../colors/Colors';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import { ScrollView } from '../components/molecules/ScrollView';
import TextField from '../components/molecules/TextField';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import { Dialog, Separator } from 'tamagui';
import useRouter from '../hooks/useRouter';
import Button from '../components/molecules/Button';
import CheckBox from '../components/atoms/CheckBox';
// import RNFS, { ReadDirItem } from 'react-native-fs';
import { PermissionsAndroid } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export type ImagePickerScreenProps ={
  // callback: (images: ReadDirItem[]) => void,
  // initialSelected?: ReadDirItem[],
};

const ImagePickerScreen: React.FC<ImagePickerScreenProps> = () => {
  // const [images, setImages] = useState<ReadDirItem[]>([]);
  // const [selectedImages, setSelectedImages] = useState<ReadDirItem[]>([]);
  // const [previewMode, setPreviewMode] = useState(false);
  // const [previewImage, setPreviewImage] = useState<ReadDirItem>();

  const itemSize = Math.round(Dimensions.get('window').width) / 4;

  // useEffect(()=> {
  //   const getImages = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //         {
  //           title: "Permission title",
  //           message:
  //             "Permission message",
  //           buttonNeutral: "Ask Me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         const picturesDir = RNFS.PicturesDirectoryPath;
  //         const files = await RNFS.readDir(picturesDir);
  
  //         const imageFiles = files.filter(file => file.isFile() && /\.(jpg|jpeg|png)$/i.test(file.name));
  
  //         console.log('PicturesDir:', picturesDir);
  //         console.log('Images:', imageFiles);
  //         setImages(imageFiles);
  //       } else {
  //         console.log("EXTERNAL_STORAGE permission denied");
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }

  //   getImages();
  // },[])

  // const handlePressItem = (item: ReadDirItem) =>{
    // setPreviewMode(true);
    // setPreviewImage(item);
  // };

  const handleConfirm = () =>{

  };

  const imageItem = useCallback(({item}: any) => (
    <TouchableOpacity
      // onPress={()=> handlePressItem(item)}
      activeOpacity={.9}
    >
      <Image 
        source={{ uri: 'file://' + item.path }} 
        style={{ width: itemSize, height: itemSize }} 
      />
    </TouchableOpacity>
  ), []);

  return (
    <ScreenHeaderProvider title='Wybierz zdjęcia' backgroundColor={Colors.Basic100}>
      {/* {!previewMode ?
        <FlatList
          data={images}
          numColumns={4}
          keyExtractor={(item) => item.path}
          renderItem={imageItem}
        />
      

        :
      
        <View style={{height: '100%', width: '100%', backgroundColor: Colors.Basic900}}>
        <Image 
          source={{ uri: 'file://' + previewImage?.path }} 
          style={{ width: '100%', height: '100%' }} 
        />
        </View>
      }
      {!previewMode &&
        <Button
          stickyBottom
          onPress={()=> handleConfirm()}
        >
          Zatwierdź
        </Button>
      } */}

      {/* <Dialog
          open={previewMode}
        >
          <View style={{height: '100%', width: '100%', backgroundColor: Colors.Basic900}}>
          <Image 
            source={{ uri: 'file://' + previewImage?.path }} 
            style={{ width: '100%', height: '100%' }} 
          />
          </View>
        </Dialog> */}
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: Colors.Basic100,
    flex: 1,
  },
});

export default ImagePickerScreen;
