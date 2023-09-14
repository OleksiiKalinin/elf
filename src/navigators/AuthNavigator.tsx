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
    MainScreen: undefined,
    LoginScreen: undefined,
    RegistrationScreen: undefined,
    RememberPasswordScreen: undefined,
    FillUserDataScreen: undefined,
}

export const AuthStackLinking: PathConfigMap<AuthStackParamList> = {
    MainScreen: '',
    FillUserDataScreen: 'FillUserDataScreen',
    LoginScreen: 'LoginScreen',
    RegistrationScreen: 'RegistrationScreen',
    RememberPasswordScreen: 'RememberPasswordScreen',
}
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
    const { token } = useTypedSelector(state => state.general);

    return (
        <AuthStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
            {!token && <>
                <AuthStack.Screen name="MainScreen" component={MainScreen} />
                <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
                <AuthStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                <AuthStack.Screen name="RememberPasswordScreen" component={RememberPasswordScreen} />
            </>}
            <AuthStack.Screen name="FillUserDataScreen" component={FillUserDataScreen} />
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;