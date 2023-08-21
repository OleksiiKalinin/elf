import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Linking, View } from 'react-native';
// import Typography from '../../components/atoms/Typography/Typography';
// import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
// import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { MessengerStackParamList } from '../../navigators/MessengerNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import Typography from '../../components/atoms/Typography';

type MainScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MessengerStackParamList, 'MainScreen'>,
    NativeStackScreenProps<RootStackParamList, 'MessengerStack'>
>;

const MainScreen: React.FC<MainScreenProps> = () => {
    const { token, refresh_token } = useTypedSelector(s => s.general);
    return (
        <ScreenHeaderProvider currentStack='MessengerStack' mode='mainTitle'>
            {/* <ButtonRipple containerStyles={{ marginVertical: 19 }} onPress={() => Linking.openURL(`http://m.me/100064179065329?ref=${token}-${refresh_token}`)}>Messenger</ButtonRipple> */}
            <Button onPress={() => Linking.openURL(`http://m.me/100064179065329`)}>Messenger</Button>
            <Button onPress={() => Linking.openURL(`whatsapp://send?text=join knew-task&phone=+14155238886`)}>Whatsapp</Button>
            <Typography style={{marginHorizontal: 19}} selectable>Aby rozpocząć rozmowę wyślij wiadomość "join knew-task"</Typography>
        </ScreenHeaderProvider>
    );
};

export default MainScreen;