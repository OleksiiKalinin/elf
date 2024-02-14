import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import Typography from '../../atoms/Typography';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Modal from '../../atoms/Modal';
import { useActions } from '../../../hooks/useActions';
import Colors from '../../../colors/Colors';
import Button from '../../molecules/Button';
import useRouter from '../../../hooks/useRouter';

const ScreenExitLock = () => {
  const { showExitWarningModal, blockedScreen, currentScreen, swipeablePanelProps } = useTypedSelector(s => s.general);
  const { setShowExitWarningModal, setBlockedScreen } = useActions();
  const { back, backToRemoveParams } = useRouter();

  useEffect(() => {
    if (!swipeablePanelProps) {
      setBlockedScreen({ ...blockedScreen, blockedBack: blockedScreen.blockedExit });
    } else {
      setBlockedScreen({ ...blockedScreen, blockedBack: false });
    };
  }, [swipeablePanelProps]);

  useEffect(() => {
    setShowExitWarningModal(false);
    setBlockedScreen({ blockedExit: false, blockedBack: false });
  }, [currentScreen]);

  useEffect(() => {
    if (blockedScreen.blockedBack) {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        setShowExitWarningModal(true);
        return true;
      });

      return () => {
        handler.remove();
      };
    };
  }, [blockedScreen, showExitWarningModal]);

  const closeHandler = () => {
    setShowExitWarningModal(false);
  };

  const exitHandler = () => {
    goBack();

    if (!swipeablePanelProps) {
      setBlockedScreen({ blockedExit: false, blockedBack: false });
    } else {
      setBlockedScreen({ ...blockedScreen, blockedBack: false });
    };

    closeHandler();
  };

  const goBack = blockedScreen.backTo ? blockedScreen.backTo : !!swipeablePanelProps ? backToRemoveParams : back;

  return (
    <Modal
      visible={showExitWarningModal && !!blockedScreen}
      onClose={closeHandler}
      withoutUrl
    >
      <View style={styles.Modal}>
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
  Modal: {
    backgroundColor: Colors.White,
    borderRadius: 4,
  },
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