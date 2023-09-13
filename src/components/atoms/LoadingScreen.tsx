import React from 'react';
import { View } from 'react-native';
import Colors from '../../colors/Colors';
import { Spinner } from 'tamagui';

const LoadingScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: Colors.White}}>
            <Spinner color={Colors.Basic900} size='large' />
        </View>
    );
};

export default LoadingScreen;