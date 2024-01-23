import React, { FC, useEffect, useState } from 'react';
import { BackHandler, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography';
import Button from '../../components/molecules/Button';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import useRouter from '../../hooks/useRouter';
import { ScrollView } from '../../components/molecules/ScrollView';
import authServices from '../../services/authServices';
import SvgIcon, { IconTypes } from '../../components/atoms/SvgIcon';
import { useGoogleLogin } from '@react-oauth/google';
import { FacebookSigninButton } from '../../components/organismes/FacebookSignin';

const MainScreen: FC = () => {
  const dispatch = useTypedDispatch();
  const { useLink, back } = useRouter();

  const googleSignin = Platform.OS === 'web' ?
    useGoogleLogin({ onSuccess: ({ access_token }) => dispatch(authServices.googleSignin(access_token)) })
    :
    () => dispatch(authServices.googleSignin());

  const facebookSignin = (accessToken: string | null) => dispatch(authServices.facebookSignin(accessToken));

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
          <FacebookSigninButton
            onSuccess={facebookSignin}
            render={<Button
              variant='TouchableOpacity'
              style={[styles.SocialButton, { backgroundColor: Colors.Link }]}
            >
              <SvgIcon icon='facebookLittle' />
            </Button>
            }
          />
          <Button
            variant='TouchableOpacity'
            onPress={() => googleSignin()}
            style={[styles.SocialButton, { backgroundColor: Colors.White }]}
          >
            <SvgIcon icon='googleLittle' />
          </Button>
        </View>
      </ScrollView>
      <Button
        variant="text"
        contentVariant="h5"
        contentWeight="SemiBold"
        onPress={back}
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
    marginLeft: 6,
    marginRight: 6,
    height: 60,
    width: 98,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: "center"
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