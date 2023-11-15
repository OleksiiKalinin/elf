import { StyleSheet, View, Platform, TouchableOpacity, Dimensions, StyleProp, ViewStyle, ColorValue } from 'react-native';
import React, { ReactNode, useEffect, useRef } from 'react';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootStackParamList } from '../../navigators/RootNavigator';
import useRouter from '../../hooks/useRouter';
import { BOTTOM_TABS_HEIGHT } from './BottomTabs';


type ScreensTitlesType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? { [T in keyof RootStackParamList]: { [K in keyof RootStackParamList[T]['default']]: string } } : never;

export const screensTitles: ScreensTitlesType = {
  AuthStack: {
    MainScreen: 'Autoryzacja',
    LoginScreen: 'Zaloguj się',
    RegistrationScreen: 'Zarejestruj się',
    RememberPasswordScreen: 'Resetowanie hasła',
    FillUserDataScreen: 'Dane konta',
  },
  CalendarStack: {
    MainScreen: '',
    EventScreen: 'Zaplanuj wydarzenie',
  },
  CandidatesStack: {
    MainScreen: 'Kandydaci',
    FavouritesScreen: 'Wyróżnione',
    FavSettingsScreen: 'Ustawienia',
    FilterScreen: 'Filtry',
    ProfileScreen: 'Profil kandydata',
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
    PackagesScreen: 'Pakiety',
    SettingsScreen: 'Ustawienia',
  },
  AdvertStack: {
    MainScreen: 'Moje ogłoszenia',
    AdvertScreen: '',
    AdvertEditorScreen: 'Nowe ogłoszenie',
    CandidatesScreen: '',
  },
  MenuStack: {
    MainScreen: 'Menu główne',
    CallsScreen: 'Zaplanowane połączenia',
    EventsScreen: 'Twoje wydarzenia',
    NewsDetailsScreen: '',
    NewsScreen: 'Artykuły i nowości',
    QuestionEditorScreen: 'Lista pytań do kandydata',
    QuestionsListScreen: 'Listy pytań',
    QuestionsScreen: '',
  },
};

type ScreenHeaderProviderProps = {
  children: ReactNode;
  mode?: 'backAction' | 'mainTitle';
  mainTitlePosition?: 'flex-start' | 'center';
  title?: string;
  alterTitle?: any;
  actions?: {
    icon: IconTypes | Exclude<React.ReactElement, string | number | boolean> | (string & {});
    onPress: () => void;
  }[];
  otherActions?: ReactNode,
  transparent?: boolean;
  staticContentHeight?: boolean;
  callback?: () => void;
  backgroundColor?: ColorValue
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
  callback,
  backgroundColor,
}) => {
  const { backToRemoveParams, back } = useRouter();
  const { currentScreen, windowSizes, swipeablePanelProps, isTabbarVisible } = useTypedSelector(s => s.general);
  const [stack, screen] = currentScreen.split('-');
  // @ts-ignore
  const currentTitle: string = screensTitles[stack][screen] || '';

  return (
    <View style={{
      flex: 1,
      minHeight: Platform.select({
        web: windowSizes.height - (isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0),
      }),
      alignItems: 'center',
      backgroundColor: Colors.Basic200,
    }}>
      <View style={{ maxWidth: 768, width: '100%', flex: 1 }}>
        <View style={[styles.Header]}>
          {mode === 'backAction' && (
            <View style={{ flex: 1, height: '100%', alignItems: 'flex-start', flexDirection: 'row' }}>
              <Button
                bg='transparent'
                p={0}
                alignItems='center'
                width={50}
                height='100%'
                icon={<SvgIcon icon='arrowLeft' />}
                onPress={callback ? callback : (!!swipeablePanelProps ? backToRemoveParams : back)}
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
          {!!actions?.length && (
            <View style={styles.Actions}>
              {actions.map(({ icon, onPress }, index) => (
                <View style={{ marginLeft: 20 }} key={index}>
                  <Button
                    circular
                    backgroundColor='transparent'
                    icon={(typeof icon === 'string' ? <SvgIcon icon={icon as IconTypes} /> : (typeof icon === 'object' ? icon : undefined)) as any}
                    onPress={onPress}
                  />
                </View>))}
            </View>
          )}
          {otherActions && otherActions}
        </View>
        <View style={[{
          height: Platform.select({ web: staticContentHeight ? windowSizes.height - (transparent ? 0 : SCREEN_HEADER_HEIGHT) - (isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0) : '100%' }),
          flex: Platform.select({ native: 1 }),
          marginTop: transparent ? 0 : SCREEN_HEADER_HEIGHT,
          backgroundColor
        }]}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.White,
    maxWidth: 768,
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
