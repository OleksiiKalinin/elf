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
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import validateMail from '../../hooks/validateMail';
import generalServices from '../../services/generalServices';
import LoadingScreen from '../../components/atoms/LoadingScreen/LoadingScreen';

type ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'FillUserDataScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AuthStack'>
>;

const FillUserDataScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [first_name, setFirstName] = useState<string>('');
  const [last_name, setLastName] = useState<string>('');
  const { userData, token } = useTypedSelector(state => state.general);

  useEffect(() => {
    if (token && userData && userData.email && userData.first_name && userData.last_name) {
      navigation.navigate('MenuStack', { screen: 'MainScreen' });
    }
  }, [token, userData]);

  useEffect(() => {
    setIsDataValid(Boolean(
      (!!userData?.email || validateMail(email)) &&
      (!!userData?.first_name || first_name) &&
      (!!userData?.last_name || last_name)
    ))
  }, [email, first_name, last_name]);

  const fillDataHandler = async () => {
    if (isDataValid) {
      setLoading(true);
      const data: any = {};
      if (email) data.email = email;
      if (first_name) data.first_name = first_name;
      if (last_name) data.last_name = last_name;
      const isOk = await dispatch(generalServices.setUserData(data, token, 'post'));
      setLoading(false);
      !!isOk && navigation.navigate('MenuStack', { screen: 'MainScreen' });
    } else setShowTips(true);
  }

  return !!token && userData && !(userData.email && userData.first_name && userData.last_name) ? (
    <ScreenHeaderProvider currentStack='AuthStack'>
      <View style={styles.Wrapper}>
        <ScrollView contentContainerStyle={{ flex: 1, margin: 24 }} keyboardShouldPersistTaps='always'>
          <View style={{ marginBottom: 12 }}>
            <Typography variant='h4' weight='Bold'>Uzupełnij brakujące dane konta</Typography>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Typography color={Colors.Basic600}>W przeciwnym przypadku nie będą Ci dostępne większość funkcji aplikacji.</Typography>
          </View>
          {!!!userData?.email && <View>
            <TextField
              label='Email'
              textContentType='emailAddress'
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
              {...(showTips && !validateMail(email) && { bottomText: 'Niepoprawny email' })}
            />
          </View>}
          {!!!userData?.first_name && <View>
            <TextField
              label='Imię'
              value={first_name}
              onChangeText={setFirstName}
              {...(showTips && !first_name && { bottomText: 'Nie zostało podane imię' })}
            />
          </View>}
          {!!!userData?.last_name && <View>
            <TextField
              label='Nazwisko'
              value={last_name}
              onChangeText={setLastName}
              {...(showTips && !last_name && { bottomText: 'Nie zostało podane nazwisko' })}
            />
          </View>}
        </ScrollView>
        <View>
          <ButtonRipple withLoading disabled={loading} onPress={fillDataHandler}>Potwierdź</ButtonRipple>
        </View>
      </View>
    </ScreenHeaderProvider>
  ) : <></>
}

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
});

export default FillUserDataScreen;