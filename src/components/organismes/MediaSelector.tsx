import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useActions } from '../../hooks/useActions';
import ImagePicker from 'react-native-image-crop-picker';
import MediaPicker from '../../screens/MediaPicker';
import { Image, Video } from 'react-native-compressor';
import { stat } from 'react-native-fs';

export type MediaFileType = {
  name: string | undefined,
  path: string,
  size: number,
  mode?: number,
  ctime: number,
  mtime: number,
  originalFilepath?: string,
  isFile: () => boolean,
  isDirectory: () => boolean,
  beforePath?: string,
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
} | {
  type: 'video',
  multiple?: never,
  selectionLimit?: never,
  crop?: never,
  initialSelected?: never,
  cropResolution?: never,
  imageCompressionSettings?: never,
  videoCompressionSettings?:{
    bitrate?: number,
    maxSize?: number,
  }
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
          <MediaPicker
            type={type}
            callback={handleFiles}
            selectionLimit={multiple ? (selectionLimit || undefined) : 1}
            initialSelected={initialSelected || undefined}
          />
      });
    } else {
      setSwipeablePanelProps(null);
    };
  }, [pickerActive])

  const compressor = async (file: any, type: 'image' | 'video') => {
    if (!file.beforePath) {

      let result;
      const filePath = file.path.startsWith('file://') ? file.path : 'file://' + file.path

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

      const statFile = await stat(file.path);
      console.log('Before compression:', statFile);

      const statResult = await stat(result);
      console.log('After compression:', statResult);

      const compressedFile: MediaFileType = { ...statResult, beforePath: statFile.path };

      return compressedFile;
    } else {
      return file;
    }
  };

  const handleFiles = (files: any[]) => {
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
            }).then(result => {
              const files = [];
              files.push(result);
              return setFiles(files);
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

const styles = StyleSheet.create({

});

export default MediaSelector;
