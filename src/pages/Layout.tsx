import { useRouter } from 'next/router';
import { ReactNode, FC, useEffect, useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { navigationLinking } from '../navigators/RootNavigator';
import BottomTabs, { BOTTOM_TABS_HEIGHT } from '../components/organismes/BottomTabs';
import Colors from '../colors/Colors';
import SwipeablePanel from '../components/organismes/SwipeablePanel';
import getScreenFromPathname from '../hooks/getScreenFromPathname';
import LoadingScreen from '../components/atoms/LoadingScreen';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { isTabbarVisible } = useTypedSelector(s => s.general);
  const { setCurrentScreen, setSwipeablePanelProps } = useActions();
  const router = useRouter();

  useEffect(() => {
    setCurrentScreen(getScreenFromPathname(router.pathname));
  }, [router]);

  return (
    <>
      <View style={{ paddingBottom: isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0, minHeight: '100vh', backgroundColor: Colors.Basic200, alignItems: 'center' }}>
        <View style={{ height: '100%', maxWidth: 768, width: '100%', flex: 1 }}>
          {children}
        </View>
      </View>
      <View style={styles.BottomTabs}>
        <BottomTabs routes={Object.keys(navigationLinking.config?.screens || {})} />
      </View>
      <SwipeablePanel />
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
    backgroundColor: Colors.White,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});