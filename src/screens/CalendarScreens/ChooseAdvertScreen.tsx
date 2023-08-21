import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import Colors from '../../colors/Colors';
import AdvertSmall from '../../components/molecules/AdvertSmall/AdvertSmall';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';

type MainScreenProps = CompositeScreenProps<
    NativeStackScreenProps<CalendarStackParamList, 'ChooseAdvertScreen'>,
    NativeStackScreenProps<RootStackParamList, 'CalendarStack'>
>;

const ChooseAdvertScreen: FC<MainScreenProps> = ({ route, navigation }) => {
    const { userAdverts } = useTypedSelector(state => state.general);
    const { callback } = route.params;

    return (
        <ScreenHeaderProvider currentStack='CalendarStack'>
            <ScrollView style={{ backgroundColor: Colors.Basic100 }}>
                {userAdverts.map(item => (
                    <View style={{ marginTop: 12 }}>
                        <AdvertSmall {...item} onChoose={() => {
                            callback(item);
                            navigation.goBack();
                        }} />
                    </View>
                ))}
            </ScrollView>
        </ScreenHeaderProvider>
    );
};

export default ChooseAdvertScreen;