import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/AuthNavigator';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import authServices from '../../services/authServices';
import { useDispatch } from 'react-redux';
import validateMail from '../../hooks/validateMail';
import CheckBox from '../../components/atoms/CheckBox';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';

type AuthRegistrateScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'RegistrationScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AuthStack'>
>;

export type RegistDataType = {
  email: string,
  first_name: string,
  last_name: string,
  mobile_number: string | null,
  password: string,
  confirmPassword: string,
  agree_rights: boolean,
}

const AuthRegistrateScreen: React.FC<AuthRegistrateScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<RegistDataType>({
    email: '',
    first_name: '',
    last_name: '',
    mobile_number: '',
    password: '',
    confirmPassword: '',
    agree_rights: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);

  const changeFormDataHandler = (name: keyof RegistDataType, text: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: typeof text === 'string' ? text.replace(/\s/g, '') : text }));
  }

  useEffect(() => {
    const { email, first_name, last_name, mobile_number, password, confirmPassword, agree_rights } = formData;
    setIsDataValid(Boolean(
      validateMail(email) &&
      first_name &&
      last_name &&
      (mobile_number?.length === 0 || formData.mobile_number?.length === 3 || mobile_number?.length === 12) &&
      password.length >= 8 &&
      (password === confirmPassword) &&
      agree_rights
    ))
  }, [formData]);

  const registrateHandler = async () => {
    if (isDataValid) {
      setLoading(true);
      // await dispatch(authServices.registrate({ ...formData, mobile_number: formData.mobile_number?.length === 12 ? formData.mobile_number : null }));
      setLoading(false);
    } else setShowTips(true);
  }

  return (
    <ScreenHeaderProvider currentStack='AuthStack'>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content} keyboardShouldPersistTaps='always'>
          {/* <View style={[styles.margin, { marginTop: 24 }]}>
            <Typography variant='h5'>Zarejestruj się</Typography>
          </View> */}
          <View style={[styles.margin, { marginTop: 15 }]}>
            <TextField
              label='Email'
              textContentType='emailAddress'
              keyboardType='email-address'
              value={formData.email}
              onChangeText={text => changeFormDataHandler('email', text)}
              {...(showTips && !validateMail(formData.email) && { bottomText: 'Niepoprawny email' })}
            />
          </View>
          <View style={styles.margin}>
            <TextField
              label='Imię'
              textContentType='name'
              value={formData.first_name}
              onChangeText={text => changeFormDataHandler('first_name', text)}
              {...(showTips && !formData.first_name && { bottomText: 'Nie zostało podane imię' })}
            />
          </View>
          <View style={styles.margin}>
            <TextField
              label='Nazwisko'
              textContentType='name'
              value={formData.last_name}
              onChangeText={text => changeFormDataHandler('last_name', text)}
              {...(showTips && !formData.last_name && { bottomText: 'Nie zostało podane nazwisko' })}
            />
          </View>
          <View style={styles.margin}>
            <TextField
              label='Telefon (opcjonalne)'
              textContentType='telephoneNumber'
              keyboardType='phone-pad'
              mask={['+', '4', '8', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
              activeLabel
              value={formData.mobile_number || ''}
              onChangeText={text => changeFormDataHandler('mobile_number', text)}
              {...(showTips && !(formData.mobile_number?.length === 0 || formData.mobile_number?.length === 3 || formData.mobile_number?.length === 12) && { bottomText: 'Niepoprawny numer telefonu' })}
            />
          </View>
          <View style={styles.margin}>
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
          <View style={styles.margin}>
            <TextField
              label='Powtórz Hasło'
              textContentType='password'
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={text => changeFormDataHandler('confirmPassword', text)}
              {...(showTips && (!formData.confirmPassword || (formData.password !== formData.confirmPassword)) && { bottomText: 'Niepoprawnie powtórzone hasło' })}
            />
          </View>
          <View style={styles.margin}>
            {/* <CheckBox
              isChecked={formData.agree_rights}
              onClick={() => changeFormDataHandler('agree_rights', !formData.agree_rights)}
              rightTextView={<View style={{ flex: 1 }}>
                <Typography {...(showTips && !formData.agree_rights ? { color: Colors.Danger } : {})} style={{ marginLeft: 12 }} variant='small'>Akceptuję regulamin aplikacji Jobassistant oraz zapoznałem się z Polityką Prywatności*.</Typography>
              </View>}
            /> */}
          </View>
          <View style={[styles.margin, { marginBottom: 24 }]}>
            <Typography color={Colors.Basic600} variant='small'>
              *Administratorem danych osobowych podawanych w formularzu jest
              Jobassistant z siedzibą w Puławach, ul. Ignacego Mościckiego 1.
              Szczegółowe informacje na temat przetwarzania Twoich danych osobowych
              oraz przysługujących Ci praw znajdziesz w{'  '}<Typography color={Colors.Link} onPress={() => Linking.openURL('https://jobassistant.pl/wp-content/uploads/2020/06/RODO_Ithouse_.pdf')}>Polityce Prywatności</Typography>.
            </Typography>
          </View>
        </ScrollView>
        <View>
          <Button disabled={loading} onPress={registrateHandler}>Potwierdź</Button>
        </View>
      </View>
    </ScreenHeaderProvider>
  )
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  Content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  margin: {
    marginVertical: 12,
  },
})

export default AuthRegistrateScreen;