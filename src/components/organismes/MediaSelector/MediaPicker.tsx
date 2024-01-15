import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList, Platform, BackHandler } from 'react-native';
import Colors from '../../../colors/Colors';
import ScreenHeaderProvider from '../ScreenHeaderProvider';
import Typography from '../../atoms/Typography';
import Button from '../../molecules/Button';
import { stat } from 'react-native-fs';
import { PermissionsAndroid } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Video from 'react-native-video';
import { CameraRoll, SubTypes } from "@react-native-camera-roll/camera-roll";
import ImageViewer from '../ImageViewer';
import { MediaFileType } from '.';
import Modal from '../../atoms/Modal';

type PhotoIdentifier = {
  node: {
    id: string;
    type: string;
    subTypes?: SubTypes;
    group_name: string[];
    image: {
      filename: string | null;
      filepath: string | null;
      extension: string | null;
      uri: string;
      height: number;
      width: number;
      fileSize: number | null;
      playableDuration: number;
      orientation: number | null;
      beforePath?: string,
    };
    timestamp: number;
    modificationTimestamp: number;
    location: {
      latitude?: number;
      longitude?: number;
      altitude?: number;
      heading?: number;
      speed?: number;
    } | null;
  };
};

export type MediaPickerProps = ({
  type: 'image',
  maxAllowedFileSize?: never,
} | {
  type: 'video',
  maxAllowedFileSize: number,
}) & {
  callback: (images: MediaFileType[]) => void,
  onClose: () => void,
  initialSelected?: MediaFileType[],
  selectionLimit?: number,
};

