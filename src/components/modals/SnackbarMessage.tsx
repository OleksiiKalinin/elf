import React from 'react';
import { Platform } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Colors from '../../colors/Colors';

const SnackbarMessage = () => {
    const { snackbarMessage } = useTypedSelector(state => state.general);
    const { setSnackbarMessage } = useActions();

    return (
        <Snackbar
            visible={!!snackbarMessage}
            onDismiss={() => setSnackbarMessage(null)}
            duration={4000}
            wrapperStyle={{
                alignItems: 'center',
                position: Platform.OS === 'web' ? 'fixed' : 'absolute',
            }}
            style={{
                backgroundColor: snackbarMessage?.type === 'error' ? Colors.Danger : snackbarMessage?.type === 'success' ? Colors.SuccessDark : 'none',
                maxWidth: 350,
            }}
        >
            {snackbarMessage?.text}
        </Snackbar>
    );
};

export default SnackbarMessage;