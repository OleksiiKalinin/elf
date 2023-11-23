import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList, Modal } from 'react-native';
import Colors from '../colors/Colors';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Typography from '../components/atoms/Typography';
import { Dialog, Separator } from 'tamagui';
import useRouter from '../hooks/useRouter';
import Button from '../components/molecules/Button';
import RNFS, { ReadDirItem } from 'react-native-fs';
import { PermissionsAndroid } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTypedSelector } from '../hooks/useTypedSelector';

export type ImagePickerScreenProps ={
  callback: (images: ReadDirItem[]) => void,
  initialSelected?: ReadDirItem[],
};

const ImagePickerScreen: React.FC<ImagePickerScreenProps> = ({callback, initialSelected}) => {
  const [images, setImages] = useState<ReadDirItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<ReadDirItem[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<ReadDirItem>();
  const { windowSizes } = useTypedSelector(state => state.general);
  const { backToRemoveParams } = useRouter();

  const itemSize = Math.round(windowSizes.width) / 4;

  useEffect(()=> {
    const getImages = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          // {
          //   title: "Permission title",
          //   message:
          //     "Permission message",
          //   buttonNeutral: "Ask Me Later",
          //   buttonNegative: "Cancel",
          //   buttonPositive: "OK",
          // }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const directories = [RNFS.PicturesDirectoryPath, RNFS.DownloadDirectoryPath,];

          let allImages: ReadDirItem[] = [];
          
          for (const directory of directories) {
            const files = await RNFS.readDir(directory);
            const imageFiles = files.filter(file => file.isFile() && /\.(jpg|jpeg|png)$/i.test(file.name));
            allImages = [...allImages, ...imageFiles];
          };

          setImages(allImages);
        } else {
          console.log("EXTERNAL_STORAGE permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }

    getImages();
  },[])

  const handlePressItem = (image: ReadDirItem) =>{
    const isSelected = selectedImages.some(item => item.path === image.path);

    if(isSelected) {
      setSelectedImages(prevSelected => prevSelected.filter(item => item.path !== image.path));
    } else {
      setSelectedImages(prevSelected => [...prevSelected, image]);
    };
  };

  const handleLongPressItem = (item: ReadDirItem) =>{
    setPreviewMode(true);
    setPreviewImage(item);
  };

  const handleConfirm = () =>{
    callback(selectedImages);
    backToRemoveParams();
  };

  const closePreview = () =>{
    setPreviewMode(false);  
  };

  const ImageCustom = ({item}: any) => {
    const [ratio, setRatio] = useState(0);
    const uri = 'file://' + item.path
  
    Image.getSize(
      uri,
      (width, height) => {
        setRatio(width / height);
      },
      error => {
        console.log('error:', error);
      },
    );
    return (
      <Image
        source={{uri: uri}}
        style={{width: '100%', height: undefined, aspectRatio: ratio}}
      />
    );
  };

  const imageItem = ({item}: any) => {
    const selectedIndex = selectedImages.findIndex((element) => element.path === item.path);
    const selected = selectedIndex !== -1;

    return (
      <TouchableOpacity
        onPress={()=> handlePressItem(item)}
        onLongPress={()=> handleLongPressItem(item)}
        activeOpacity={.9}
        style={{
          position: 'relative',
        }}
      >
          <Image 
            source={{ uri: 'file://' + item.path }} 
            style={{ 
              width: itemSize, 
              height: itemSize, 
              opacity: selected ? .7 : 1
            }} 
          />
          {selected &&
            <View
              style={{
                height: 36,
                width: 36,
                backgroundColor: Colors.Basic700,
                borderRadius: 50,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-18, -18)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography 
                size={16} 
                weight='Bold'
                style={{
                  color: Colors.White
                }}
              >
                {selectedIndex + 1}
              </Typography>
            </View>
          }
      </TouchableOpacity>
    )
  }

  return (
    <ScreenHeaderProvider title='Wybierz zdjęcia'>
      <FlatList
        data={images}
        numColumns={4}
        keyExtractor={(item) => item.path}
        renderItem={imageItem}
      />
      <Button
        stickyBottom
        onPress={()=> handleConfirm()}
        disabled={selectedImages.length === 0}
      >
        Zatwierdź
      </Button>

      <Modal
        visible={previewMode && !!previewImage}
        onRequestClose={() => setPreviewMode(false)}
      >
        <ScreenHeaderProvider 
          backgroundContent={Colors.Basic900} 
          callback={closePreview}
          headerItemsColor={Colors.White}
          backgroundHeader={'rgba(0, 0, 0, 0.1)'}
          transparent
          title=' '
        >
          <View style={{height: '100%', width: '100%', backgroundColor: Colors.Basic900, justifyContent: 'center'}}>
          {/* <Image 
            source={{ uri: 'file://' + previewImage?.path }} 
            style={{ 
              width: '100%',
              height: undefined,
              aspectRatio: Math.round(windowSizes.width) / Math.round(windowSizes.height),
            }} 
          /> */}
          <ImageCustom item={previewImage}/>
          </View>
        </ScreenHeaderProvider>
      </Modal>
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
