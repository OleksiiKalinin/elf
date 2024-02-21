import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Typography from '../atoms/Typography';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../atoms/Modal';
import { useActions } from '../../hooks/useActions';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';

const DraftFormModal = () => {
  const { showDraftFormModal, currentScreen } = useTypedSelector(s => s.general);
  const { setShowDraftFormModal } = useActions();

/*   useEffect(() => {
    if(Platform.OS !== 'web'){
      setShowDraftFormModal(null);
    };
  }, [currentScreen]); */

  useEffect(() => {
    if (Platform.OS === 'web') {
      if (showDraftFormModal) {
        window.addEventListener('popstate', popstateHandler);
      } else {
        window.removeEventListener('popstate', popstateHandler);
      };
    };
    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('popstate', popstateHandler);
      };
    };
  }, [showDraftFormModal]);

  const popstateHandler = () => {
    setShowDraftFormModal(null);
  };

  const confirmHandler = () => {
    if (showDraftFormModal?.saveDraftCallback) {
      showDraftFormModal?.saveDraftCallback();
    };
    setShowDraftFormModal(null);
  };

  const closeHandler = () => {
    setShowDraftFormModal(null);
  };

  return (
    <Modal
      visible={!!showDraftFormModal}
      onClose={closeHandler}
      withoutUrl
    >
      <View>
        {showDraftFormModal?.type === 'saveDraft' &&
          !showDraftFormModal.info ?
          <View style={styles.TextContainer}>
            <Typography weight='Bold' variant='h4' textAlign='center'>
              Uwaga!
            </Typography>
            <Typography variant='h5' textAlign='center'>
              Nie uzupełniłeś wszystkich wymaganych pól
            </Typography>
            <Typography variant='h5' color={Colors.Basic700} textAlign='center'>
              Czy chcesz zapisać wersję roboczą formularza?
            </Typography>
          </View>

          :

          <>
            {showDraftFormModal?.info}
          </>
        }
        {showDraftFormModal?.type === 'info' &&
          !showDraftFormModal.info ?
          <View style={styles.TextContainer}>
            <Typography variant='h5' textAlign='center'>
              {'Wczytano wersję roboczą formularza.'}
            </Typography>
            {showDraftFormModal?.textInfo &&
              <Typography variant='h5' textAlign='center'>
                {showDraftFormModal?.textInfo}
              </Typography>
            }
          </View>

          :

          <>
            {showDraftFormModal?.info}
          </>

        }
        <View style={[styles.ButtonsContainer, { justifyContent: showDraftFormModal?.type === 'saveDraft' ? 'space-around' : 'center' }]}>
          {showDraftFormModal?.type === 'saveDraft' &&
            <>
              <Button
                fullwidth={false}
                size='medium'
                style={styles.Button}
                borderRadius={4}
                onPress={() => confirmHandler()}
              >
                {showDraftFormModal?.confirmButton ?? 'Zapisz'}
              </Button>
              <Button
                fullwidth={false}
                size='medium'
                style={styles.Button}
                variant='secondary'
                borderRadius={4}
                onPress={() => closeHandler()}
              >
                {showDraftFormModal?.cancelButton ?? 'Anuluj'}
              </Button>
            </>
          }
          {showDraftFormModal?.type === 'info' &&
            <Button
              fullwidth={false}
              size='medium'
              style={{ width: 160 }}
              borderRadius={4}
              onPress={() => closeHandler()}
            >
              Ok
            </Button>
          }
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

export default DraftFormModal;