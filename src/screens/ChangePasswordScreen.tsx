import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { ContactPersonType } from '../store/reducers/types';
import Typography from '../components/atoms/Typography';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import Colors from '../colors/Colors';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import TimePickerModal from '../components/modified_modules/react-native-paper-dates/Time/TimePickerModal';
import validateMail from '../hooks/validateMail';
import Modal from '../components/atoms/Modal';
import CheckBox from '../components/atoms/CheckBox';
import { Separator } from 'tamagui';
import { isString } from 'lodash';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import authServices from '../services/authServices';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Snackbar } from 'react-native-paper';

export type PasswordType = {
  oldPassword: string,
  password: string,
  confirmPassword: string,
}

const ChangePasswordScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { userData, token } = useTypedSelector(state => state.general);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [showTimepicker, setShowTimepicker] = useState<'start' | 'end' | false>(false);
  const [errorModal, setErrorModal] = useState<string | null>(null);
  const { backToRemoveParams } = useRouter();
  const [error, setError] = useState<null | string>(null);
  const [formData, setFormData] = useState<PasswordType>({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const validateData = () => {
    const { password, confirmPassword } = formData;
    if(
      password.length >= 8
      && (password === confirmPassword)
    ){
      return true;
    } else {
      setShowTips(true);
      setError('Wprowadź poprawnie nowe hasło')
      return false;
    };
  };

  const changeFormDataHandler = (name: keyof PasswordType, text: string) => {
    setFormData(prev => ({ ...prev, [name]: text.replace(/\s/g, '') }));
  };

  const handleConfirm = async () => {
    const { oldPassword, password } = formData;
    if (validateData()) {
      const validOldPassword = await dispatch(authServices.login({ username: userData?.email as string, password: formData.oldPassword }));
      if(validOldPassword && oldPassword === password){
        setError('Nowe hasło musi się różnić od poprzedniego!');
      } else if (validOldPassword && oldPassword !== password){
        alert('Zmieniono hasło');
      };
    } else {
      setShowTips(true);
    };
  };

  return (
    <ScreenHeaderProvider title='Zmień hasło'>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 25 }}>
        <View style={styles.TextField}>
          <TextField
            label='Obecne hasło'
            textContentType='password'
            secureTextEntry
            value={formData.oldPassword}
            onChangeText={text => changeFormDataHandler('oldPassword', text)}
            {...(showTips && formData.password.length < 8 && { bottomText: 'Niepoprawne hasło' })}
          />
        </View>
        <View style={styles.TextField}>
          <TextField
            label='Hasło'
            textContentType='password'
            secureTextEntry
            value={formData.password}
            onChangeText={text => changeFormDataHandler('password', text)}
            onPressIn={() => console.log(formData.password)}
            {...(showTips && formData.password.length < 8 && { bottomText: 'Hasło powinno zawierac min. 8 znaków' })}
          />
        </View>
        <View style={styles.TextField}>
          <TextField
            label='Powtórz Hasło'
            textContentType='password'
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={text => changeFormDataHandler('confirmPassword', text)}
            {...(showTips && (!formData.confirmPassword || (formData.password !== formData.confirmPassword)) && { bottomText: 'Niepoprawnie powtórzone hasło' })}
          />
        </View>
      </ScrollView>

      <View>
        <Button onPress={() => handleConfirm()}>
          Potwierdź
        </Button>
      </View>
      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        duration={4000}
        wrapperStyle={{
          maxWidth: 768,
          alignItems: 'center',
          position: Platform.OS === 'web' ? 'fixed' : 'absolute',
        }}
        style={{
          backgroundColor: Colors.Danger,
          maxWidth: 500,
        }}
      >
        {error}
      </Snackbar>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    flex: 1
  },
  TextField: {
    marginHorizontal: 19
  }
});

export default ChangePasswordScreen;