import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MessengerScreens/MainScreen';

export type MessengerStackParamList = {
    MainScreen: undefined,
}

const MessengerStack = createNativeStackNavigator<MessengerStackParamList>();

const MessengerNavigator: React.FC = () => {
    return (
        <MessengerStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
            <MessengerStack.Screen name="MainScreen" component={MainScreen}/>
        </MessengerStack.Navigator>
    );
};

export default MessengerNavigator;