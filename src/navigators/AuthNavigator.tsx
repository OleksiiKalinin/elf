import React from 'react';
import { View } from 'react-native';
import MainScreen from '../screens/AuthScreens/MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegistrationScreen from '../screens/AuthScreens/RegistrationScreen';
import RememberPasswordScreen from '../screens/AuthScreens/RememberPasswordScreen';
import FillUserDataScreen from '../screens/AuthScreens/FillUserDataScreen';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Colors from '../colors/Colors';
import { PathConfigMap } from '@react-navigation/native';

export type AuthStackParamList = {
    default: {
        MainScreen: undefined,
        LoginScreen: undefined,
        RegistrationScreen: undefined,
        RememberPasswordScreen: undefined,
        FillUserDataScreen: undefined,
    },
    extended: {}
}

export const AuthStackLinking: PathConfigMap<AuthStackParamList['default']> = {
    MainScreen: '',
    LoginScreen: 'LoginScreen',
    RegistrationScreen: 'RegistrationScreen',
    RememberPasswordScreen: 'RememberPasswordScreen',
    FillUserDataScreen: 'FillUserDataScreen',
}
const AuthStack = createNativeStackNavigator<AuthStackParamList['default']>();

const AuthNavigator: React.FC = () => {

    return (
        <AuthStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="MainScreen" component={MainScreen} />
            <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
            <AuthStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <AuthStack.Screen name="RememberPasswordScreen" component={RememberPasswordScreen} />
            <AuthStack.Screen name="FillUserDataScreen" component={FillUserDataScreen} />
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;