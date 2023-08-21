import { Keyboard, Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Typography from '../../components/atoms/Typography/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/AuthNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import TextField from '../../components/molecules/TextField/TextField';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { useDispatch } from 'react-redux';
import validateMail from '../../hooks/validateMail';
import authServices from '../../services/authServices';

type AuthLoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AuthStack'>
>;

type inputs = 'username' | 'password';

export type LoginDataType = {
  username: string,
  password: string,
};

const AuthLoginScreen: React.FC<AuthLoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<LoginDataType>({ username: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);

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

  const loginHandler = async () => {
    if (isDataValid) {
      Keyboard.dismiss();
      setLoading(true);
      await dispatch(authServices.login(formData));
      setLoading(false);
    } else setShowTips(true);
  }

  return (
    <ScreenHeaderProvider currentStack='AuthStack'>
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
          <Typography color={Colors.Link} style={{ borderBottomWidth: 1, borderBottomColor: Colors.Link }} variant='small' onPress={() => navigation.navigate('RememberPasswordScreen')}>Nie pamiętam hasła</Typography>
        </View>
        <View style={{ marginVertical: 24 }}>
          <ButtonRipple disabled={loading} onPress={loginHandler}>Zaloguj się</ButtonRipple>
        </View>
        <View style={styles.margin}>
          <Typography textAlign='center' weight='SemiBold' variant='h4'>Nie masz konta? Zarejestruj się.</Typography>
        </View>
        <View style={{ marginBottom: 12 }}>
          <ButtonRipple variant='secondary' onPress={() => navigation.navigate('RegistrationScreen')}>Zarejestruj się</ButtonRipple>
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