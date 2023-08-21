// import { Spinner } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import MainScreen from '../screens/AuthScreens/MainScreen';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import RegistrationScreen from '../screens/AuthScreens/RegistrationScreen';
import RememberPasswordScreen from '../screens/AuthScreens/RememberPasswordScreen';
import FillUserDataScreen from '../screens/AuthScreens/FillUserDataScreen';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Colors from '../colors/Colors';

export type AuthStackParamList = {
    MainScreen: undefined,
    LoginScreen: undefined,
    RegistrationScreen: undefined,
    RememberPasswordScreen: undefined,
    FillUserDataScreen: undefined,
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
    const { token } = useTypedSelector(state => state.general);

    return (
        <AuthStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
            {/* {!token && <> */}
                <AuthStack.Screen name="MainScreen" component={MainScreen} />
                {/* <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
                <AuthStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                <AuthStack.Screen name="RememberPasswordScreen" component={RememberPasswordScreen} />
            </>}
            <AuthStack.Screen name="FillUserDataScreen" component={FillUserDataScreen} /> */}
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;