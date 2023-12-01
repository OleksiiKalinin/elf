import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useActions } from '../../hooks/useActions';
import ImagePicker from 'react-native-image-crop-picker';
import MediaPicker from '../../screens/MediaPicker';
import { Image, Video } from 'react-native-compressor';
import { stat } from 'react-native-fs';

export type MediaFileType = {
  mime: string,
  path: string,
  beforePath?: string,
  name?: string,
}

export type MediaSelectorProps = ({
  type: 'image',
  multiple?: true,
  selectionLimit?: number,
  crop?: never,
  initialSelected?: MediaFileType[],
  cropResolution?: never,
  imageCompressionSettings?: {
    maxWidth?: number,
    maxHeight?: number,
    quality?: number,
    output?: 'jpg' | 'png',
    disablePngTransparency?: boolean,
  },
  videoCompressionSettings?: never,
  compressionProgress?: never,
  minSizeToCompress?: never,
  maxAllowedFileSize?: never,
} | {
  type: 'image',
  multiple?: false,
  selectionLimit?: never,
  crop?: true,
  initialSelected?: never,
  cropResolution: {
    width: number,
    height: number,
  },
  imageCompressionSettings?: {
    quality?: number,
    output?: 'jpg' | 'png',
    disablePngTransparency?: boolean,
  },
  videoCompressionSettings?: never,
  compressionProgress?: never,
  minSizeToCompress?: never,
  maxAllowedFileSize?: never,
} | {
  type: 'image',
  multiple?: false,
  selectionLimit?: never,
  crop?: false,
  initialSelected?: never,
  cropResolution?: never,
  imageCompressionSettings?: {
    maxWidth?: number,
    maxHeight?: number,
    quality?: number,
    output?: 'jpg' | 'png',
    disablePngTransparency?: boolean,
  },
  videoCompressionSettings?: never,
  compressionProgress?: never,
  minSizeToCompress?: never,
  maxAllowedFileSize?: never,
} | {
  type: 'video',
  multiple?: never,
  selectionLimit?: never,
  crop?: never,
  initialSelected?: never,
  cropResolution?: never,
  imageCompressionSettings?: never,
  videoCompressionSettings?: {
    bitrate?: number,
    maxSize?: number,
  }
  minSizeToCompress?: number,
  maxAllowedFileSize?: number,
  compressionProgress?: (progress: number) => void,
}) & {
  callback: (images: MediaFileType[]) => void,
  render: (onPress: () => void) => JSX.Element;
};

const MediaSelector: React.FC<MediaSelectorProps> = ({
  type,
  multiple = false,
  selectionLimit,
  crop = false,
  initialSelected,
  cropResolution,
  imageCompressionSettings,
  videoCompressionSettings,
  minSizeToCompress = 20971520,
  maxAllowedFileSize = 104857600,
  compressionProgress,
  callback,
  render,
}) => {
  const [files, setFiles] = useState<any[]>();
  const [pickerActive, setPickerActive] = useState(false);
  const { setSwipeablePanelProps } = useActions();

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
      setSwipeablePanelProps({
        mode: 'screen',
        children:
          type === 'image' ?

            <MediaPicker
              type={'image'}
              callback={handleFiles}
              selectionLimit={multiple ? (selectionLimit || undefined) : 1}
              initialSelected={initialSelected || undefined}
            />

            :

            <MediaPicker
              type={'video'}
              callback={handleFiles}
              selectionLimit={multiple ? (selectionLimit || undefined) : 1}
              initialSelected={initialSelected || undefined}
              maxAllowedFileSize={maxAllowedFileSize}
            />
      });
    } else {
      setSwipeablePanelProps(null);
    };
  }, [pickerActive])

  const compressor = async (file: any, type: 'image' | 'video') => {
    if (file.beforePath) return file;
    console.log(file);

    const filePath = file.path.startsWith('file://') ? file.path : 'file://' + file.path
    const statFile = await stat(file.path);
    let result;

    if (type === 'image') {
      result = await Image.compress(
        filePath,
        {
          compressionMethod: imageCompressionSettings ? 'manual' : 'auto',
          progressDivider: 10,
          ...imageCompressionSettings
        }
      );
    } else {
      if (statFile.size < minSizeToCompress) {
        console.log('bez kompresji')
        result = file.path;
      } else {
        console.log('kompresja')
        result = await Video.compress(
          filePath,
          {
            compressionMethod: videoCompressionSettings ? 'manual' : 'auto',
            ...videoCompressionSettings
          },
          (progress) => {
            compressionProgress && compressionProgress(progress);
          }
        );
      };
    };

    // console.log('Before compression:', statFile);
    // const statResult = await stat(result);
    // console.log('After compression:', statResult);

    const compressedFile: MediaFileType = {
      name: result.split('/').pop()?.split('.').slice(0, -1).pop(),
      mime: file.mime,
      path: result,
      beforePath: statFile.path,
    };

    console.log(compressedFile);

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
                if (statFile.size > maxAllowedFileSize) {
                  console.log('zbyt duży rozmiar')
                } else {
                  console.log('rozmiar ok')
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

  return (
    <View>
      {render(handlePress)}
    </View>
  );
};

export default MediaSelector;
