import { ReactNode, FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import BottomTabs from './organismes/BottomTabs';
import Typography from './atoms/Typography';
import Colors from '../colors/Colors';
import { navigationLinking } from '../navigators/RootNavigator';
import { useRouter } from 'next/router';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [profileFocused, setProfileFocused] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    (() => {
      const [, routeStack, routeScreen] = router.pathname.split('/');
      let currentScreen = '';

      if (routeStack) {
        const linking: any = navigationLinking.config?.screens;
        if (linking) {
          for (const stackName in linking) {
            const currStack = linking[stackName];
            if (currStack?.path === routeStack) {
              if (routeScreen) {
                for (const screenName in currStack.screens) {
                  const currScreen = currStack.screens[screenName];
                  if (currScreen === routeScreen) {
                    currentScreen = stackName + '-' + screenName;
                    break;
                  }
                }
              }
              if (!currentScreen) {
                currentScreen = stackName + '-' + 'MainScreen';
              }
            }
          }
        }
      }
      setCurrentScreen(currentScreen || 'MenuStack-MainScreen');
    })();
  }, [router])

  return (
    <View>
      <View style={{ paddingBottom: 45 }}>
        {children}
      </View>
      <View style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        // height: 50,
        backgroundColor: Colors.White
      }}>
        <BottomTabs {...{ profileFocused, setProfileFocused, currentScreen, routes: Object.keys(navigationLinking.config?.screens || {}) }} />
      </View>
    </View>
  );
};
