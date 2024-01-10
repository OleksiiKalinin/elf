import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useActions } from '../../../hooks/useActions';
import ImagePicker from 'react-native-image-crop-picker';
import MediaPicker from './MediaPicker';
import { Image, Video } from 'react-native-compressor';
import { stat } from 'react-native-fs';
import Typography from '../../atoms/Typography';
import Button from '../../molecules/Button';
import Colors from '../../../colors/Colors';
import { MediaFileType, MediaSelectorProps } from '.';
import Modal from '../../atoms/Modal';

const defaultImageSettings = {
	maxWidth: 1920,
	maxHeight: 1080,
  quality: .8,
};

const defaultVideoSettings = {
  maxSize: 1920,
	minSizeToCompress: 20,
  maxAllowedFileSize: 100,
};

const MediaSelector: React.FC<MediaSelectorProps> = ({
  type,
  multiple = false,
  selectionLimit,
  crop = false,
  initialSelected,
  cropResolution,
  imageSettings,
  videoSettings,
  callback,
  render,
}) => {
  const [files, setFiles] = useState<any[]>();
  const [pickerActive, setPickerActive] = useState(false);
  const [sizeInfoModal, setSizeInfoModal] = useState(false);
  const { setSwipeablePanelProps } = useActions();

  const mergedImageSettings = { ...defaultImageSettings, ...imageSettings };
	const { maxWidth, maxHeight, quality} = mergedImageSettings;
	const mergedVideoSettings = { ...defaultVideoSettings, ...videoSettings };
  const {bitrate, maxSize, minSizeToCompress, maxAllowedFileSize, compressionProgress } = mergedVideoSettings;

  useEffect(() => {
    const handleCallback = async () => {
      if (files) {
        if (type === 'image') {
          if (!multiple && crop) {
            ImagePicker.openCropper({
              mediaType: 'photo',
              path: 'file://' + files[0].path,
              width: cropResolution?.width,
              height: cropResolution?.height,
              cropperToolbarTitle: 'Edytuj zdjęcie'
            }).then(async result => {
              const image = await compressor(result, 'image');
              return callback([image]);
            });
          } else if (!multiple) {
            const image = await compressor(files[0], 'image');
            return callback([image]);
          } else {
            const array: MediaFileType[] = [];
            for (const item of files) {
              const compressedItem = await compressor(item, 'image');
              array.push(compressedItem);
            }
            return callback(array);
          }
        } else if (type === 'video') {
          const video = await compressor(files[0], 'video');
          return callback([video]);
        };
      };
    };
    handleCallback();
  }, [files]);

  useEffect(() => {
    if (pickerActive) {
      let initialSelectedWithBeforePath;

      if(initialSelected){
        initialSelectedWithBeforePath = initialSelected.map((file) => ({
          ...file,
          beforePath: file.beforePath || 'server',
        }));
      };

      setSwipeablePanelProps({
        mode: 'screen',
        children:
          type === 'image' ?

            <MediaPicker
              type={'image'}
              callback={handleFiles}
              onClose={() => setPickerActive(false)}
              selectionLimit={multiple ? (selectionLimit || undefined) : 1}
              initialSelected={initialSelectedWithBeforePath}
            />

            :

            <MediaPicker
              type={'video'}
              callback={handleFiles}
              onClose={() => setPickerActive(false)}
              selectionLimit={multiple ? (selectionLimit || undefined) : 1}
              initialSelected={initialSelectedWithBeforePath}
              maxAllowedFileSize={megabytesToBytes(maxAllowedFileSize)}
            />
      });
    } else {
      setSwipeablePanelProps(null);
    };
  }, [pickerActive])

  const compressor = async (file: any, type: 'image' | 'video') => {
    if (file.beforePath) return file;

    const filePath = file.path.startsWith('file://') ? file.path : 'file://' + file.path
    const statFile = await stat(file.path);
    let result;

    if (type === 'image') {
      result = await Image.compress(
        filePath,
        {
          compressionMethod: 'manual',
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          quality: quality,
        },
      );
    } else {
      if (statFile.size < megabytesToBytes(minSizeToCompress)) {
        result = file.path;
      } else {
        result = await Video.compress(
          filePath,
          {
            compressionMethod: 'manual',
            bitrate: bitrate,
            maxSize: maxSize,
          },
          (progress) => {
            compressionProgress && compressionProgress(parseFloat(progress.toString().slice(0, 2) + progress.toString().slice(4, 8)));
          },
        );
      };
    };

    // console.log('Before compression:', statFile.size / 1024 / 1024);
    // const statResult = await stat(result);
    // console.log('After compression:', statResult.size / 1024 / 1024);

    const compressedFile: MediaFileType = {
      name: result.split('/').pop()?.split('.').slice(0, -1).pop(),
      mime: file.mime,
      path: result,
      beforePath: statFile.path,
    };

    return compressedFile;
  };

  const handleFiles = (files: MediaFileType[]) => {
    setFiles(files);
    setPickerActive(false);
  };

  const handlePress = () => {
    if (!multiple) {
      setSwipeablePanelProps({
        title: 'W jaki sposób chcesz dodać media?',
        closeButton: true,
        buttons: [
          {
            children: 'Aparat',
            onPress: () => ImagePicker.openCamera({
              mediaType: type === 'image' ? 'photo' : 'video',
            }).then(async result => {
              if (type === 'image') {
                return setFiles([result]);
              } else {
                const statFile = await stat(result.path);
                if (statFile.size > megabytesToBytes(maxAllowedFileSize)) {
                  setSizeInfoModal(true);
                } else {
                  return setFiles([result]);
                };
              }
            }),
          },
          {
            children: 'Wybierz z galerii',
            onPress: () => setPickerActive(true)
          },
        ],
      })
    } else {
      setPickerActive(true);
    };
  };

  const megabytesToBytes = (mb: number) => {
		const bytes = mb * 1024 * 1024;
		return bytes;
	};

  return (
    <View>
      {render(handlePress)}
      {type === 'video' &&
        <Modal
          transparent={true}
          visible={sizeInfoModal}
          onClose={() => setSizeInfoModal(false)}
        >
          <View style={styles.SizeModalContainer}>
            <View style={styles.SizeModalContent}>
              <Typography>
                Zbyt duży rozmiar pliku. Maksymalny rozmiar wynosi: {maxAllowedFileSize} MB
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
      }
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MediaSelector;