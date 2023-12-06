import { LinkingOptions, NavigatorScreenParams, } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import AuthNavigator, { AuthStackLinking, AuthStackParamList } from './AuthNavigator';
import CalendarNavigator, { CalendarStackLinking, CalendarStackParamList } from './CalendarNavigator';
import CandidatesNavigator, { CandidatesStackLinking, CandidatesStackParamList, } from './CandidatesNavigator';
import ProfileNavigator, { ProfileStackLinking, ProfileStackParamList } from './ProfileNavigator';
import AdvertNavigator, { AdvertStackLinking, AdvertStackParamList } from './AdvertNavigator';
import MessengerNavigator, { MessengerStackLinking, MessengerStackParamList, } from './MessengerNavigator';
import MenuNavigator, { MenuStackLinking, MenuStackParamList } from './MenuNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { Keyboard, StyleSheet } from 'react-native';
import Colors from '../colors/Colors';
import BottomTabs from '../components/organismes/BottomTabs';
import { useRouter } from 'solito/router';
import notificationHandler from '../../notificationHandler/notificationHandler';

export type RootStackParamList = {
  MenuStack: MenuStackParamList;
  CandidatesStack: CandidatesStackParamList;
  CalendarStack: CalendarStackParamList;
  AdvertStack: AdvertStackParamList;
  MessengerStack: MessengerStackParamList;
  ProfileStack: ProfileStackParamList;
  AuthStack: AuthStackParamList;
};

type RootStackNavigatorType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? { [T in keyof RootStackParamList]: NavigatorScreenParams<RootStackParamList[T]['default']> } : never;

const RootStack = createBottomTabNavigator<RootStackNavigatorType>();

export const navigationLinking: LinkingOptions<RootStackNavigatorType> = {
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

const RootNavigator: React.FC = () => {
  const { isTabbarVisible } = useTypedSelector(state => state.general);
  const { setCurrentScreen, setIsTabbarVisible } = useActions();
  const tempKeyboardAccess = useRef<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    const lastRedirectTo = notificationHandler.lastRedirectTo;
    console.log(lastRedirectTo);
    if (lastRedirectTo && lastRedirectTo.startsWith('/')) {
      push(lastRedirectTo);

      // nie działa przy fast refresh!
      notificationHandler.setLastRedirectTo('');
    }
  }, []);

  /*     useEffect(() => {
        if (!appLoading) {
          setTimeout(() => {
            SplashScreen.hide();
          }, 100);
        }
      }, [appLoading]); */


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

  return (
    <RootStack.Navigator
      backBehavior='history' initialRouteName="MenuStack" screenOptions={{ headerShown: false }}
      tabBar={({ state }) => <BottomTabs routes={state.routes.map(({ name }) => name)} />}
    >
      {screens.map(screen =>
        <RootStack.Screen key={screen.name} {...screen} listeners={({ route, navigation }) => ({ state: () => setCurrentScreenHandler(route), blur: () => navigation.setParams({ screen: undefined, params: undefined }) })} />
      )}
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
});

export default RootNavigator;