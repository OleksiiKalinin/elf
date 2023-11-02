import { CompositeScreenProps } from '@react-navigation/native';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import AdvertSmall from '../../components/organismes/AdvertSmall';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import getPathnameFromScreen from '../../hooks/getPathnameFromScreen';
import useRouter from '../../hooks/useRouter';

const ChooseAdvertScreen: FC<CalendarStackParamList['extended']['ChooseAdvertScreen']> = ({callback}) => {
    const { userAdverts, currentScreen } = useTypedSelector(state => state.general);
    const {backToRemoveParams} = useRouter();
    // const { callback } = route.params;

    return (
        <ScreenHeaderProvider title='Wybierz ogłoszenie'>
            <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
                {userAdverts.map(item => (
                    <View style={{ marginTop: 12 }}>
                        <AdvertSmall {...item} onChoose={() => {
                            callback(item);
                            backToRemoveParams();
                            // replace(getPathnameFromScreen(currentScreen));
                            // navigation.goBack();
                        }} />
                    </View>
                ))}
            </ScrollView>
        </ScreenHeaderProvider>
    );
};

export default ChooseAdvertScreen;