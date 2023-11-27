import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList, Modal } from 'react-native';
import Colors from '../../colors/Colors';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Typography from '../../components/atoms/Typography';
import { Dialog, Separator } from 'tamagui';
import useRouter from '../../hooks/useRouter';
import Button from '../../components/molecules/Button';
import RNFS, { ReadDirItem } from 'react-native-fs';
import { PermissionsAndroid } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerScreen from '../../screens/ImagePickerScreen';

export type MediaSelectorProps = ({
  type: 'image',
  callback: (images: any[]) => void,
  multiple?: true,
  selectionLimit?: number,
  crop?: never,
} | {
  type: 'image',
  callback: (image: {}) => void,
  multiple?: false,

  selectionLimit?: never,
  crop?: boolean,
} | {
  type: 'video',
  callback: (image: {}) => void,
  multiple?: never,
  selectionLimit?: never,
  crop?: never,
}) & {
  render: (onPress: () => void) => JSX.Element;
};

const MediaSelector: React.FC<MediaSelectorProps> = ({
  type,
  multiple = false,
  selectionLimit,
  callback,
  crop = false,
  render,
}) => {
  const [files, setFiles] = useState<any[]>();
  const [pickerActive, setPickerActive] = useState(false);
  const { setSwipeablePanelProps } = useActions();

  useEffect(() => {
    if (files) {
      if (type === 'image') {
        if (!multiple && crop) {
          ImagePicker.openCropper({
            mediaType: 'photo',
            path: 'file://' + files[0].path,
            width: 300,
            height: 400
          }).then(image => {
            console.log(image);
            return callback(image as any);
          });
        } else if(!multiple){
          callback(files[0]);
        } else {
          callback(files);
        }
      } else {

      }
    };
  }, [files]);

  useEffect(() => {
    if (pickerActive && type === 'image') {
      setSwipeablePanelProps({
        mode: 'screen',
        children:
          <ImagePickerScreen
            callback={handleFiles}
            selectionLimit={multiple ? (selectionLimit || undefined) : 1}
          />
      });
    } else {
      setSwipeablePanelProps(null);
    };
  }, [pickerActive])

  const handleFiles = (files: any[]) => {
    // console.log('HandleFile:', files)
    setFiles(files);
    setPickerActive(false);
  };

  const handlePress = () => {
    if (type === 'image') {
      if (!multiple) {
        setSwipeablePanelProps({
          title: 'W jaki sposób chcesz dodać media?',
          buttons: [
            {
              children: 'Aparat',
              onPress: () => ImagePicker.openCamera({
                mediaType: 'photo',
              }).then(image => {
                const files = [];
                files.push(image);
                return setFiles(files);
              }),
            },
            {
              children: 'Wybierz z galerii',
              onPress: () => setPickerActive(true)
            },
            {
              children: 'Anuluj',
              onPress: () => setSwipeablePanelProps(null)
            },
          ]
        })
      } else {
        setPickerActive(true);
      };
    } else {

    }
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
