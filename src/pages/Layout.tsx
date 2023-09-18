import { useRouter } from 'next/router';
import { ReactNode, FC, useEffect, useState, useMemo } from 'react';
import { View } from 'react-native';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { navigationLinking } from '../navigators/RootNavigator';
import BottomTabs from '../components/organismes/BottomTabs';
import Colors from '../colors/Colors';
import SwipeablePanel from '../components/organismes/SwipeablePanel';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [profileFocused, setProfileFocused] = useState(false);
  const { swipeablePanelProps, isTabbarVisible } = useTypedSelector(s => s.general);
  const { setCurrentScreen, setSwipeablePanelProps } = useActions();
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
      <View style={{ paddingBottom: isTabbarVisible ? 45 : 0 }}>
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
        <BottomTabs {...{ profileFocused, setProfileFocused, routes: Object.keys(navigationLinking.config?.screens || {}) }} />
      </View>
      {useMemo(() => (
        <SwipeablePanel closeButton isActive={!!swipeablePanelProps} onClose={() => setSwipeablePanelProps(null)} {...swipeablePanelProps} />
      ), [swipeablePanelProps])}
    </View>
  );
};