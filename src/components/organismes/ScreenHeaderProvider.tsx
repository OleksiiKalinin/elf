import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { MessengerStackParamList } from '../../navigators/MessengerNavigator';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { AuthStackParamList } from '../../navigators/AuthNavigator';
import { RootStackParamList } from '../../navigators/RootNavigator';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';
import Colors from '../../colors/Colors';
// import Colors from '../../../colors/Colors';
// import Typography from '../../atoms/Typography/Typography';
// import { IconButton } from 'native-base';
// import SvgIcon, { IconTypes } from '../../molecules/SvgIcon/SvgIcon';
// import LinearGradient from 'react-native-linear-gradient';
// import { MenuStackParamList } from '../../../navigators/MenuNavigator';
// import { CandidatesStackParamList } from '../../../navigators/CandidatesNavigator';
// import { CalendarStackParamList } from '../../../navigators/CalendarNavigator';
// import { AdvertStackParamList } from '../../../navigators/AdvertNavigator';
// import { MessengerStackParamList } from '../../../navigators/MessengerNavigator';
// import { ProfileStackParamList } from '../../../navigators/ProfileNavigator';
// import { AuthStackParamList } from '../../../navigators/AuthNavigator';
// import { RootStackParamList } from '../../../navigators/RootNavigator';

type ScreensTitlesType = {
  MenuStack: { [k in keyof MenuStackParamList]: string };
  CandidatesStack: { [k in keyof CandidatesStackParamList]: string };
  CalendarStack: { [k in keyof CalendarStackParamList]: string };
  AdvertStack: { [k in keyof AdvertStackParamList]: string };
  MessengerStack: { [k in keyof MessengerStackParamList]: string };
  ProfileStack: { [k in keyof ProfileStackParamList]: string };
  AuthStack: { [k in keyof AuthStackParamList]: string };
};

export const screensTitles: ScreensTitlesType = {
  AuthStack: {
    MainScreen: 'Autoryzacja',
    LoginScreen: 'Zaloguj się',
    RegistrationScreen: 'Zarejestruj się',
    RememberPasswordScreen: 'Resetowanie hasła',
    FillUserDataScreen: 'Dane konta'
  },
  CalendarStack: {
    MainScreen: '',
    QuestionsScreen: 'Pytania',
    AddPersonScreen: 'Dodaj osobę do wydarzenia',
    CallScreen: '',
    EditEventScreen: '',
    EventScreen: 'Zaplanuj wydarzenie',
    ResumesScreen: 'CV Kandydatów',
    VacationScreen: 'Urlop',
    MapScreen: '',
    ChooseAdvertScreen: 'Wybierz ogłoszenie',
    ChooseCandidateScreen: 'Wybierz kandydata',
    ProfileScreen: '',
    VideoScreen: '',
  },
  CandidatesStack: {
    MainScreen: 'Kandydaci',
    FavouritesScreen: 'Wyróżnione',
    FavSettingsScreen: 'Ustawienia',
    FilterScreen: 'Filtry',
    JobScreen: 'Kategorie',
    ProfileScreen: 'Profil kandydata',
    SearchScreen: 'Stanowiska',
    MapScreen: '',
    VideoScreen: '',
  },
  MessengerStack: {
    MainScreen: 'Jobassistant',
  },
  ProfileStack: {
    MainScreen: 'Profil',
    NoCompanyScreen: 'Profil firmy',
    AddCompanyScreen: 'Dodaj profil firmy',
    AddPaymentScreen: 'Dodaj kartę płatniczą',
    CompanyScreen: '',
    CookieScreen: 'Pliki Cookies',
    EditPaymentScreen: 'Płatności',
    HelpCenterScreen: 'Centrum pomocy',
    JobCategoryScreen: 'Wybierz branzę',
    JobScreen: 'Stanowiska',
    LanguageScreen: 'Preferowane języki',
    MethodsScreen: 'Wykorzystywane metody',
    NotificationScreen: 'Powiadomienia',
    PaymentScreen: 'Płatności',
    PointsScreen: 'Twoje punkty',
    PrivacyScreen: 'Polityka prywatności',
    AccountDataScreen: 'Twoje dane',
    ToolsScreen: 'Wykorzystywane metody',
    AddAdvert: '',
    AddCall: '',
    AddEvent: '',
    CreateCompanyProfile: '',
    PaymentMethods: '',
    Register: '',
    RODO: 'Polityka prywatności',
    SendingOffers: 'Polityka prywatności',
    ShareCamera: 'Polityka prywatności',
    ShareContacts: 'Polityka prywatności',
    ShareLocation: 'Polityka prywatności',
    MapScreen: '',
    AddConractPersonsScreen: 'Dane do kontaktu',
    CompanyDescriptionScreen: 'Opis firmy',
    CompanyInvoiceScreen: 'Dane do faktury',
    PackagesScreen: 'Pakiety',
    SettingsScreen: 'Ustawienia',
    PaymentTemporalScreen: 'Twój pakiet'
  },
  AdvertStack: {
    MainScreen: 'Moje ogłoszenia',
    AdvertScreen: '',
    CandidatesScreen: 'Kandydaci',
    EditAdvertScreen: 'Edytuj ogłoszenie',
    JobCategoryScreen: 'Stanowiska',
    JobScreen: 'Kategorie',
    NewAdvertScreen: 'Nowe ogłoszenie',
    OptionsDrawerScreen: '',
    MapScreen: '',
    ProfileScreen: '',
    VideoScreen: '',
  },
  MenuStack: {
    MainScreen: 'Menu główne',
    CallsScreen: 'Zaplanowane połączenia',
    EventsScreen: 'Twoje wydarzenia',
    NewsDetailsScreen: '',
    NewsScreen: 'Artykuły i nowości',
    QuestionsScreen: 'Lista pytań do kandydata',
    ProfileScreen: '',
    VideoScreen: '',
  },
};

