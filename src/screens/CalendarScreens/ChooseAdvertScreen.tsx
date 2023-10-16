import { CompositeScreenProps } from '@react-navigation/native';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import AdvertSmall from '../../components/organismes/AdvertSmall';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import { useRouter } from 'solito/router';
import getPathnameFromScreen from '../../hooks/getPathnameFromScreen';

const ChooseAdvertScreen: FC<CalendarStackParamList['extended']['ChooseAdvertScreen']> = ({callback}) => {
    const { userAdverts, currentScreen } = useTypedSelector(state => state.general);
    const {replace} = useRouter();
    // const { callback } = route.params;

    return (
        <ScreenHeaderProvider title='Wybierz ogłoszenie'>
            <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
                {userAdverts.map(item => (
                    <View style={{ marginTop: 12 }}>
                        <AdvertSmall {...item} onChoose={() => {
                            callback(item);
                            replace(getPathnameFromScreen(currentScreen));
                            // navigation.goBack();
                        }} />
                    </View>
                ))}
            </ScrollView>
        </ScreenHeaderProvider>
    );
};

export default ChooseAdvertScreen;