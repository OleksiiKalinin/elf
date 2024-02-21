import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../atoms/Typography';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../atoms/Modal';
import { useActions } from '../../hooks/useActions';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import useRouter from '../../hooks/useRouter';

const UserShouldHaveCompanyModal = () => {
    const { showUserShouldHaveCompanyModal } = useTypedSelector(s => s.general);
    const { setShowUserShouldHaveCompanyModal } = useActions();
    const { push, replace } = useRouter();

    const closeHandler = (closeAction: boolean = true) => {
        if (closeAction && (showUserShouldHaveCompanyModal.closeAction === 'redirectToRoot')) {
            replace({ stack: 'MenuStack' });
        }
        setShowUserShouldHaveCompanyModal({ state: false, closeAction: 'close' });
    }

    return (
        <Modal
            visible={showUserShouldHaveCompanyModal.state}
            onClose={closeHandler}
        >
            <View>
                <View style={{ padding: 15 }}>
                    <Typography weight='Bold' variant='h4' textAlign='center'>Ooopps!</Typography>
                    <Typography variant='h5' textAlign='center'>
                        {'Jeszcze nie stworzyłeś profil firmy więc nie masz dostępu do tej '}
                        {showUserShouldHaveCompanyModal.closeAction === 'close' ? 'funkcji' : 'strony'}.
                    </Typography>
                    <Typography color={Colors.Basic700} textAlign='center'>Stwórz profil firmy!</Typography>
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
                        {showUserShouldHaveCompanyModal.closeAction === 'close' ? 'Anuluj' : 'Zamknij'}
                    </Button>
                    <Button
                        fullwidth={false}
                        size='medium'
                        style={{ margin: 7.5, flex: 1 }}
                        borderRadius={4}
                        onPress={() => {
                            push({ stack: 'ProfileStack', screen: 'NoCompanyScreen' });
                            closeHandler(false);
                        }}
                    >
                        Stwórz firmę
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
});

export default UserShouldHaveCompanyModal;