type ScreenHeaderProviderProps = {
  currentStack: keyof RootStackParamList;
  children: React.ReactNode;
  mode?: 'backAction' | 'mainTitle';
  mainTitlePosition?: 'flex-start' | 'center';
  title?: string;
  alterTitle?: any;
  actions?: {
    icon: IconTypes | Element;
    onPress: () => void;
  }[];
  otherActions?: Element,
  transparent?: boolean;
};

const HEIGHT = 50;

const ScreenHeaderProvider: React.FC<ScreenHeaderProviderProps> = ({
  children,
  mode = 'backAction',
  mainTitlePosition = 'center',
  title = null,
  actions = null,
  otherActions = null,
  transparent = false,
  alterTitle = null,
  currentStack,
}) => {
  // const navigation = useNavigation();
  // const history = navigation.getState().routes;
  // const previousScreen: string | null =
  //   history.length > 1
  //     ? history[history.length - 2].name
  //     : null;
  // const previousTitle = previousScreen ? screensTitles[currentStack][previousScreen] : '';

  // @ts-ignore
  const currentTitle: string = 'blabla'//screensTitles[currentStack][useRoute().name];

  return (
    <View style={[styles.Wrapper]}>
      {/* <LinearGradient style={[styles.Header]} {...(transparent ? { locations: [0.1, 0.4, 0.5, 0.65, 0.8, 0.9, 1] } : {})} colors={['rgba(255, 255, 255, 1)', ...(transparent ? ['rgba(255, 255, 255, 0.85)', 'rgba(255, 255, 255, 0.75)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)'] : ['rgba(255, 255, 255, 1)'])]}> */}
      <View style={[styles.Header]}>
        {mode === 'backAction' && (
          <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
            <Button
              circular
              px='15px'
              py='14.5px'
              icon={<SvgIcon icon='arrowLeft' />}
              // onPress={() => navigation.canGoBack() && navigation.goBack()}
            // colorScheme={Colors.Basic300}
            >{' '}</Button>
            <Typography variant="h4" weight="Bold" style={{ alignSelf: 'center' }}>
              {title || currentTitle}
            </Typography>
          </View>
        )}
        {mode === 'mainTitle' && (
          <View
            style={{
              alignItems: mainTitlePosition,
              position: 'absolute',
              width: '100%',
            }}>
            {alterTitle ?
              alterTitle
              :
              <Typography variant="h4" weight="Bold" style={{ paddingLeft: mainTitlePosition === 'center' ? 0 : 15 }}>
                {title || currentTitle}
              </Typography>}
          </View>
        )}
        {actions && (
          <View style={styles.Actions}>
            {actions.map(({ icon, onPress }) => <View style={{ marginLeft: 20 }}>{(typeof icon === 'object') ? (
              <TouchableOpacity style={{ padding: 5 }} onPress={onPress}></TouchableOpacity>
              // <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>{icon}</TouchableOpacity>
            ) : (
              <Button
                circular
                icon={<SvgIcon icon={icon} />}
                onPress={onPress}
              // colorScheme={Colors.Basic100}
              >{' '}</Button>
            )
            }</View>
            )}
          </View>
        )}
        {/* {otherActions} */}
      </View>
      {/* </LinearGradient> */}
      <View style={[{ flex: 1, paddingTop: transparent ? 0 : HEIGHT, backgroundColor: Colors.White }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    // ...Platform.select({
    //   ios: {
    //     paddingTop: 30,
    //   },
    //   android: {
    //     paddingTop: 0,
    //   },
    // }),
  },
  Header: {
    position: Platform.select({
      native: 'absolute',
      web: 'fixed'
    }),
    top: 0,
    height: HEIGHT,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: Colors.White
  },
  ButtonBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Actions: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 12,
    flex: 1,
  },
});

export default ScreenHeaderProvider;
