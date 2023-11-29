import React, { ComponentProps, FC, useEffect } from 'react';
import ScrollLock from './ScrollLock';
import { Platform, Modal as RNModal, TouchableOpacity, View } from 'react-native';
import windowExists from '../../hooks/windowExists';

/** Custom Modal with good web support, including support onClose event (web history back button, dismiss, native hardware back button, etc.) */
const Modal: FC<ComponentProps<typeof RNModal> & { onClose: () => void }> = ({ onClose, children, ...props }) => {

    const closeRequest = () => {
        onClose();
        if (Platform.OS === 'web' && windowExists()) {
            window.history.back();
        }
    }

    useEffect(() => {
        if (Platform.OS === 'web' && windowExists()) {
            if (props.visible) {
                window.location.hash = 'modal';
                window.addEventListener('popstate', onClose);

                return () => {
                    window.removeEventListener('popstate', onClose);
                }
            } else {
                if (window.location.hash === '#modal') closeRequest();
            }
        }
    }, [props.visible]);

    return (
        <ScrollLock enabled={props.visible}>
            <RNModal
                animationType="fade"
                transparent
                {...props}
                onRequestClose={closeRequest}
                onDismiss={() => { }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}
                    onPress={closeRequest}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ cursor: 'default' }}
                        onPress={(e) => e.stopPropagation()}
                    >
                        {children}
                    </TouchableOpacity>
                </TouchableOpacity>
            </RNModal>
        </ScrollLock>
    );
};

export default Modal;