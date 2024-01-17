import { CompositeScreenProps } from '@react-navigation/native';
import React, { FC } from 'react';
import { Dimensions, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../colors/Colors';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import authServices from '../../services/authServices';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import useRouter from '../../hooks/useRouter';
import { ScrollView } from '../../components/molecules/ScrollView';
import Button from '../../components/molecules/Button';
import SvgIcon from '../../components/atoms/SvgIcon';

const settings: {
  title: string,
  route:
  'PaymentScreen' |
  'HelpCenterScreen' |
  'NotificationScreen' |
  'PrivacyScreen' |
  'CookieScreen'
}[] = [
    {
      title: 'Płatności',
      route: 'PaymentScreen',
    },
    {
      title: 'Centrum pomocy',
      route: 'HelpCenterScreen',
    },
    {
      title: 'Powiadomienia',
      route: 'NotificationScreen',
    },
    {
      title: 'Polityka prywatności',
      route: 'PrivacyScreen',
    },
    {
      title: 'Ustawienia plików cookie',
      route: 'CookieScreen',
    },
  ];

const SettingsScreen: FC = () => {
  const dispatch = useTypedDispatch();
  const { setSwipeablePanelProps } = useActions();
  const { token } = useTypedSelector(state => state.general);
  const router = useRouter();

  // const logoutHandler = async () => {
  //   await dispatch(authServices.logout());
  //   setSwipeablePanelProps({
  //     title: 'Pomyślnie się wylogowałeś',
  //     closeButton: false,
  //     buttons: [
  //       {
  //         children: 'OK',
  //         contentColor: Colors.Basic600,
  //         onPress: () => router.push('/home')
  //       }
  //     ]
  //   })
  // }

  const goToNotificationScreen = () => {
    router.push({
      stack: 'ProfileStack',
      screen: 'NotificationScreen',
      params: undefined,
    });
  };

  return (
    <ScreenHeaderProvider>
      <ScrollView style={{ backgroundColor: Colors.Basic100, flex: 1 }}>
        {/* <View style={{ marginVertical: 20 }}>
          {settings.map(({ route, title }, i) => (
            <ButtonArrowSelector
              marginBottom={false}
              marginTop={false}
              borderTop={i === 0}
              text={title}
              onPress={() => navigation.navigate(route)}
            />
          ))}
        </View> */}
        <Button
          variant='text'
          arrowRight
          borderTop
          borderBottom
          onPress={() => goToNotificationScreen()}
        >
          <View style={styles.ArrowButton}>
            <View style={styles.ButtonIconContainer}>
              <SvgIcon icon='user' />
            </View>
            <Typography weight='SemiBold' variant='h5' style={{ alignSelf: 'center' }}>
              Dane konta
            </Typography>
          </View>
        </Button>
        {/* <View style={{ flex: 1, marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={logoutHandler}>
            <Typography color={Colors.Danger} variant="h4" weight='SemiBold' style={{ textDecorationLine: 'underline', textAlign: 'center', }}>
              Wyloguj się
            </Typography>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  ArrowButton: {
    flexDirection: 'row',
    gap: 5,
  },
  ButtonIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.Basic300,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;