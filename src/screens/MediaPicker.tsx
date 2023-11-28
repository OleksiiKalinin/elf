import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList, Modal } from 'react-native';
import Colors from '../colors/Colors';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Typography from '../components/atoms/Typography';
import Button from '../components/molecules/Button';
import RNFS, { ReadDirItem } from 'react-native-fs';
import { PermissionsAndroid } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { MediaFileType } from '../components/organismes/MediaSelector';

export type MediaPickerProps = {
  type: 'image' | 'video',
  callback: (images: MediaFileType[]) => void,
  initialSelected?: MediaFileType[],
  selectionLimit?: number,
};

const MediaPicker: React.FC<MediaPickerProps> = ({ 
  callback, 
  initialSelected, 
  selectionLimit = 20, 
  type,
}) => {
  const [images, setImages] = useState<ReadDirItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<ReadDirItem[]>(initialSelected as any || []);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<ReadDirItem>();
  const { windowSizes } = useTypedSelector(state => state.general);

  const itemSize = Math.round(windowSizes.width) / 4;

  useEffect(() => {
    const getFiles = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Permission title",
            message:
              "Permission message",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const directories = [RNFS.PicturesDirectoryPath, RNFS.DownloadDirectoryPath,];

          let allFiles: ReadDirItem[] = [];
          const imageExtensions = /\.(jpg|jpeg|png)$/i;
          const videoExtensions = /\.(mp4|mov|mkv)$/i;

          for (const directory of directories) {
            const files = await RNFS.readDir(directory);
            let filteredFiles;
            filteredFiles = files.filter(file => file.isFile() && (type === 'image' ? imageExtensions.test(file.name) : videoExtensions.test(file.name)));
            allFiles = [...allFiles, ...filteredFiles];
          };

          if (initialSelected) {
            const filteredImages = allFiles.filter(file => !initialSelected.some(selected => selected.beforePath === file.path));
            setImages([...initialSelected, ...filteredImages] as any);
          } else {
            setImages(allFiles);
          };
        } else {
          console.log("EXTERNAL_STORAGE permission denied");
        };
      } catch (err) {
        console.warn(err);
      };
    };

    getFiles();
  }, [initialSelected])

  const handlePressItem = (image: ReadDirItem) => {
    const isSelected = selectedFiles.some(item => item.path === image.path);

    if (isSelected) {
      setSelectedFiles(prevSelected => prevSelected.filter(item => item.path !== image.path));
    } else if (!isSelected && selectedFiles.length < selectionLimit) {
      setSelectedFiles(prevSelected => [...prevSelected, image]);
    };
  };

  const handleLongPressItem = (item: ReadDirItem) => {
    setPreviewMode(true);
    setPreviewImage(item);
  };

  const handleConfirm = () => {
    callback(selectedFiles as any);
  };

  const closePreview = () => {
    setPreviewMode(false);
  };

  const PreviewImage = ({ item }: { item: ReadDirItem }) => {
    const [ratio, setRatio] = useState(0);
    const uri = 'file://' + item.path;

    Image.getSize(
      uri,
      (width, height) => {
        setRatio(width / height);
      },
    );
    return (
      <Image
        source={{ uri: uri }}
        style={{ width: '100%', height: undefined, aspectRatio: ratio }}
      />
    );
  };

  const ImageItem = useCallback(({ item }: { item: ReadDirItem }) => {
    const selectedIndex = selectedFiles.findIndex((element) => element.path === item.path);
    const selected = selectedIndex !== -1;

    return (
      <TouchableOpacity
        onPress={() => handlePressItem(item)}
        onLongPress={() => handleLongPressItem(item)}
        activeOpacity={0.9}
        style={{ position: 'relative' }}
      >
        <Image
          source={{ uri: 'file://' + item.path }}
          style={{
            width: itemSize,
            height: itemSize,
            opacity: selected ? 0.7 : 1,
          }}
        />
        {selected && (
          <View style={styles.SelectedImage}>
            <Typography
              size={16}
              weight='Bold'
              style={{ color: Colors.White }}
            >
              {selectedIndex + 1}
            </Typography>
          </View>
        )}
      </TouchableOpacity>
    );
  }, [selectedFiles, itemSize]);

  return (
    <ScreenHeaderProvider title='Wybierz zdjęcia'>
      <FlatList
        data={images}
        numColumns={4}
        keyExtractor={(item) => item.path}
        renderItem={ImageItem}
      />
      <Button
        stickyBottom
        onPress={() => handleConfirm()}
        disabled={selectedFiles.length === 0}
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
          <View style={styles.Preview}>
            {previewImage &&
              <PreviewImage item={previewImage} />
            }
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
  SelectedImage: {
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
  },
  Preview: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.Basic900,
    justifyContent: 'center',
  },
});

export default MediaPicker;
