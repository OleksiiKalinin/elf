import { CompositeScreenProps } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import AdvertSmall from '../../components/organismes/AdvertSmall';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import useRouter from '../../hooks/useRouter';
import { ScrollView } from '../../components/molecules/ScrollView';

const ChooseAdvertScreen: FC<CalendarStackParamList['extended']['ChooseAdvertScreen']> = ({ callback }) => {
    const { userAdverts } = useTypedSelector(state => state.general);
    const { backToRemoveParams } = useRouter();

    return (
        <ScreenHeaderProvider title='Wybierz ogłoszenie'>
            <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
                {userAdverts.map(item => (
                    <View style={{ marginTop: 12 }}>
                        <AdvertSmall {...item} onChoose={() => {
                            callback(item);
                            backToRemoveParams();
                        }} />
                    </View>
                ))}
            </ScrollView>
        </ScreenHeaderProvider>
    );
};

export default ChooseAdvertScreen;