import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import Colors from '../colors/Colors';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import authServices from '../services/authServices';
import { useActions } from '../hooks/useActions';

type PasswordType = {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
};

const ChangePasswordScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { setSnackbarMessage } = useActions();
  const { backToRemoveParams } = useRouter();
  const [showTips, setShowTips] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<PasswordType>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const changeFormDataHandler = (name: keyof PasswordType, text: string) => {
    setFormData(prev => ({ ...prev, [name]: text.replace(/\s/g, '') }));
  };

  const validateData = () => {
    const { newPassword, confirmPassword } = formData;
    if (
      newPassword.length >= 8
      && (newPassword === confirmPassword)
    ) {
      return true;
    } else {
      setShowTips(true);
      setSnackbarMessage({ type: 'error', text: 'Wprowadź poprawnie nowe hasło' })
      return false;
    };
  };

  const handleConfirm = async () => {
    setLoading(true);
    const { currentPassword, newPassword } = formData;
    if (validateData()) {
      if (currentPassword !== newPassword) {
        const changePassword = await dispatch(authServices.changePassword(currentPassword, newPassword));
        if (changePassword) {
          setSnackbarMessage({ type: 'success', text: 'Hasło zostało zmienione' });
          backToRemoveParams();
        }
      } else if (currentPassword === newPassword) {
        setSnackbarMessage({ type: 'error', text: 'Nowe hasło musi się różnić od obecnego' })
        setLoading(false);
      }
    } else {
      setShowTips(true);
      setLoading(false);
    };
  };

  return (
    <ScreenHeaderProvider title='Zmień hasło'>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingTop: 25 }}>
        <View style={styles.TextField}>
          <TextField
            label='Aktualne hasło'
            textContentType='password'
            secureTextEntry
            value={formData.currentPassword}
            onChangeText={text => changeFormDataHandler('currentPassword', text)}
            {...(showTips && formData.currentPassword.length < 8 && { bottomText: 'Niepoprawne hasło' })}
          />
        </View>
        <View style={styles.TextField}>
          <TextField
            label='Nowe hasło'
            textContentType='password'
            secureTextEntry
            value={formData.newPassword}
            onChangeText={text => changeFormDataHandler('newPassword', text)}
            onPressIn={() => console.log(formData.newPassword)}
            {...(showTips && formData.newPassword.length < 8 && { bottomText: 'Hasło powinno zawierac min. 8 znaków' })}
          />
        </View>
        <View style={styles.TextField}>
          <TextField
            label='Powtórz Hasło'
            textContentType='password'
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={text => changeFormDataHandler('confirmPassword', text)}
            {...(showTips && (!formData.confirmPassword || (formData.newPassword !== formData.confirmPassword)) && { bottomText: 'Niepoprawnie powtórzone hasło' })}
          />
        </View>
      </ScrollView>
      <View>
        <Button
          onPress={() => handleConfirm()}
          disabled={loading}
          withLoading
        >
          Zaktualizuj
        </Button>
      </View>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: Colors.Basic100,
    flex: 1
  },
  TextField: {
    marginVertical: 12,
    marginHorizontal: 19,
  }
});

export default ChangePasswordScreen;