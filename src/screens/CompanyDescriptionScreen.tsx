import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Colors from '../colors/Colors';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import useRouter from '../hooks/useRouter';
import Popover from '../components/molecules/Popover';
import SvgIcon from '../components/atoms/SvgIcon';
import Typography from '../components/atoms/Typography';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { isEqual } from 'lodash';
import { useActions } from '../hooks/useActions';

export type CompanyDescriptionScreenProps = {
  description: string | null,
  callback: (p: string) => void,
  title?: string,
};

const CompanyDescriptionScreen: React.FC<CompanyDescriptionScreenProps> = (props) => {
  const { callback, description, title } = props;
  const oldValue = description || '';
  const [value, setValue] = useState<string>(description || '');
  const [showTips, setShowTips] = useState<boolean>(false);
  const [unsavedData, setUnsavedData] = useState<boolean>(false);
  const { backToRemoveParams } = useRouter();
  const { setBlockedScreen } = useActions();
  const { windowSizes, blockedScreen } = useTypedSelector(state => state.general);
  const minChars = 20;

  useEffect(() => {
    setUnsavedData(!isEqual(oldValue, value));
  }, [oldValue, value]);

  useEffect(() => {
    setBlockedScreen({ ...blockedScreen, blockedBack: unsavedData});
  }, [unsavedData]);

  const handleConfirm = () => {
    if(value.length >= minChars){
      callback(value.trim());
      backToRemoveParams();
    } else {
      setShowTips(true);
    };
  };

  return (
    <ScreenHeaderProvider
      title={title}
      otherActions={
        <Popover
          hideBlur
          placement='left-start'
          triggerComponent={(open) => (
            <Button
              variant='text'
              circular
              icon={<SvgIcon icon="threeDots" />}
              onPress={open}
            />
          )}
          contentContainerStyle={{ width: windowSizes.width * 0.85, maxWidth: 500, marginTop: 60, backgroundColor: Colors.White }}
        >
          <View style={{ padding: 19, }}>
            <Typography variant='h5' weight='Bold'>
              Przykładowy opis
            </Typography>
            <Typography style={{ marginTop: 20 }}>
              Prowadzimy kameralną restaurację w centrum Wrocławia, w której serwujemy oryginalne dania kuchni włoskiej. Przyrządzając je wyłącznie z wysokiej jakości składników, pozwalamy naszym klientom odkrywać wyjątkowe smaki Półwyspu Apenińskiego.
            </Typography>
            <Typography style={{ marginTop: 20 }}>
              Zatrudniamy 12 wykwalifikowanych pracowników, którzy dbają nie tylko o profesjonalną obsługę, lecz również odpowiednią atmosferę. Oferujemy usługi cateringowe, umożliwiając zamawianie jedzenia za pomocą najpopularniejszych aplikacji kurierskich.
            </Typography>
          </View>
        </Popover>
      }
    >
      <View style={{ backgroundColor: Colors.Basic100, flex: 1, padding: 19 }}>
        <View>
          <TextField
            placeholder="Opis firmy"
            multiline
            height={'auto'}
            returnKeyType='none'
            maxLength={5000}
            containerStyles={{ borderWidth: 1, padding: 10, paddingBottom: 15, borderRadius: 4 }}
            value={value}
            onChangeText={setValue}
            numberOfLines={5}
            autoGrow
            lineHeight={20}
            {...(showTips && (!value || value.length < minChars) && {
              bottomText: !value ? 'Wprowadź opis' : `Opis musi zawierać minimum ${minChars} znaków`,
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

export default CompanyDescriptionScreen;
