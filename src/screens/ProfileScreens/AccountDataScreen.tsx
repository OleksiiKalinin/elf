import { Linking, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/AuthNavigator';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import authServices from '../../services/authServices';
import { useDispatch } from 'react-redux';
import validateMail from '../../hooks/validateMail';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import generalServices from '../../services/generalServices';
import { useActions } from '../../hooks/useActions';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';

type AccountDataScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'AccountDataScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AuthStack'>
>;

export type RegistDataType = {
  email: string,
  first_name: string,
  last_name: string,
  mobile_number: string | null,
  password: string,
  new_password: string,
  confirmNewPassword: string,
}

const AccountDataScreen: React.FC<AccountDataScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData, token } = useTypedSelector(state => state.general);
  const { setSwipeablePanelProps } = useActions();
  const [formData, setFormData] = useState<RegistDataType>({
    email: userData ? userData.email : 'twoj_email@elf.pl',
    first_name: userData ? userData.first_name : 'Kochany',
    last_name: userData ? userData.last_name : 'Użytkownik',
    mobile_number: userData ? userData.mobile_number : '123456789',
    password: '',
    new_password: '',
    confirmNewPassword: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [displayChangePassword, setDisplayChangePassword] = useState<boolean>(false);

  const changeFormDataHandler = (name: keyof RegistDataType, text: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: typeof text === 'string' ? text.replace(/\s/g, '') : text }));
  }

  useEffect(() => {
    const { email, first_name, last_name, mobile_number, password, confirmNewPassword, new_password } = formData;
    setIsDataValid(Boolean(
      validateMail(email) &&
      first_name &&
      last_name &&
      (displayChangePassword ? (
        (mobile_number?.length === 0 || formData.mobile_number?.length === 3 || mobile_number?.length === 12) &&
        password.length >= 8 &&
        (new_password === confirmNewPassword)
      ) : true)
    ))
  }, [formData, displayChangePassword]);

  const changeHandler = async () => {
    if (isDataValid) {
      setLoading(true);
      const data: any = {};
      let diff: boolean = false;
      const fields: Array<'first_name' | 'last_name' | 'mobile_number'> = ['first_name', 'last_name', 'mobile_number'];
      fields.forEach(field => {
        if (formData[field] !== userData?.[field]) {
          data[field] = formData[field];
          diff = true;
        }
      });
      // if (diff) {
      //   const isOk = await dispatch(generalServices.setUserData(data, token, 'put'));
      //   if (!!isOk) {
      //     setSwipeablePanelProps({
      //       title: 'Dane zostały zmienione!',
      //       closeButton: false,
      //       buttons: [{
      //         children: 'OK',
      //         onPress: () => { }
      //       }]
      //     })
      //   }
      // }
      // setLoading(false);
    } else setShowTips(true);
  }

  return (
    <ScreenHeaderProvider currentStack='ProfileStack' {...(!userData ? { title: 'Przykładowe dane' } : {})}>
      <View style={styles.Wrapper}>
        <ScrollView style={styles.Content}>
          <View style={[styles.margin, { marginTop: 45 }]}>
            <TextField
              label='Email'
              value={formData.email}
              inputStyles={{ backgroundColor: Colors.Basic300, borderRadius: 4, color: Colors.TextDark, padding: 10 }}
              underline={false}
              editable={false}
              selectTextOnFocus={false}
              caretHidden
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
          {/* {!!userData && <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ padding: 10, marginLeft: -10 }} onPress={() => setDisplayChangePassword(prev => !prev)}>
              <Typography variant='h5' weight="SemiBold" color={displayChangePassword ? Colors.Blue500 : Colors.Basic600} style={{ textDecorationLine: 'underline' }}>
                {displayChangePassword ? 'Nie zmieniaj hasło' : 'Zmień hasło'}
              </Typography>
            </TouchableOpacity>
          </View>}
          {displayChangePassword && <>
            <View style={styles.margin}>
              <TextField
                label='Aktualne hasło'
                textContentType='password'
                secureTextEntry
                value={formData.password}
                onChangeText={text => changeFormDataHandler('password', text)}
                {...(showTips && formData.password.length < 8 && { bottomText: 'Niepoprawne hasło' })}
              />
            </View>
            <View style={styles.margin}>
              <TextField
                label='Nowe hasło'
                textContentType='password'
                secureTextEntry
                value={formData.new_password}
                onChangeText={text => changeFormDataHandler('new_password', text)}
                {...(showTips && formData.new_password.length < 8 && { bottomText: 'Niepoprawne hasło' })}
              />
            </View>
            <View style={styles.margin}>
              <TextField
                label='Powtórz nowe hasło'
                textContentType='password'
                secureTextEntry
                value={formData.confirmNewPassword}
                onChangeText={text => changeFormDataHandler('confirmNewPassword', text)}
                {...(showTips && (!formData.confirmNewPassword || (formData.new_password !== formData.confirmNewPassword)) && { bottomText: 'Niepoprawnie powtórzone hasło' })}
              />
            </View>
          </>} */}
        </ScrollView>
        <View>
          <Button withLoading={!!token} disabled={!token || loading} onPress={changeHandler}>Zaktualizuj</Button>
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

export default AccountDataScreen;