import { DarkTheme, DefaultTheme, LinkingOptions, NavigationContainer, NavigatorScreenParams, } from '@react-navigation/native';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import AuthNavigator, { AuthStackLinking, AuthStackParamList } from './AuthNavigator';
import CalendarNavigator, { CalendarStackLinking, CalendarStackParamList } from './CalendarNavigator';
import CandidatesNavigator, { CandidatesStackLinking, CandidatesStackParamList, } from './CandidatesNavigator';
import ProfileNavigator, { ProfileStackLinking, ProfileStackParamList } from './ProfileNavigator';
import AdvertNavigator, { AdvertStackLinking, AdvertStackParamList } from './AdvertNavigator';
import MessengerNavigator, { MessengerStackLinking, MessengerStackParamList, } from './MessengerNavigator';
import MenuNavigator, { MenuStackLinking, MenuStackParamList } from './MenuNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import BottomTabs from '../components/organisms/BottomTabs/BottomTabs';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Keyboard, StyleSheet, View } from 'react-native';
// import SplashScreen from "react-native-splash-screen";
// import AsyncStorage from '@react-native-community/async-storage';
// import SwipeablePanel from '../components/organisms/SwipeablePanel/SwipeablePanel';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import authServices from '../services/authServices';
import generalServices from '../services/generalServices';
import Colors from '../colors/Colors';
import { MediaType, ContactPersonType } from '../store/reducers/types';
import companyServices from '../services/companyServices';
import candidatesServices from '../services/candidatesServices';
import BottomTabs from '../components/organismes/BottomTabs';
import SwipeablePanel from '../components/organismes/SwipeablePanel';
import AsyncStorage from '@react-native-community/async-storage';

export type RootStackParamList = {
  MenuStack: NavigatorScreenParams<MenuStackParamList>;
  CandidatesStack: NavigatorScreenParams<CandidatesStackParamList>;
  CalendarStack: NavigatorScreenParams<CalendarStackParamList>;
  AdvertStack: NavigatorScreenParams<AdvertStackParamList>;
  MessengerStack: NavigatorScreenParams<MessengerStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
};

const RootStack = createBottomTabNavigator<RootStackParamList>();

export const navigationLinking: LinkingOptions<RootStackParamList> = {
  prefixes: ['localhost'],
  config: {
    screens: {
      'MenuStack': {
        initialRouteName: 'MainScreen',
        path: 'home',
        screens: MenuStackLinking
      },
      'CandidatesStack': {
        initialRouteName: 'MainScreen',
        path: 'candidates',
        screens: CandidatesStackLinking
      },
      'CalendarStack': {
        initialRouteName: 'MainScreen',
        path: 'calendar',
        screens: CalendarStackLinking
      },
      'AdvertStack': {
        initialRouteName: 'MainScreen',
        path: 'adverts',
        screens: AdvertStackLinking
      },
      'MessengerStack': {
        initialRouteName: 'MainScreen',
        path: 'messenger',
        screens: MessengerStackLinking
      },
      'ProfileStack': {
        initialRouteName: 'MainScreen',
        path: 'profile',
        screens: ProfileStackLinking
      },
      'AuthStack': {
        initialRouteName: 'MainScreen',
        path: 'auth',
        screens: AuthStackLinking
      },
    },
  },
};

export const screens: React.ComponentProps<typeof RootStack.Screen>[] = [
  {
    name: 'MenuStack',
    component: MenuNavigator,
    options: {
      lazy: false,
    }
  },
  {
    name: 'CandidatesStack',
    component: CandidatesNavigator,
    options: {
      lazy: false
    }
  },
  {
    name: 'CalendarStack',
    component: CalendarNavigator,
    options: {
      lazy: false
    }
  },
  {
    name: 'AdvertStack',
    component: AdvertNavigator,
    options: {
      lazy: false
    }
  },
  {
    name: 'MessengerStack',
    component: MessengerNavigator
  },
  {
    name: 'ProfileStack',
    component: ProfileNavigator
  },
  {
    name: 'AuthStack',
    component: AuthNavigator
  },
];

const isDarkMode = false;

const RootNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const [profileFocused, setProfileFocused] = useState(false);
  const { appLoading, isTabbarVisible, token, swipeablePanelProps, userCompany, candidateNotes, currentScreen } = useTypedSelector(state => state.general);
  const { setCurrentScreen, setIsTabbarVisible, setToken, setSwipeablePanelProps, setUserCompany } = useActions();
  const tempKeyboardAccess = useRef<boolean>(false);
  const appDataLoaded = useRef<boolean>(false);
  const prevToken = useRef<string | null>('default');

  // useEffect(() => {
  //   if (!appLoading) {
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 100);
  //   }
  // }, [appLoading]);

  // useEffect(() => {
  //   (async () => {
  //     console.log('token: ', token);
  //     if (!appDataLoaded.current || (token && !prevToken.current)) {
  //       const [
  //         [k1, token],
  //         [k2, refresh_token],
  //       ] = await AsyncStorage.multiGet([
  //         'token',
  //         'refresh_token',
  //       ]);

  //       const isOk = await dispatch(generalServices.getAppData(token));
  //       if (!!isOk) {
  //         appDataLoaded.current = true;
  //         setToken({ refresh_token, token });
  //       }
  //     }
  //     prevToken.current = token;
  //   })();
  // }, [token]);

  // useEffect(() => {
  //   if (userCompany?.id && token) {
  //     let logo: MediaType | null = null;
  //     let video: MediaType | null = null;
  //     let photos: MediaType[] | null = null;
  //     let certificates: MediaType[] | null = null;
  //     let contactPersons: ContactPersonType[] | null = null;

  //     dispatch(candidatesServices.getCandidateMarks(token, userCompany.id));
  //     dispatch(candidatesServices.getCandidateNotes(token, userCompany.id));

  //     if (userCompany.logo === undefined || userCompany.photos === undefined || userCompany.certificates === undefined || userCompany.contactPersons === undefined || userCompany.video === undefined) {
  //       Promise.all([
  //         ...(userCompany.logo === undefined ? [
  //           dispatch(companyServices.getUserCompanyLogo(userCompany.id, token))
  //         ] : []),
  //         ...(userCompany.video === undefined ? [
  //           dispatch(companyServices.getUserCompanyVideo(userCompany.id, token))
  //         ] : []),
  //         ...(userCompany.photos === undefined ? [
  //           dispatch(companyServices.getUserCompanyPhotos(userCompany.id, token))
  //         ] : []),
  //         ...(userCompany.certificates === undefined ? [
  //           dispatch(companyServices.getUserCompanyCertificates(userCompany.id, token))
  //         ] : []),
  //         ...(userCompany.contactPersons === undefined ? [
  //           dispatch(companyServices.getUserCompanyContactPersons(userCompany.id, token))
  //         ] : []),
  //       ]).then((res) => {
  //         const [getLogo, getVideo, getPhotos, getCertificates, getcompanyContactPersons] = res as any;
  //         if (getLogo) logo = getLogo;
  //         if (getVideo) video = getVideo;
  //         if (getPhotos && getPhotos.length) photos = getPhotos;
  //         if (getCertificates && getCertificates.length) certificates = getCertificates;
  //         if (getcompanyContactPersons && getcompanyContactPersons.length) contactPersons = getcompanyContactPersons;
  //         setUserCompany({ ...userCompany, logo, video, photos, certificates, contactPersons });
  //       }).catch(() => { });
  //     }
  //   }
  // }, [userCompany, token]);

  useEffect(() => {
    if (tempKeyboardAccess.current || isTabbarVisible) {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        tempKeyboardAccess.current = true;
        setIsTabbarVisible(false);
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        tempKeyboardAccess.current = false;
        setIsTabbarVisible(true);
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [isTabbarVisible]);

  const setCurrentScreenHandler = (route: any) => {
    const history: any[] | undefined = route.state?.routes;
    const screenByParams: string | null = (route.params?.screen && route.params?.screen !== 'MainScreen') ? route.params?.screen : null;
    const screenByHistory: string | null = history && history[history?.length - 1] ? history[history.length - 1].name : null;
    const stack: string = route.name;
    const screen: string = screenByParams && screenByHistory ? screenByHistory : (screenByParams || screenByHistory || 'MainScreen');
    setCurrentScreen(stack + '-' + screen);
  }

  return (<>
    {/* {appLoading && <View style={styles.Loading}>
      <Spinner color={Colors.Basic900} size='lg' />
    </View>} */}
    <NavigationContainer
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      linking={navigationLinking}
    >
      <RootStack.Navigator
        backBehavior='history' initialRouteName="MenuStack" screenOptions={{ headerShown: false }}
        tabBar={({ state }) => <BottomTabs {...{ profileFocused, setProfileFocused, currentScreen, routes: state.routes.map(({ name }) => name) }} />}
      >
        {screens.map(screen =>
          <RootStack.Screen {...screen} listeners={({ route, navigation }) => ({ state: () => setCurrentScreenHandler(route), blur: () => navigation.setParams({ screen: undefined, params: undefined }) })} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
    {useMemo(() => (
      <SwipeablePanel closeButton isActive={!!swipeablePanelProps} onClose={() => setSwipeablePanelProps(null)} {...swipeablePanelProps} />
    ), [swipeablePanelProps])}
  </>);
};

const styles = StyleSheet.create({
  Loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.White,
    opacity: .6,
    zIndex: 2
  }
});

export default RootNavigator;