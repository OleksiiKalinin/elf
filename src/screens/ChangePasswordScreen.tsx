import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import TextField from '../components/molecules/TextField';
import ScreenHeaderProvider from '../components/organismes/ScreenHeaderProvider';
import Button from '../components/molecules/Button';
import Colors from '../colors/Colors';
import useRouter from '../hooks/useRouter';
import { ScrollView } from '../components/molecules/ScrollView';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import authServices from '../services/authServices';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Snackbar } from 'react-native-paper';

type PasswordType = {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
};

export type ChangePasswordScreenProps = {
  callback: () => void,
};

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ callback }) => {
  const dispatch = useTypedDispatch();
  const { backToRemoveParams } = useRouter();
  const { userData } = useTypedSelector(state => state.general);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
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
      setError('Wprowadź poprawnie nowe hasło')
      return false;
    };
  };

  const handleConfirm = async () => {
    setLoading(true);
    const { currentPassword, newPassword } = formData;
    if (validateData()) {
      const validCurrentPassword = await dispatch(authServices.checkPassword({ username: userData?.email as string, password: formData.currentPassword }));
      if (validCurrentPassword && currentPassword !== newPassword) {
        callback();
        backToRemoveParams();
      } else if (validCurrentPassword && currentPassword === newPassword) {
        setError('Nowe hasło musi się różnić od obecnego');
        setLoading(false);
      } else if (!validCurrentPassword) {
        setError('Niepoprawne aktualne hasło');
        setLoading(false);
      };
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
    marginVertical: 12,
    marginHorizontal: 19,
  }
});

export default ChangePasswordScreen;