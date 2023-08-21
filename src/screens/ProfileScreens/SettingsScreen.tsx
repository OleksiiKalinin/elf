import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch } from 'react-redux';
import Colors from '../../colors/Colors';
import ButtonArrowSelector from '../../components/atoms/ButtonArrowSelector/ButtonArrowSelector';
import Typography from '../../components/atoms/Typography/Typography';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import authServices from '../../services/authServices';

const settings: {
    title: string,
    route:
    'PaymentScreen' |
    'HelpCenterScreen' |
    'NotificationScreen' |
    'PrivacyScreen' |
    'CookieScreen'
}[] = [
        {
            title: 'Płatności',
            route: 'PaymentScreen',
        },
        {
            title: 'Centrum pomocy',
            route: 'HelpCenterScreen',
        },
        {
            title: 'Powiadomienia',
            route: 'NotificationScreen',
        },
        {
            title: 'Polityka prywatności',
            route: 'PrivacyScreen',
        },
        {
            title: 'Ustawienia plików cookie',
            route: 'CookieScreen',
        },
    ];

type MainScreenProps = CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, 'SettingsScreen'>,
    NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const SettingsScreen: FC<MainScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const { setSwipeablePanelProps } = useActions();
    const { token } = useTypedSelector(state => state.general);

    const logoutHandler = async () => {
        await dispatch(authServices.logout(token));
        setSwipeablePanelProps({
            title: 'Pomyślnie się wylogowałeś',
            closeButton: false,
            buttons: [
                {
                    children: 'OK',
                    contentColor: Colors.Basic600,
                    onPress: () => navigation.navigate('MenuStack', {screen: 'MainScreen'})
                }
            ]
        })
    }

    return (
        <ScreenHeaderProvider currentStack='ProfileStack'>
            <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
                <View style={{ marginVertical: 20 }}>
                    {settings.map(({ route, title }, i) => (
                        <ButtonArrowSelector
                            marginBottom={false}
                            marginTop={false}
                            borderTop={i === 0}
                            text={title}
                            onPress={() => navigation.navigate(route)}
                        />
                    ))}
                </View>
                <View style={{ flex: 1, marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={logoutHandler}>
                        <Typography color={Colors.Danger} variant="h4" weight='SemiBold' style={{ textDecorationLine: 'underline', textAlign: 'center', }}>
                            Wyloguj się
                        </Typography>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ScreenHeaderProvider>
    );
};

export default SettingsScreen;