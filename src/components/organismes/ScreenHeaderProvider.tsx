import { StyleSheet, View, Platform, TouchableOpacity, Dimensions } from 'react-native';
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
import { useRouter } from 'solito/router';
import { useTypedSelector } from '../../hooks/useTypedSelector';

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
    JobCategoryScreen: 'Stanowiska',
    JobScreen: 'Kategorie',
    NewAdvertScreen: 'Nowe ogłoszenie',
    MapScreen: '',
  },
  MenuStack: {
    MainScreen: 'Menu główne',
    CallsScreen: 'Zaplanowane połączenia',
    EventsScreen: 'Twoje wydarzenia',
    NewsDetailsScreen: '',
    NewsScreen: 'Artykuły i nowości',
    QuestionsScreen: 'Lista pytań do kandydata',
  },
};

type ScreenHeaderProviderProps = {
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
  staticContentHeight?: boolean;
};

export const SCREEN_HEADER_HEIGHT = 50;

const ScreenHeaderProvider: React.FC<ScreenHeaderProviderProps> = ({
  children,
  mode = 'backAction',
  mainTitlePosition = 'center',
  title = null,
  actions = null,
  otherActions = null,
  transparent = false,
  staticContentHeight = false,
  alterTitle = null,
}) => {
  const { back } = useRouter();
  const { currentScreen } = useTypedSelector(s => s.general);
  const [stack, screen] = currentScreen.split('-');
  // @ts-ignore
  const currentTitle: string = screensTitles[stack][screen];

  return (
    <View style={[styles.Wrapper]}>
      {/* <LinearGradient style={[styles.Header]} {...(transparent ? { locations: [0.1, 0.4, 0.5, 0.65, 0.8, 0.9, 1] } : {})} colors={['rgba(255, 255, 255, 1)', ...(transparent ? ['rgba(255, 255, 255, 0.85)', 'rgba(255, 255, 255, 0.75)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)'] : ['rgba(255, 255, 255, 1)'])]}> */}
      <View style={[styles.Header]}>
        {mode === 'backAction' && (
          <View style={{ flex: 1, height: '100%', alignItems: 'flex-start', flexDirection: 'row' }}>
            <Button
              bg='transparent'
              // px={15}
              // py={14.5}
              p={0}
              alignItems='center'
              width={50}
              height='100%'
              icon={<SvgIcon icon='arrowLeft' />}
              onPress={back}
            // colorScheme={Colors.Basic300}
            />
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
            {actions.map(({ icon, onPress }, index) => (
              <View style={{ marginLeft: 20 }} key={index}>
                {(typeof icon === 'object') ? (
                  <TouchableOpacity style={{ padding: 5 }} onPress={onPress}></TouchableOpacity>
                  // <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>{icon}</TouchableOpacity>
                ) : (
                  <Button
                    circular
                    icon={<SvgIcon icon={icon} />}
                    onPress={onPress}
                  // colorScheme={Colors.Basic100}
                  >{' '}</Button>
                )}
              </View>))}
          </View>
        )}
        {/* {otherActions} */}
      </View>
      {/* </LinearGradient> */}
      <View style={[{
        height: staticContentHeight ? Dimensions.get('window').height - (transparent ? 0 : SCREEN_HEADER_HEIGHT) : undefined,
        flex: !staticContentHeight ? 1 : undefined,
        paddingTop: transparent ? 0 : SCREEN_HEADER_HEIGHT,
        backgroundColor: Colors.White
      }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
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
    height: SCREEN_HEADER_HEIGHT,
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
