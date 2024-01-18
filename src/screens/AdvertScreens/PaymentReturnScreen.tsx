import React from 'react';
import { View } from 'react-native';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import Colors from '../../colors/Colors';

const PaymentReturnScreen = () => {
    return (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.Basic100 }}>
            <Typography variant='h4' style={{ marginBottom: 30 }}>Dziękujemy za wpłate!</Typography>
            <View style={{alignItems: 'flex-end'}}>
                <Button
                    fullwidth={false}
                    borderRadius={4}
                    size='medium'
                    onPress={() => {
                        var payloadStr = JSON.stringify({
                            isOk: true,
                            haha: false
                        });

                        if ((window as any).ReactNativeWebView?.postMessage) {
                            (window as any).ReactNativeWebView.postMessage(payloadStr);
                        } else if (window.parent?.postMessage) {
                            window.parent.postMessage(payloadStr, '*');
                        } else if (window.postMessage) {
                            window.postMessage(payloadStr, '*');
                        }
                    }}
                >
                    Dalej
                </Button>
            </View>
        </View>
    );
};

export default PaymentReturnScreen;