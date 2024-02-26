import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Colors from '../colors/Colors';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider, { ScreenHeaderProviderProps } from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import useRouter from '../hooks/useRouter';
import Popover from '../components/molecules/Popover';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { isEqual } from 'lodash';
import { useActions } from '../hooks/useActions';

export type FullscreenTextFieldScreenProps = {
  value: string | null,
  callback: (value: string) => void,
  inputPlaceholder?: string,
  minChars?: number,
  maxChars?: number,
  headerProviderProps?: Omit<ScreenHeaderProviderProps, 'children'>
};

const FullscreenTextFieldScreen: React.FC<FullscreenTextFieldScreenProps> = (props) => {
  const { callback, value: initialValue, minChars = 20, maxChars = 5000, headerProviderProps, inputPlaceholder } = props;
  const oldValue = initialValue || '';
  const [value, setValue] = useState<string>(initialValue || '');
  const [showTips, setShowTips] = useState<boolean>(false);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);
  const { backToRemoveParams } = useRouter();
  const { setBlockedScreen } = useActions();
  const { blockedScreen } = useTypedSelector(state => state.general);

  useEffect(() => {
    setUnsavedData(!isEqual(oldValue, value));
  }, [oldValue, value]);

  useEffect(() => {
    setBlockedScreen({ ...blockedScreen, blockedBack: unsavedData });
  }, [unsavedData]);

  const handleConfirm = () => {
    if (value.length >= minChars && value.length <= maxChars) {
      callback(value.trim());
      backToRemoveParams();
    } else {
      setShowTips(true);
    };
  };

  return (
    <ScreenHeaderProvider {...headerProviderProps}>
      <View style={{ backgroundColor: Colors.Basic100, flex: 1, padding: 19 }}>
        <View>
          <TextField
            placeholder={inputPlaceholder || "Informacje"}
            multiline
            height={'auto'}
            returnKeyType='none'
            maxLength={maxChars}
            containerStyles={{ borderWidth: 1, padding: 10, paddingBottom: 15, borderRadius: 4 }}
            value={value}
            onChangeText={setValue}
            numberOfLines={5}
            autoGrow
            lineHeight={20}
            {...(showTips && (!value || value.length < minChars) && {
              bottomText: !value ? 'Wprowadź informacje' : `Pole musi zawierać minimum ${minChars} znaków`,
            })}
          />
        </View>
      </View>
      <Button
        stickyBottom
        onPress={() => handleConfirm()}
      >
        Zapisz
      </Button>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({});

export default FullscreenTextFieldScreen;
