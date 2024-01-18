import { useRouter } from 'next/router';
import { ReactNode, FC, useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { navigationLinking } from '../navigators/RootNavigator';
import BottomTabs, { BOTTOM_TABS_HEIGHT } from '../components/organismes/BottomTabs';
import Colors from '../colors/Colors';
import SwipeablePanel from '../components/organismes/SwipeablePanel';
import getScreenFromPathname from '../hooks/getScreenFromPathname';
import LoadingScreen from '../components/atoms/LoadingScreen';
import windowExists from '../hooks/windowExists';

if (windowExists()) {
  const win: any = window;
  win.prevPage = window.sessionStorage.getItem('prevPage');
  win.currPage = window.sessionStorage.getItem('currPage');
}

export const Layout: FC<{ children: ReactNode, hideControls?: boolean }> = ({ children, hideControls: hideControls = false }) => {
  const { isTabbarVisible } = useTypedSelector(s => s.general);
  const { setCurrentScreen, setSwipeablePanelProps } = useActions();
  const router = useRouter();

  useEffect(() => {
    setCurrentScreen(getScreenFromPathname(router.pathname));

    if (windowExists()) {
      const win: any = window;
      win.prevPage = win.prevPageIsNull ? null : win.currPage;
      win.prevPageIsNull = false;
      win.currPage = router.asPath;

      if (win.prevPage) window.sessionStorage.setItem('prevPage', win.prevPage);
      if (win.currPage) window.sessionStorage.setItem('currPage', win.currPage);
    }
  }, [router]);

  return (
    <>
      <View style={{ paddingBottom: !hideControls && isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0, minHeight: '100vh', backgroundColor: '#e3e3e3' /*useColorScheme() === 'dark' ? '#3c3c3c' : '#e3e3e3'*/, alignItems: 'center' }}>
        <View style={{ height: '100%', maxWidth: 768, width: '100%', flex: 1 }}>
          {children}
        </View>
      </View>
      {!hideControls && <>
        <View style={styles.BottomTabs}>
          <BottomTabs routes={Object.keys(navigationLinking.config?.screens || {})} />
        </View>
        <SwipeablePanel />
      </>}
    </>
  );
};

const styles = StyleSheet.create({
  BottomTabs: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});