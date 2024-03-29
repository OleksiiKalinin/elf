import { Keyboard, Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { AuthStackParamList } from '../../navigators/AuthNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import Colors from '../../colors/Colors';
import { useDispatch } from 'react-redux';
import validateMail from '../../hooks/validateMail';
import authServices from '../../services/authServices';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { ScrollView } from '../../components/molecules/ScrollView';
import useRouter from '../../hooks/useRouter';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type inputs = 'username' | 'password';

export type LoginDataType = {
  username: string,
  password: string,
};

const AuthLoginScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { userData } = useTypedSelector(s => s.general);
  const [formData, setFormData] = useState<LoginDataType>({ username: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const changeFormDataHandler = (name: inputs, text: string) => {
    setFormData(prev => ({ ...prev, [name]: text.replace(/\s/g, '') }));
  }

  useEffect(() => {
    const { username, password } = formData;

    setIsDataValid(Boolean(
      validateMail(username) &&
      password.length >= 8
    ));
  }, [formData]);

  useEffect(() => {
    setLoggedIn(!!userData);
  }, [userData]);

  useEffect(() => {
    if (loggedIn) {
      router.replace({ stack: 'MenuStack' });
    }
  }, [loggedIn]);

  const loginHandler = async () => {
    if (isDataValid) {
      Keyboard.dismiss();
      setLoading(true);
      const isOk = await dispatch(authServices.login(formData));
      if (!!isOk) {
        setLoggedIn(true);
      }

      setLoading(false);
    } else setShowTips(true);
  }

  return (
    <ScreenHeaderProvider>
      <ScrollView style={styles.Wrapper} keyboardShouldPersistTaps='always'>
        <View style={[styles.margin, { marginTop: 24 }]}>
          <Typography variant='h4' weight='SemiBold'>Witaj ponownie!</Typography>
        </View>
        <View style={styles.margin}>
          <TextField
            label='Email'
            textContentType='emailAddress'
            keyboardType='email-address'
            value={formData.username}
            onChangeText={text => changeFormDataHandler('username', text)}
            {...(showTips && !validateMail(formData.username) && { bottomText: 'Niepoprawny email' })}
          />
        </View>
        <View style={styles.margin}>
          <TextField
            label='Hasło'
            textContentType='password'
            secureTextEntry
            value={formData.password}
            onChangeText={text => changeFormDataHandler('password', text)}
            {...(showTips && formData.password.length < 8 && { bottomText: 'Niepoprawne hasło' })}
          />
        </View>
        <View style={[styles.margin, { alignItems: 'flex-start' }]}>
          <Typography
            color={Colors.Link}
            variant='small'
            style={{ borderBottomWidth: 1, borderBottomColor: Colors.Link }}
            onPress={() => router.push({ stack: 'AuthStack', screen: 'RememberPasswordScreen' })}
          >
            Nie pamiętam hasła
          </Typography>
        </View>
        <View style={{ marginVertical: 24 }}>
          <Button disabled={loading} onPress={loginHandler}>Zaloguj się</Button>
        </View>
        <View style={styles.margin}>
          <Typography textAlign='center' weight='SemiBold' variant='h4'>Nie masz konta? Zarejestruj się.</Typography>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Button
            variant='secondary'
            onPress={() => router.push({ stack: 'AuthStack', screen: 'RegistrationScreen' })}
          >
            Zarejestruj się
          </Button>
        </View>
      </ScrollView >
    </ScreenHeaderProvider>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  margin: {
    marginVertical: 12,
    marginHorizontal: 24,
  },
});

export default AuthLoginScreen;