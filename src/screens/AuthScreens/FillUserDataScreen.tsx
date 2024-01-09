import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AuthStackParamList } from '../../navigators/AuthNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import validateMail from '../../hooks/validateMail';
import generalServices from '../../services/generalServices';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { ScrollView } from '../../components/molecules/ScrollView';
import useRouter from '../../hooks/useRouter';


const FillUserDataScreen: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  const { userData, token } = useTypedSelector(state => state.general);
  const [email, setEmail] = useState<string>(userData?.email || '');
  const [first_name, setFirstName] = useState<string>(userData?.first_name || '');
  const [last_name, setLastName] = useState<string>(userData?.last_name || '');
  const { replace } = useRouter();

  // useEffect(() => {
  //   if (!token || userData && userData.email && userData.first_name && userData.last_name) {
  //     replace({ stack: 'MenuStack' });
  //   }
  // }, [token, userData]);

  useEffect(() => {
    setIsDataValid(validateMail(email) && !!first_name && !!last_name);
  }, [email, first_name, last_name]);

  const fillDataHandler = async () => {
    if (isDataValid) {
      setLoading(true);
      const data: any = {};
      if (email) data.email = email;
      if (first_name) data.first_name = first_name;
      if (last_name) data.last_name = last_name;
      const isOk = await dispatch(generalServices.setUserData(data, 'put'));
      setLoading(false);
      if (!!isOk) {
        replace({ stack: 'MenuStack' });
      }
    } else setShowTips(true);
  }

  return (
    <ScreenHeaderProvider
      mode='mainTitle'
      backgroundContent={Colors.Basic200}
    >
      <ScrollView contentContainerStyle={{ flex: 1, margin: 24 }} keyboardShouldPersistTaps='always'>
        <View style={{ marginBottom: 12 }}>
          <Typography variant='h4' weight='Bold'>Uzupełnij brakujące dane konta</Typography>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Typography color={Colors.Basic600}>W przeciwnym przypadku nie będą Ci dostępne większość funkcji aplikacji.</Typography>
        </View>
        {!!!userData?.email && <View style={{ marginBottom: 10 }}>
          <TextField
            label='Email'
            textContentType='emailAddress'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            {...(showTips && !validateMail(email) && { bottomText: 'Niepoprawny email' })}
          />
        </View>}
        {!!!userData?.first_name && <View style={{ marginBottom: 10 }}>
          <TextField
            label='Imię'
            value={first_name}
            onChangeText={setFirstName}
            {...(showTips && !first_name && { bottomText: 'Nie zostało podane imię' })}
          />
        </View>}
        {!!!userData?.last_name && <View style={{ marginBottom: 10 }}>
          <TextField
            label='Nazwisko'
            value={last_name}
            onChangeText={setLastName}
            {...(showTips && !last_name && { bottomText: 'Nie zostało podane nazwisko' })}
          />
        </View>}
      </ScrollView>
      <Button
        withLoading
        disabled={loading}
        onPress={fillDataHandler}
        stickyBottom
      >
        Potwierdź
      </Button>
    </ScreenHeaderProvider>
  )
}

const styles = StyleSheet.create({
});

export default FillUserDataScreen;