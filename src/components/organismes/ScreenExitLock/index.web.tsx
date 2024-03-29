import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../../atoms/Typography';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Modal from '../../atoms/Modal';
import { useActions } from '../../../hooks/useActions';
import Colors from '../../../colors/Colors';
import Button from '../../molecules/Button';
import useRouter, { SubViewType } from '../../../hooks/useRouter';
import { createParam } from 'solito';
import { CurrentScreenType } from '../../../hooks/withUrl';
import { isEqual } from 'lodash';
import { BlockedScreenType } from '../../../store/reducers/types';

const { useParam } = createParam<{ subView?: SubViewType }>();

const ScreenExitLock = () => {
  const { showExitWarningModal, blockedScreen, currentScreen, swipeablePanelProps } = useTypedSelector(s => s.general);
  const { setShowExitWarningModal, setBlockedScreen } = useActions();
  const router = useRouter();
  const { back, backToRemoveParams } = useRouter();
  const [subView] = useParam('subView');
  const [prevScreenState, setPrevScreenState] = useState<CurrentScreenType>();
  const [currentScreenState, setCurrentScreenState] = useState<CurrentScreenType>();
  const [prevBlockedScreen, setPrevBlockedScreen] = useState<BlockedScreenType | null>(null);
  const [popstate, setPopstate] = useState(false);

  useEffect(() => {
    if (!swipeablePanelProps) {
      setBlockedScreen({ ...blockedScreen, blockedBack: blockedScreen.blockedExit });
    } else {
      setBlockedScreen({ ...blockedScreen, blockedBack: false });
    };

    if (swipeablePanelProps?.mode === 'screen') {
      if (!prevBlockedScreen && (blockedScreen.blockedExit || blockedScreen.blockedBack)) {
        setPrevBlockedScreen(blockedScreen);
      };
    } else if (!swipeablePanelProps && prevBlockedScreen) {
      setBlockedScreen(prevBlockedScreen);
    };

    setPopstate(false);
  }, [swipeablePanelProps]);

  useEffect(() => {
    if (!isEqual(currentScreen, currentScreenState)) {
      setPrevScreenState(currentScreenState);
      setCurrentScreenState(currentScreen);
    };
    setPrevBlockedScreen(null);
    setShowExitWarningModal(false);
    setBlockedScreen({ blockedExit: false, blockedBack: false });
    setPopstate(false);
  }, [currentScreen]);

  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => e.preventDefault();

    if ((blockedScreen.blockedExit || blockedScreen.blockedBack) && subView !== 'options') {
      window.onpopstate = popstateHandler;
      window.onbeforeunload = beforeUnloadHandler;
    } else {
      window.onpopstate = null;
      window.onbeforeunload = null;
    };

    return () => {
      window.onpopstate = null;
      window.onbeforeunload = null;
    }
  }, [blockedScreen, showExitWarningModal, subView]);

  const popstateHandler = () => {
    if (!popstate) {
      if (!swipeablePanelProps) {
        setPopstate(true);
        setShowExitWarningModal(true);

        // @ts-ignore
        router.replace({
          stack: currentScreen.stack,
          screen: currentScreen.screen,
          params: undefined,
        });
      } else if (!!swipeablePanelProps && swipeablePanelProps.mode === 'screen' && blockedScreen.blockedBack) {
        setPopstate(true);
        setShowExitWarningModal(true);

        // @ts-ignore
        router.replace({
          stack: currentScreen.stack,
          screen: currentScreen.screen,
          params: {
            subView: subView
          },
        });
      };
    } else {
      setPopstate(false);
      popstateGoBack();
      setShowExitWarningModal(false);
    }
  };

  const screenPopstateGoBack = () => {
    if (prevScreenState) {
      console.log('screenPopstateGoBack');
      // @ts-ignore
      router.push({
        stack: prevScreenState.stack,
        screen: prevScreenState.screen,
        params: undefined,
      });
    };
  };

  const subViewPopstateGoBack = () => {
    // @ts-ignore
    router.replace({
      stack: currentScreen.stack,
      screen: currentScreen.screen,
      params: undefined,
    });
  };

  const closeHandler = () => {
    setShowExitWarningModal(false);
    setPopstate(false);
  };

  const exitHandler = () => {
    if (popstate && prevScreenState) {
      popstateGoBack();
    } else {
      goBack();
    };

    setBlockedScreen({ blockedExit: false, blockedBack: false })
    closeHandler();
    setPopstate(false);
  };

  const goBack = blockedScreen.backTo ? blockedScreen.backTo : !!swipeablePanelProps ? backToRemoveParams : back;
  const popstateGoBack = !!swipeablePanelProps && swipeablePanelProps.mode === 'screen' ? subViewPopstateGoBack : screenPopstateGoBack;

  return (
    <Modal
      visible={showExitWarningModal && !!blockedScreen}
      onClose={closeHandler}
      withoutUrl
    >
      <View>
        <View style={styles.TextContainer}>
          <Typography weight='Bold' variant='h4' textAlign='center'>
            Uwaga!
          </Typography>
          <Typography variant='h5' textAlign='center'>
            Jeśli opuścisz ten ekran, wszelkie wprowadzone przez Ciebie dane nie zostaną zapisane.
          </Typography>
          <Typography variant='h5' color={Colors.Basic700} textAlign='center'>
            Czy na pewno chcesz opuścić ekran?
          </Typography>
        </View>
        <View style={styles.ButtonsContainer}>
          <Button
            fullwidth={false}
            size='medium'
            style={styles.Button}
            borderRadius={4}
            onPress={() => exitHandler()}
          >
            Wyjdź
          </Button>
          <Button
            fullwidth={false}
            size='medium'
            style={styles.Button}
            variant='secondary'
            borderRadius={4}
            onPress={() => closeHandler()}
          >
            Anuluj
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  TextContainer: {
    padding: 15,
    gap: 10
  },
  ButtonsContainer: {
    flexDirection: "row",
    padding: 7.5
  },
  Button: {
    margin: 7.5,
    flex: 1,
  },
});

export default ScreenExitLock;