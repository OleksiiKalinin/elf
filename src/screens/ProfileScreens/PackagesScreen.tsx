import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import SvgIcon from '../../components/atoms/SvgIcon';
import Typography from '../../components/atoms/Typography';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import Colors from '../../colors/Colors';

const screenWidth = Dimensions.get('window').width;

const packageTypes = [
    { price: 50, type: 'Standard' },
    { price: 80, type: 'Comfort' },
    { price: 99, type: 'Pro' },
];

const packageTimes = [
    '1 tydzień - 80 zł',
    '2 tygodnie - 130zł',
    '1 miesiąc - 230zł',
    'Abonament miesięczny 200zł',
];

const packages = [
    {
        active: [
            'Tworzenie dowolnej liczby profilów firm',
            'Promowanie ogłoszeń na liście 10 firm z okolicy (do 15 km)',
            'Możliwość dodania dowolnej liczby ogłoszeń',
            'Promocja Twoich ogłoszeń na social media',
        ],
        nonactive: ['Wiedza', 'Promowanie', 'Porównywanie kandydatów'],
    },
];

type MainScreenProps = CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, 'PackagesScreen'>,
    NativeStackScreenProps<RootStackParamList, 'ProfileStack'>
>;

const PackagesScreen: FC<MainScreenProps> = () => {
    return (
        <ScreenHeaderProvider currentStack='ProfileStack'>
            <ScrollView style={{ backgroundColor: Colors.White }}>
                <ScrollView showsHorizontalScrollIndicator horizontal contentContainerStyle={{ paddingLeft: 20 }}>
                    {packageTypes.map((item) =>
                        <View style={{ maxWidth: 320, width: screenWidth - 100, marginVertical: 20, marginRight: 20, backgroundColor: Colors.Basic100 }}>
                            <Typography variant="h2" weight="Bold" style={{ marginLeft: 19 }}>
                                {item.price}zł <Typography variant="main"> tydzień</Typography>
                            </Typography>
                            <Typography style={{ marginLeft: 19, marginBottom: 6 }}>
                                {item.type}
                            </Typography>
                            <View>
                                {/* <SelectDropdown
                                    data={packageTimes}
                                    renderDropdownIcon={() => <SvgIcon icon='arrowBottom' />}
                                    dropdownOverlayColor='transparent'
                                    buttonStyle={{ width: '100%', backgroundColor: Colors.Basic300, paddingLeft: 24 }}
                                    buttonTextStyle={{ textAlign: 'left', color: Colors.Basic700, }}
                                    rowTextStyle={{ textAlign: 'left' }}
                                    dropdownStyle={{ backgroundColor: Colors.Basic300 }}
                                    rowStyle={{ borderWidth: 0 }}
                                    onSelect={(selectedItem, index) => { }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item;
                                    }}
                                    defaultValueByIndex={0}
                                /> */}
                            </View>
                            <View style={{ paddingVertical: 8, paddingHorizontal: 19 }}>
                                {packages[0].active.map(item => (
                                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                        <SvgIcon icon="check" style={{ alignSelf: 'center' }} />
                                        <Typography variant="small" style={{ paddingLeft: 11, alignSelf: 'center', flex: 1 }}>
                                            {item}
                                        </Typography>
                                    </View>
                                ))}
                                {packages[0].nonactive.map(item => (
                                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                        <SvgIcon icon="closeX" style={{ alignSelf: 'center' }} />
                                        <Typography variant="small" style={{ paddingLeft: 11, alignSelf: 'center', flex: 1 }} color={Colors.Basic600}>
                                            {item}
                                        </Typography>
                                    </View>
                                ))}
                            </View>
                            <Button variant="secondary">Twój pakiet</Button>
                        </View>
                    )}
                </ScrollView>
            </ScrollView>
        </ScreenHeaderProvider>
    );
};

export default PackagesScreen;