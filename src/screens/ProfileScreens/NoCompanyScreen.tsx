import { CompositeScreenProps, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import Colors from '../../colors/Colors';
import Typography from '../../components/atoms/Typography/Typography';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import TabbarMenu, {
    TabbarRoute,
} from '../../components/organisms/TabbarMenu/TabbarMenu';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { Modal, ScrollView } from 'native-base';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import ButtonArrowSelector from '../../components/atoms/ButtonArrowSelector/ButtonArrowSelector';
import SvgIcon from '../../components/molecules/SvgIcon/SvgIcon';
import HorizontalSelector from '../../components/molecules/HorizontalSelector/HorizontalSelector';
import ButtonRipple from '../../components/molecules/ButtonRipple/ButtonRipple';
import ProgressBar from '../../components/atoms/ProgressBar/ProgressBar';

type NoCompanyScreenProps = CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, 'NoCompanyScreen'>,
    NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const pointCards = [
    { points: 23, type: 'Pakiet Medium', time: 'na tydzień' },
    { points: 250, type: 'Promowanie', time: 'na tydzień' },
    { points: 500, type: 'Pakiet Pro', time: '100%' },
];

const screenWidth = Dimensions.get('window').width;

const NoCompanyScreen: React.FC<NoCompanyScreenProps> = ({ navigation }) => {
    const { profileHelpScreenDisplayed, token } = useTypedSelector(state => state.general);
    const [showHelp, setShowHelp] = useState<boolean>(!profileHelpScreenDisplayed);
    const helpDots = [0, 1, 2];
    const [helpItemNumber, setHelpItemNumber] = useState<number>(0);

    useEffect(() => {
        if (showHelp && !profileHelpScreenDisplayed) AsyncStorage.setItem('profileHelpScreenDisplayed', 'true');
    }, [showHelp]);

    return (
        <ScreenHeaderProvider currentStack="ProfileStack">
            <ScrollView style={{ flex: 1, backgroundColor: Colors.Basic100 }} contentContainerStyle={{ paddingVertical: 30 }}>
                {/* <View style={{ marginHorizontal: 19, backgroundColor: Colors.White, borderRadius: 4, padding: 16, marginBottom: 20, }}>
                    <View style={{alignItems: 'center', marginBottom: 12}}>
                        <View style={{
                            width: 31,
                            height: 31,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 31,
                            backgroundColor: Colors.Sea300
                        }}>
                            <SvgIcon icon='bag' />
                        </View>
                    </View>
                    <Typography style={{marginBottom: 5}} textAlign='center' color={Colors.Blue500} size={20} weight='Bold'>100 punktów</Typography>
                    <Typography style={{marginBottom: 5}} textAlign='center' variant='h5' weight='Bold'>Odbierz i uzupełnij profil swojej firmy</Typography>
                    <Typography textAlign='center'>74% Respondentów deklaruje, że uzupełnione profile bardziej przyciągają ich uwagę.</Typography>
                </View> */}
                <View style={{ paddingHorizontal: 19, marginBottom: 34 }}>
                    <ButtonRipple
                        disabled={!token}
                        icon='createCircleSmall'
                        borderRadius={4}
                        variant='secondary'
                        contentWeight='Medium'
                        contentVariant='h5'
                        style={{ paddingVertical: 5 }}
                        onPress={() => navigation.navigate('AddCompanyScreen', { editMode: false })}
                    >
                        Dodaj profil firmy
                    </ButtonRipple>
                    {!token && <Typography color={Colors.Danger}>Zaloguj się!</Typography>}
                </View>
                {/* <ButtonArrowSelector
                    text={<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../assets/images/Barber.png')} resizeMode='contain' style={{ width: 66, height: 44 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Typography weight='SemiBold' variant='h5'>Przykładowy profil firmy</Typography>
                            <Typography weight='Regular' color={Colors.Basic600}>Marszałkowska 126, Warszawa</Typography>
                        </View>
                    </View>}
                    onPress={() => navigation.navigate('CompanyScreen', { index: 3 })}
                    marginBottom={false}
                    marginTop={false}
                /> */}
            </ScrollView>
        </ScreenHeaderProvider>
    );
};

const styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    helpDot: {
        width: 8,
        height: 8,
        backgroundColor: Colors.Basic900,
        borderRadius: 10,
        marginRight: 10
    },
    pointsCard: {
        backgroundColor: Colors.Sea300,
        width: 180,
        height: 180,
        marginLeft: 8,
        paddingTop: 10,
        justifyContent: 'space-between',
    },
});

export default NoCompanyScreen;
