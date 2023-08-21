import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Typography from '../../components/atoms/Typography/Typography'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigators/AuthNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import TextField from '../../components/molecules/TextField/TextField';
import ScreenHeader from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { useDispatch } from 'react-redux';
import validateMail from '../../hooks/validateMail';
import authServices from '../../services/authServices';
import { useActions } from '../../hooks/useActions';

type AuthLoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'RememberPasswordScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AuthStack'>
>;

type inputs = 'email' | 'password';

type formDataTypes = {
  email: string,
  password: string,
};

const RememberPasswordScreen: React.FC<AuthLoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const { setSwipeablePanelProps } = useActions();

  useEffect(() => {
    setIsDataValid(validateMail(email));
  }, [email]);

  const rememberPasswordHandler = async () => {
    if (isDataValid) {
      setLoading(true);
      const isOk = await dispatch(authServices.resetPassword(email));
      setLoading(false);
      !!isOk && setSwipeablePanelProps({
        title: 'Wiadomość do resetowania hasła została wysłana na wskazany adres email.',
        closeButton: false,
        buttons: [{
          children: 'OK',
          onPress: () => navigation.goBack()
        }]
      })
    } else setShowTips(true);
  }

  return (
    <ScreenHeaderProvider currentStack='AuthStack'>
      <View style={styles.Wrapper}>
        <View style={{ justifyContent: 'center', flex: 1, margin: 24 }}>
          <View style={{ marginVertical: 24 }}>
            <Typography variant='h2' weight='Bold'>Nie pamiętasz hasła?</Typography>
          </View>
          <View style={{ marginBottom: 48 }}>
            <Typography color={Colors.Basic600} weight='SemiBold'>
              Podaj adres e-mail służący do weryfikacji konta.
              Po zatwierdzeniu e-maila, na Twój kontaktowy adres e-mail
              zostanie wysłana wiadomość  z linkiem do zmiany hasła.
            </Typography>
          </View>
          <View>
            <TextField
              label='Email'
              textContentType='emailAddress'
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
              {...(showTips && !validateMail(email) && { bottomText: 'Niepoprawny email' })}
            />
          </View>
        </View>
        <View>
          <ButtonRipple withLoading disabled={loading} onPress={rememberPasswordHandler}>Potwierdź</ButtonRipple>
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
});

export default RememberPasswordScreen;