import React, { FC, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import useRouter from '../../hooks/useRouter';
import { ScrollView } from '../../components/molecules/ScrollView';
import authServices from '../../services/authServices';
import SvgIcon, { IconTypes } from '../../components/atoms/SvgIcon';
import { useGoogleLogin } from '@react-oauth/google';

const MainScreen: FC = () => {
  const dispatch = useTypedDispatch();
  const { useLink } = useRouter();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  const additionalButtons: Array<{ icon: IconTypes; color: string; onPress: () => void; }> = [
    {
      icon: 'facebookLittle',
      color: Colors.Link,
      onPress: () => dispatch(authServices.facebookSignin()),
    },
    {
      icon: 'googleLittle',
      color: Colors.White,
      onPress: () => {
        login();
        // dispatch(authServices.googleSignin()),
      }
    },
  ];

  return (
    <View style={styles.Wrapper}>
      <ScrollView style={styles.Content}>
        <View style={styles.LogoContainer}>
          <SvgIcon icon="logoBig" style={styles.Logo} />
        </View>
        <View style={styles.InfoText}>
          <Typography textAlign="center" variant="h5" weight="SemiBold">
            Załóż konto, żeby szybciej znaleźć pracownika.
          </Typography>
        </View>
        <View style={styles.Button}>
          <Button
            height={56}
            contentVariant='h5'
            {...useLink({ href: { stack: 'AuthStack', screen: 'LoginScreen' } })}
          >
            ZALOGUJ SIĘ
          </Button>
        </View>
        <View>
          <Button
            height={56}
            variant='secondary'
            contentVariant='h5'
            {...useLink({ href: { stack: 'AuthStack', screen: 'RegistrationScreen' } })}
          >
            ZAREJESTRUJ SIĘ
          </Button>
        </View>
        <View style={styles.InfoText}>
          <Typography color={Colors.Basic600} textAlign="center" variant="h5" weight="SemiBold">
            Lub
          </Typography>
        </View>
        <View style={styles.Social}>
          {additionalButtons.map(({ color, icon, onPress }) => (
            <Button
              bg={color} onPress={onPress}
              variant='text'
              style={styles.SocialButton}
            >
              <SvgIcon icon={icon} />
            </Button>
          ))}
        </View>
      </ScrollView>
      <Button
        variant="text"
        contentVariant="h5"
        contentWeight="SemiBold"
        {...useLink({ href: { stack: 'MenuStack' } })}
      >
        Anuluj
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    minHeight: '100%',
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
    marginHorizontal: 6,
    height: 60,
    width: 98,
    borderRadius: 4
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