import React, { FC, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
// import Typography from '../../components/atoms/Typography/Typography';
// import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import { AuthStackParamList } from '../../navigators/AuthNavigator';
import {
  CompositeScreenProps, useIsFocused
} from '@react-navigation/native';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import SvgIcon, { IconTypes } from '../../components/molecules/SvgIcon/SvgIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import authServices from '../../services/authServices';
import { useDispatch } from 'react-redux';
import { IconTypes } from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import useRouter from '../../hooks/useRouter';
import { ScrollView } from '../../components/molecules/ScrollView';

const MainScreen: FC = () => {
  const dispatch = useTypedDispatch();
  const { useLink } = useRouter();

  // const additionalButtons: Array<{ icon: IconTypes; color: string; onPress: () => void; }> = [
  //   {
  //     icon: 'facebookLittle',
  //     color: Colors.Link,
  //     onPress: () => dispatch(authServices.facebookSignin()),
  //   },
  //   {
  //     icon: 'googleLittle',
  //     color: Colors.White,
  //     onPress: () => dispatch(authServices.googleSignin()),
  //   },
  // ];

  return (
    <View style={styles.Wrapper}>
      <ScrollView style={styles.Content}>
        {/* <View style={styles.LogoContainer}>
          <SvgIcon icon="logoBig" style={styles.Logo} />
        </View> */}
        <View style={styles.InfoText}>
          <Typography textAlign="center" variant="h5" weight="SemiBold">
            Załóż konto, żeby szybciej znaleźć pracownika.
          </Typography>
        </View>
        <View style={styles.Button}>
          <Button style={styles.loginButton} {...useLink({href: {stack: 'AuthStack', screen: 'LoginScreen'}})}>
            <Typography color={Colors.Basic100} textAlign="center" variant="h5" weight="Bold">
              ZALOGUJ SIĘ
            </Typography>
          </Button>
        </View>
        <View>
          <Button style={styles.loginButton} color={Colors.Basic500} {...useLink({href: {stack: 'AuthStack', screen: 'RegistrationScreen'}})}>
            <Typography color={Colors.Basic900} textAlign="center" variant="h5" weight="Bold">
              ZAREJESTRUJ SIĘ
            </Typography>
          </Button>
        </View>
        {/* <View style={styles.InfoText}>
          <Typography color={Colors.Basic600} textAlign="center" variant="h5" weight="SemiBold">
            Lub
          </Typography>
        </View>
        <View style={styles.Social}>
          {additionalButtons.map(({ color, icon, onPress }) => (
            <ButtonRipple color={color} onPress={onPress}
              style={{ width: 98, paddingVertical: 0, height: '100%' }}
              containerStyles={{ borderRadius: 4, overflow: 'hidden', marginHorizontal: 6, height: 60 }}
            >
              <SvgIcon icon={icon} />
            </ButtonRipple>
          ))}
        </View> */}
      </ScrollView>
      <View>
        <Button variant="text" {...useLink({href: {stack: 'MenuStack'}})}>
          <Typography color={Colors.Basic600} textAlign="center" variant="h5" weight="SemiBold">
            Anuluj
          </Typography>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: Colors.Basic200,
  },
  Content: {
    flex: 1,
  },
  Button: {
    paddingBottom: 40,
  },
  Social: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SocialButton: {
    flex: 1,
    width: 120,
    height: 65,
    shadowColor: Colors.White,
  },
  InfoText: {
    paddingHorizontal: 72,
    paddingVertical: 40,
  },
  LogoContainer: {
    alignItems: 'center',
  },
  Logo: {
    marginTop: 32,
  },
  loginButton: {
    height: 56,
  },
});

export default MainScreen;