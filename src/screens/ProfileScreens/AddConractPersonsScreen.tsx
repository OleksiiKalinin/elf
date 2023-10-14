import React, { Fragment, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Slider } from 'react-native';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { ContactPersonType } from '../../store/reducers/types';
import minutesToHours from '../../hooks/minutesToHours';
import hoursToMinutes from '../../hooks/hoursToMinutes';
import Typography from '../../components/atoms/Typography';
import TextField from '../../components/molecules/TextField';
import ScreenHeaderProvider from '../../components/organismes/ScreenHeaderProvider';
import Button from '../../components/molecules/Button';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const AddConractPersonsScreen: React.FC<ProfileStackParamList['AddConractPersonsScreen']> = (props) => {
    const { companyData, changeCompanyDataHandler, contactPersons: initContactPersons, setContactPersons: changeContactPersonsHandler } = props;
    const [contactHours, setContactHours] = useState<string>(companyData.contact_hours || '08:00-18:00');
    const [contactPersons, setContactPersons] = useState<ContactPersonType[]>(initContactPersons);
    const { windowSizes } = useTypedSelector(s => s.general);

    // console.log(initContactPersons);

    const editContactPersons = (key: keyof ContactPersonType, value: string | null, index: number) => {
        setContactPersons(contactPersons => {
            const currPerson: ContactPersonType | undefined = contactPersons[index];
            if (currPerson) {
                return [
                    ...contactPersons.slice(0, index),
                    { ...currPerson, [key]: value ? value.replace(/\s/g, '') : null },
                    ...contactPersons.slice(index + 1)
                ];
            } else {
                return contactPersons;
            }
        })
    }

    const deleteContactPerson = (index: number) => {
        setContactPersons(contactPersons => {
            if (contactPersons[index]) {
                return [
                    ...contactPersons.slice(0, index),
                    ...contactPersons.slice(index + 1)
                ];
            } else {
                return contactPersons;
            }
        })
    }

    return (
        <ScreenHeaderProvider>
            <ScrollView style={{ backgroundColor: Colors.Basic100, flex: 1 }} contentContainerStyle={{ paddingTop: 15 }}>
                {contactPersons.map(({ account_facebook, account_instagram, email, mobile_number, id }, index) => (<View style={{ paddingHorizontal: 19 }} key={id}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='h5' weight='Bold' style={{ marginVertical: 10 }}>Osoba {index + 1}</Typography>
                        {(index !== 0 || contactPersons.length > 1) && <TouchableOpacity onPress={() => deleteContactPerson(index)}>
                            <Typography color={Colors.Danger}>usuń</Typography>
                        </TouchableOpacity>}
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextField
                            label='Telefon'
                            textContentType='telephoneNumber'
                            keyboardType='phone-pad'
                            mask={['+', '4', '8', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
                            activeLabel
                            value={mobile_number || ''}
                            onChangeText={(text) => editContactPersons('mobile_number', text, index)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextField
                            label="Email"
                            value={email || ''}
                            onChangeText={text => editContactPersons('email', text, index)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextField
                            label="Facebook"
                            value={account_facebook || ''}
                            onChangeText={text => editContactPersons('account_facebook', text, index)}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <TextField
                            label="Instagram"
                            value={account_instagram || ''}
                            onChangeText={text => editContactPersons('account_instagram', text, index)}
                        />
                    </View>
                    {index + 1 === contactPersons.length && (account_facebook || account_instagram || email || mobile_number) &&
                        <TouchableOpacity onPress={() => setContactPersons(prev => [...prev, {
                            account_facebook: null,
                            account_instagram: null,
                            account_twitter: null,
                            account_youtube: null,
                            email: null,
                            link: null,
                            mobile_number: null,
                            id: Date.now()
                        }])}>
                            <Typography color={Colors.Blue500}>Dodaj kolejną osobę</Typography>
                        </TouchableOpacity>
                    }
                </View>))}
                <View style={{ marginHorizontal: 19, marginBottom: 5, marginTop: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography weight="Bold" variant="h5">
                        Godziny kontaktu
                    </Typography>
                </View>
                <View style={{ alignItems: 'center' }}>
                    {/* <Slider
                        min={0}
                        max={23 * 60 + 59} //23:59
                        values={contactHours.split('-').map(e => hoursToMinutes(e))} //08:00-18:00
                        enableLabel
                        time
                        step={5}
                        sliderLength={windowSizes.width - 19 * 2}
                        onValuesChangeFinish={([start, end]) => setContactHours(`${minutesToHours(start)}-${minutesToHours(end)}`)}
                    /> */}
                </View>
            </ScrollView>
            <View>
                <Button onPress={() => {
                    changeContactPersonsHandler(contactPersons);
                    changeCompanyDataHandler('contact_hours', contactHours);
                    // navigation.goBack();
                }}>
                    Potwierdź
                </Button>
            </View>
        </ScreenHeaderProvider>
    );
};

export default AddConractPersonsScreen;