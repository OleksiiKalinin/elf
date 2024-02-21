import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../atoms/Typography';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../atoms/Modal';
import { useActions } from '../../hooks/useActions';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import useRouter from '../../hooks/useRouter';
import useShadow from '../../hooks/useShadow';

const UserShouldBeLogedInModal = () => {
    const { showUserShouldBeLogedInModal } = useTypedSelector(s => s.general);
    const { setShowUserShouldBeLogedInModal } = useActions();
    const { push, replace } = useRouter();

    const closeHandler = (closeAction: boolean = true) => {
        if (closeAction && (showUserShouldBeLogedInModal.closeAction === 'redirectToRoot')) {
            replace({ stack: 'MenuStack' });
        }
        setShowUserShouldBeLogedInModal({ state: false, closeAction: 'close' });
    }

    return (
        <Modal
            visible={showUserShouldBeLogedInModal.state}
            onClose={closeHandler}
        >
            <View>
                <View style={{ padding: 15 }}>
                    <Typography weight='Bold' variant='h4' textAlign='center'>Ooopps!</Typography>
                    <Typography variant='h5' textAlign='center'>Nie jesteś zalogowany i nie masz dostępu do tej strony.</Typography>
                    <Typography color={Colors.Basic700} textAlign='center'>Zaloguj się lub stwórz konto!</Typography>
                </View>
                <View style={{ flexDirection: "row", padding: 7.5 }}>
                    <Button
                        fullwidth={false}
                        size='medium'
                        style={{ margin: 7.5, flex: 1 }}
                        variant='secondary'
                        borderRadius={4}
                        onPress={() => closeHandler()}
                    >
                        {showUserShouldBeLogedInModal.closeAction === 'close' ? 'Anuluj' : 'Zamknij'}
                    </Button>
                    <Button
                        fullwidth={false}
                        size='medium'
                        style={{ margin: 7.5, flex: 1 }}
                        borderRadius={4}
                        onPress={() => {
                            push({ stack: 'AuthStack' });
                            closeHandler(false);
                        }}
                    >
                        Zaloguj
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
});

export default UserShouldBeLogedInModal;