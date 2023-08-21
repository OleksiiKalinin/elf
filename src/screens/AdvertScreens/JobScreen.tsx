import { CompositeScreenProps, useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, ScrollView } from 'native-base';
import Typography from '../../components/atoms/Typography/Typography';
import ScreenHeaderProvider from '../../components/organisms/ScreenHeaderProvider/ScreenHeaderProvider';
import { RootStackParamList } from '../../navigators/RootNavigator';
import Colors from '../../colors/Colors';
import TextField from '../../components/molecules/TextField/TextField';
import SvgIcon, { IconTypes } from '../../components/molecules/SvgIcon/SvgIcon';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type MainScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AdvertStackParamList, 'JobScreen'>,
  NativeStackScreenProps<RootStackParamList, 'AdvertStack'>
>;

const Categories: Array<{
  text: string;
  list: Array<string>;
}> = [
    {
      text: 'Biuro',
      list: [
        'Administrator',
      ],
    },
    {
      text: 'Bar/Klub',
      list: ['Barista', "Barman", "Miksolog"],
    },

    {
      text: 'Cukiernia',
      list: [
        'Cukiernik',
        'Ciastkarz',
        'Lodziarz',
        'Dekorator',
      ],
    },

    {
      text: 'Kwiaciarnia',
      list: ['Pracownik kwiaciarni', 'Kwiaciarz', "Florysta"],
    },

    {
      text: 'Restauracja',
      list: [
        'Szef kuchni',
        'Zastępca szefa kuchni',
        'Kucharz zespołu',
        'Kucharz',
        'Młodszy kucharz',
        'Pomoc kuchenna',
      ],
    },

    {
      text: 'Transport',
      list: [
        'Kierowca autobusu',
        'Kierowca tramwaju',
        'Kierowca busa',
        'Kierowca ciężarówki',
        'Kierowca TIR-a',
        'Szofer',
        'Taksówkarz',
        'Kurier',
        'Dostawca zakupów',
        'Dostawca jedzenia',
      ],
    },

    {
      text: 'Lodziarnia',
      list: [
        'Lodziarz',
        'Dekorator',
      ],
    },

    {
      text: 'Sprzedaż',
      list: [
        'Sprzedawca',
        'Sprzedawca w sklepie',
        'Sprzedawca w supermarkecie',
        'Sprzedawca na wyspie',
        'Telemarketer',
      ],
    },

    {
      text: 'Serwis sprzątający',
      list: [
        'Sprzątacz',
        'Pracownik zmywaka',
        "Zmywacz okien",
      ],
    },

    {
      text: 'Budownictwo',
      list: [
        'Pracownik budowy',
        'Kierownik budowy',
        'Murarz',
        'Zbrojarz',
        'Betoniarz',
        'Monter instalacji elektrycznych',
        'Monter instalacji hydraulicznych',
        'Monter elewacji',
        'Cieślarz szalunkowy',
        'Monter frefabrykatów',
        'Ślusarz',
        'Spawacz',
        'Dekarz',
        'Monter rusztowań',
        'Monter izolacji',
      ],
    },

    {
      text: 'Warsztat/serwis',
      list: [
        'Pracownik serwisu komputerowego',
        'Pracownik serwisu rowerowego',
        'Pracownik warsztatu samochodowego',
        'Pracownik warsztatu stolarskiego',
      ],
    },

    {
      text: 'Salon fryzjerski',
      list: [
        'Fryzjer męski',
        'Fryzjer damski',
        'Groomer',
        'Barber',
      ],
    },

    {
      text: 'Salon kosmetyczny',
      list: [
        'Kosmetyczka',
        'Makijażysta',
        'Stylista paznokci',
        'Stylista brwi',
        'Stylista rzęs',
        'Stylista makijażu permamentnego',
      ],
    },

    {
      text: 'Siłownia',
      list: [
        'Pracownik siłowni',
        'Instruktor',
        "Recepcjonista"
      ],
    },

    {
      text: 'Praca ze zwierzętami',
      list: [
        'Fryzjer zwierzęcy',
        'Opiekun zwierzęcy',
        'Pracownik sklepu zoologicznego',
        'Pracownik przychodni weterynaryjnej',
      ],
    },

    {
      text: 'SPA',
      list: [
        'Pracownik SPA',
      ],
    },

    {
      text: 'Salon tatuażu',
      list: [
        'Tatuażysta',
      ],
    },

    {
      text: 'Firma remontowa',
      list: [
        'Tynkarz',
        'Malarz',
        'Tapeciarz',
        'Płytkarz',
        'Glazurnik',
        'Monter sufitów podwieszanych',
      ],
    },

    {
      text: 'Piekarnia',
      list: ['Piekarz'],
    },

    {
      text: 'Kawiarnia',
      list: [
        'Barista',
        'Kelner',
      ],
    },
    {
      text: 'Foodtruck',
      list: [
        'Pracownik foodtrucka',
      ],
    },
  ];

const JobScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
  const [search, setSearch] = useState<string>('');
  const { callback, job_positions } = route.params;
  const { userCompany } = useTypedSelector(s => s.general);

  return (
    <ScreenHeaderProvider currentStack="AdvertStack" mainTitlePosition="flex-start">
      <ScrollView style={{ backgroundColor: Colors.Basic100 }} contentContainerStyle={{ paddingHorizontal: 19, paddingTop: 19, }}>
        {/* <TouchableOpacity
          style={styles.Button}
          onPress={() => console.log("aaa")}>
          <SvgIcon icon={icon} style={{ alignSelf: "center", marginHorizontal: 19 }} />
          <Typography variant="h4" style={{ textAlignVertical: "center" }}>{category}</Typography>
        </TouchableOpacity> */}
        {!!userCompany ? <>
          <View style={styles.Textfield}>
            <TextField
              placeholder="Kogo szukasz?"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={search}
              onChangeText={setSearch}
              left={<SvgIcon icon='search' />}
              right={<IconButton
                p='7px' mr='-7px' borderRadius={0}
                icon={<SvgIcon icon='crossBig' />}
                onPress={() => setSearch('')}
              />}
            />
          </View>

          {job_positions.map(({ id, name }) => !!name.includes(search) && (
            <View style={{ borderBottomWidth: 1, borderColor: Colors.Basic300 }}>
              <TouchableOpacity style={styles.Category}
                onPress={() => {
                  callback(id);
                  navigation.goBack();
                }}
              >
                <Typography color={Colors.Basic900}>{name}</Typography>
              </TouchableOpacity>
            </View>
          ))}
        </>
          :
          <Typography>Nie masz firmy</Typography>
        }
      </ScrollView>
    </ScreenHeaderProvider>
  );
};

const styles = StyleSheet.create({
  Button: {
    height: 80,
    width: 'auto',
    justifyContent: 'flex-start',
    backgroundColor: Colors.White,
    flexDirection: "row"
  },
  Textfield: {
    marginVertical: 16,
  },
  Category: {
    justifyContent: 'flex-start',
    padding: 0,
    marginVertical: 16,
  },
});

export default JobScreen;
