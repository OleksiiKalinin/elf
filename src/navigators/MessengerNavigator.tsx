import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MessengerScreens/MainScreen';
import { PathConfigMap } from '@react-navigation/native';

export type MessengerStackParamList = {
    default: {
        MainScreen: undefined,
    },
    extended: {}
}

export const MessengerStackLinking: PathConfigMap<MessengerStackParamList['default']> = {
    MainScreen: '',
}

const MessengerStack = createNativeStackNavigator<MessengerStackParamList['default']>();

const MessengerNavigator: React.FC = () => {
    return (
        <MessengerStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
            <MessengerStack.Screen name="MainScreen" component={MainScreen} />
        </MessengerStack.Navigator>
    );
};

export default MessengerNavigator;