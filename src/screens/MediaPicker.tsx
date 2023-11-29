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
import Video from 'react-native-video';

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
  const [previewFile, setPreviewFile] = useState<ReadDirItem>();
  const { windowSizes } = useTypedSelector(state => state.general);

  const itemSize = Math.round(windowSizes.width) / 4;

  useEffect(() => {
    const getFiles = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          // PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const directories = [/* RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera',  */RNFS.DownloadDirectoryPath, RNFS.PicturesDirectoryPath];

          let allFiles: ReadDirItem[] = [];
          const imageExtensions = /\.(jpg|jpeg|png)$/i;
          const videoExtensions = /\.(mp4|mov|mkv)$/i;

          for (const directory of directories) {
            const files = await RNFS.readDir(directory);
            const filteredFiles = files.filter(file => file.isFile() && (type === 'image' ? imageExtensions.test(file.name) : videoExtensions.test(file.name)));
            allFiles = [...allFiles, ...filteredFiles];
          };

          const sortedFiles = allFiles.sort((a, b) => {
            if (a.mtime && b.mtime) {
              return b.mtime.getTime() - a.mtime.getTime();
            }
            return a.mtime ? -1 : 1;
          });

          if (initialSelected) {
            const filteredImages = sortedFiles.filter(file => !initialSelected.some(selected => selected.beforePath === file.path));
            setImages([...initialSelected, ...filteredImages] as any);
          } else {
            setImages(sortedFiles);
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
    if (selectionLimit > 1) {
      const isSelected = selectedFiles.some(item => item.path === image.path);
      if (isSelected) {
        setSelectedFiles(prevSelected => prevSelected.filter(item => item.path !== image.path));
      } else if (!isSelected && selectedFiles.length < selectionLimit) {
        setSelectedFiles(prevSelected => [...prevSelected, image]);
      };
    } else {
      callback([image] as any);
    };
  };

  const handleLongPressItem = (item: ReadDirItem) => {
    setPreviewMode(true);
    setPreviewFile(item);
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

  const PreviewVideo = ({ item }: { item: ReadDirItem }) => {
    const [height, setHeight] = useState(0);
    const uri = 'file://' + item.path;

    return (
      <Video
        source={{ uri: uri }}
        style={{ width: windowSizes.width, height: height }}
        resizeMode='cover'
        paused={false}
        controls
        onLoad={data => {
          const { width, height } = data.naturalSize;
          setHeight(height * (windowSizes.width / width));
        }}
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
    <ScreenHeaderProvider title={type === 'image' ? 'Wybierz zdjęcia' : 'Wybierz wideo'}>
      <FlatList
        data={images}
        numColumns={4}
        keyExtractor={(item) => item.path}
        renderItem={ImageItem}
      />
      {selectionLimit > 1 &&
        <Button
          stickyBottom
          onPress={() => handleConfirm()}
          disabled={selectedFiles.length === 0}
        >
          Zatwierdź
        </Button>
      }
      <Modal
        visible={previewMode && !!previewFile}
        onRequestClose={() => setPreviewMode(false)}
      >
        <ScreenHeaderProvider
          backgroundContent={'#000'}
          callback={closePreview}
          headerItemsColor={Colors.White}
          backgroundHeader={'rgba(0, 0, 0, 0.1)'}
          transparent
          title=' '
        >
          <View style={styles.Preview}>
            {previewFile && type === 'image' &&
              <PreviewImage item={previewFile} />
            }
            {previewFile && type === 'video' &&
              <PreviewVideo item={previewFile} />
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
    transform: [{ translateX: -18 }, { translateY: -18 }],
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
