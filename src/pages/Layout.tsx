import { useRouter } from 'next/router';
import { ReactNode, FC, useEffect, useState, useMemo } from 'react';
import { View } from 'react-native';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { navigationLinking } from '../navigators/RootNavigator';
import BottomTabs, { BOTTOM_TABS_HEIGHT } from '../components/organismes/BottomTabs';
import Colors from '../colors/Colors';
import SwipeablePanel from '../components/organismes/SwipeablePanel';
import getScreenFromPathname from '../hooks/getScreenFromPathname';
import { ScrollView } from '../components/molecules/ScrollView';
import windowExists from '../hooks/windowExists';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { swipeablePanelProps, isTabbarVisible, currentScreen } = useTypedSelector(s => s.general);
  const { setCurrentScreen, setSwipeablePanelProps } = useActions();
  const router = useRouter();

  useEffect(() => {
    if (windowExists()) {
      const win: any = window;
      win.prevPage = win.currPage;
      win.currPage = router.asPath;
    }

    setCurrentScreen(getScreenFromPathname(router.pathname));
  }, [router]);

  return (
    <>
      <View style={{ paddingBottom: isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0, minHeight: '100vh', }}>
        {children}
      </View>
      <View style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: Colors.White
      }}>
        <BottomTabs routes={Object.keys(navigationLinking.config?.screens || {})} />
      </View>
      <SwipeablePanel />
    </>
  );
};
