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
import { useLink } from 'solito/link';

type SecondScreenProps = CompositeScreenProps<
    NativeStackScreenProps<MessengerStackParamList, 'SecondScreen'>,
    NativeStackScreenProps<RootStackParamList, 'MessengerStack'>
>;

const SecondScreen: React.FC = () => {
    // const SecondScreen: React.FC<SecondScreenProps> = () => {
    // const { token, refresh_token } = useTypedSelector(s => s.general);
    return (<>
        <Typography>SecondScreen</Typography>
        <Button
            {...useLink({
                href: '/',
            })}
        >home</Button>
    </>);
};

export default SecondScreen;