const MediaPicker: React.FC<MediaPickerProps> = ({
  callback,
  onClose,
  initialSelected,
  selectionLimit = 20,
  type,
  maxAllowedFileSize,
}) => {
  const [images, setImages] = useState<PhotoIdentifier[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<PhotoIdentifier[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewFile, setPreviewFile] = useState<string[]>([]);
  const [sizeInfoModal, setSizeInfoModal] = useState(false);
  const { windowSizes } = useTypedSelector(state => state.general);

  const itemSize = Math.round(windowSizes.width) / 4;

  useEffect(() => {
    async function hasAndroidPermission() {
      const getCheckPermissionPromise = () => {
        if (Platform.Version as number >= 33) {
          return Promise.all([
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
          ]).then(
            ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
              hasReadMediaImagesPermission && hasReadMediaVideoPermission,
          );
        } else {
          return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        }
      };

      const hasPermission = await getCheckPermissionPromise();
      if (hasPermission) {
        return true;
      }
      const getRequestPermissionPromise = () => {
        if (Platform.Version as number >= 33) {
          return PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ]).then(
            (statuses) =>
              statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
              statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
          );
        } else {
          return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
        }
      };

      return await getRequestPermissionPromise();
    };

    const getFiles = async () => {
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      };

      const images = await CameraRoll.getPhotos({ first: 100000, assetType: type === 'image' ? 'Photos' : 'Videos' });

      if (initialSelected && initialSelected.length > 0) {
        const transformTestFile = (item: MediaFileType): PhotoIdentifier => ({
          node: {
            id: item.id as any,
            type: item.mime,
            group_name: [],
            image: {
              filename: null,
              filepath: null,
              extension: null,
              uri: item.path,
              height: 0,
              width: 0,
              fileSize: null,
              playableDuration: 0,
              orientation: null,
              beforePath: item.beforePath,
            },
            timestamp: 0,
            modificationTimestamp: 0,
            location: null,
          },
        });

        const transformedArray: PhotoIdentifier[] = initialSelected.map(transformTestFile);

        const filteredImages = images.edges.filter(file => !transformedArray.some(selected => selected.node.image.beforePath === file.node.image.uri));

        setImages([...transformedArray, ...filteredImages]);
        setSelectedFiles(transformedArray);
      } else {
        setImages(images.edges);
      };
    };

    getFiles();
  }, [initialSelected]);

  useEffect(() => {
    if (!previewMode) {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        onClose();
        return true;
      });

      return () => {
        handler.remove();
      };
    }
  }, [previewMode, images]);

  const handlePressItem = async (image: PhotoIdentifier) => {
    if (selectionLimit > 1) {
      const isSelected = selectedFiles.some(item => item.node.image.uri === image.node.image.uri);
      if (isSelected) {
        setSelectedFiles(prevSelected => prevSelected.filter(item => item.node.image.uri !== image.node.image.uri));
      } else if (!isSelected && selectedFiles.length < selectionLimit) {
        setSelectedFiles(prevSelected => [...prevSelected, image]);
      };
    } else {
      const processCallback = () => {
        callback([{
          mime: image.node.type,
          path: image.node.image.uri,
          beforePath: image.node.image.beforePath,
        }]);
      };

      if (type === 'video') {
        const statFile = await stat(image.node.image.uri);
        if (statFile.size > maxAllowedFileSize) {
          setSizeInfoModal(true);
        } else {
          processCallback();
        }
      } else {
        processCallback();
      };
    };
  };

  const handleLongPressItem = (item: PhotoIdentifier) => {
    setPreviewMode(true);
    setPreviewFile([item.node.image.uri]);
  };

  const handleConfirm = () => {
    const transformedArray: MediaFileType[] = selectedFiles.map(item => ({
      id: item.node.id as any,
      mime: item.node.type,
      path: item.node.image.uri,
      beforePath: item.node.image.beforePath
    }));

    console.log('Media picker:', transformedArray);
    callback(transformedArray);
  };

  const closePreview = () => {
    setPreviewMode(false);
  };

  const PreviewVideo = ({ item }: { item: string[] }) => {
    const [height, setHeight] = useState(0);

    return (
      <Video
        source={{ uri: item[0] }}
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

  const ImageItem = useCallback(({ item }: { item: PhotoIdentifier }) => {
    const selectedIndex = selectedFiles.findIndex((element) => element.node.image.uri === item.node.image.uri);
    const selected = selectedIndex !== -1;

    return (
      <TouchableOpacity
        onPress={() => handlePressItem(item)}
        onLongPress={() => handleLongPressItem(item)}
        activeOpacity={0.9}
        style={{ position: 'relative' }}
      >
        <Image
          source={{ uri: item.node.image.uri }}
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
    <ScreenHeaderProvider title={type === 'image' ? 'Wybierz zdjęcia' : 'Wybierz wideo'} callback={onClose}>
      <FlatList
        data={images}
        numColumns={4}
        keyExtractor={(item) => item.node.image.uri}
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
      <ImageViewer
        close={() => setPreviewMode(false)}
        visible={previewMode && !!previewFile}
        data={previewFile}
      />
      {type === 'video' &&
        <>
          <Modal
            visible={previewMode && !!previewFile.length}
            onRequestClose={() => setPreviewMode(false)} 
            onClose={() => setPreviewMode(false)}
          >
            <ScreenHeaderProvider
              backgroundContent={'#000'}
              callback={closePreview}
              headerItemsColor={Colors.White}
              backgroundHeader={Colors.Black10}
              transparent
              title=' '
            >
              {previewFile.length &&
                <View style={styles.Preview}>
                  <PreviewVideo item={previewFile} />
                </View>
              }
            </ScreenHeaderProvider>
          </Modal>
          <Modal
            transparent={true}
            visible={sizeInfoModal}
            onClose={() => setSizeInfoModal(false)}
          >
            <View style={styles.SizeModalContainer}>
              <View style={styles.SizeModalContent}>
                <Typography>
                  Zbyt duży rozmiar pliku. Maksymalny rozmiar wynosi: {Math.round(maxAllowedFileSize / (1024 * 1024) * 100) / 100} MB
                </Typography>
                <Button
                  style={{ height: 30 }}
                  variant='text'
                  onPress={() => setSizeInfoModal(false)}
                >
                  Ok
                </Button>
              </View>
            </View>
          </Modal>
        </>
      }
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
  SizeModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  SizeModalContent: {
    width: 300,
    backgroundColor: Colors.White,
    borderRadius: 4,
    padding: 20,
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default MediaPicker;