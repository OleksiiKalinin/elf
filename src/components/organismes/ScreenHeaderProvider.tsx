import { StyleSheet, View, Platform, TouchableOpacity, Dimensions, StyleProp, ViewStyle, ColorValue } from 'react-native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';
import Colors from '../../colors/Colors';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RootStackParamList } from '../../navigators/RootNavigator';
import useRouter, { protectedUrls, withCompanyUrls } from '../../hooks/useRouter';
import { BOTTOM_TABS_HEIGHT } from './BottomTabs';
import { useActions } from '../../hooks/useActions';
import windowExists from '../../hooks/windowExists';
import useShadow from '../../hooks/useShadow';
import { uniqueId } from 'lodash';
import isDev from '../../hooks/isDev';


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
    EventScreen: 'Wydarzenie',
    EventEditorScreen: 'Zaplanuj wydarzenie',
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
    CompanyEditorScreen: 'Dodaj profil firmy',
    AddPaymentScreen: 'Dodaj kartę płatniczą',
    CompanyScreen: '',
    CookieScreen: 'Pliki Cookies',
    EditPaymentScreen: 'Płatności',
    HelpCenterScreen: 'Centrum pomocy',
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
    AdvertEditorScreen: '',
    CandidatesScreen: '',
    PaymentReturnScreen: '',
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
    TestScreen: 'Test screen',
    ImageScreen: 'Image screen',
  },
};

export type ScreenHeaderProviderProps = {
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
  hide?: boolean;
  staticContentHeightOnWeb?: boolean;
  callback?: () => void;
  headerItemsColor?: ColorValue,
  backgroundHeader?: ColorValue,
  backgroundContent?: ColorValue,
  /**0 will return {} empty object (no shadow), shadow values from 1 to 24 (any value below or above will be ignored and rounded to nearest edge) */
  shadowDepth?: Parameters<typeof useShadow>[0],
};

export const SCREEN_HEADER_HEIGHT = 50;

let firstAppLoading = true;

const ScreenHeaderProvider: React.FC<ScreenHeaderProviderProps> = ({
  children,
  mode = 'backAction',
  mainTitlePosition = 'center',
  title = null,
  actions = null,
  otherActions = null,
  transparent = false,
  hide = false,
  staticContentHeightOnWeb = false,
  alterTitle = null,
  callback,
  headerItemsColor = Colors.Basic900,
  backgroundHeader,
  backgroundContent,
  shadowDepth = 0,
}) => {
  const { backToRemoveParams, back } = useRouter();
  const { currentScreen, userData, userCompany, windowSizes, swipeablePanelProps, isTabbarVisible, appLoading, blockedScreen, loggedOut } = useTypedSelector(s => s.general);
  const { setShowUserShouldBeLogedInModal, setShowUserShouldHaveCompanyModal, setShowExitWarningModal } = useActions();
  const [contentProtected, setContentProtected] = useState<boolean>(!isDev());
  // @ts-ignore
  const currentTitle: string = screensTitles[currentScreen.stack][currentScreen.screen] || '';
  const firstRender = useRef(true);

  const HeaderSpace = transparent || hide ? 0 : SCREEN_HEADER_HEIGHT;
  const BottomSpace = isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0;
  const StaticHeightForWeb = windowSizes.height - HeaderSpace - BottomSpace;

  useEffect(() => {
    if (!appLoading && !isDev()) {
      if (firstAppLoading || !firstRender.current || loggedOut) {
        const { stack, screen } = currentScreen;
        let protectedUrl = true;

        if (!userData && !!protectedUrls[stack].find(e => e === 'all' || e === screen)) {
          setShowUserShouldBeLogedInModal({ state: true, closeAction: 'redirectToRoot' });
        } else if (userData && !userCompany && !!withCompanyUrls[stack].find(e => e === 'all' || e === screen)) {
          setShowUserShouldHaveCompanyModal({ state: true, closeAction: 'redirectToRoot' });
        } else {
          protectedUrl = false;
        }

        setContentProtected(protectedUrl);
      }

      firstRender.current = false;
      firstAppLoading = false;
    }
  }, [currentScreen, userData, appLoading, loggedOut]);

  useEffect(() => {
    if (swipeablePanelProps?.mode === 'screen') {
      setContentProtected(false);
    }
  }, [swipeablePanelProps, userData]);

  return (
    <View style={{
      display: contentProtected ? 'none' : 'flex',
      flex: Platform.select({ native: 1 }),
      minHeight: Platform.select({ web: windowSizes.height - BottomSpace }),
      alignItems: 'center',
    }}>
      <View style={{ maxWidth: 768, width: '100%', flex: 1 }}>
        <View
          style={[styles.Header, {
            backgroundColor:
              transparent && backgroundHeader ?
                backgroundHeader
                :
                (transparent ? 'transparent' : Colors.White)
            ,
            display: hide ? 'none' : 'flex',
            ...useShadow(shadowDepth),
          }]}
        >
          {mode === 'backAction' && (
            <View style={{ flex: 1, height: '100%', alignItems: 'flex-start', flexDirection: 'row' }}>
              <Button
                variant={transparent ? 'transparent' : 'text'}
                p={0}
                alignItems='center'
                width={50}
                height='100%'
                icon={<SvgIcon icon='arrowLeft' fill={headerItemsColor} />}
                onPress={() => {
                  !!callback ?
                    callback()
                    :
                    blockedScreen.blockedBack ?
                      setShowExitWarningModal(true)
                      :
                      !!swipeablePanelProps ?
                        backToRemoveParams()
                        :
                        back()
                }}
              />
              <Typography variant="h4" weight="Bold" style={{ alignSelf: 'center', color: headerItemsColor, paddingRight: 15 }}>
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
                <Typography variant="h4" weight="Bold" style={{ paddingHorizontal: mainTitlePosition === 'center' ? 0 : 15 }}>
                  {title || currentTitle}
                </Typography>}
            </View>
          )}
          {(!!actions?.length || !!otherActions) && (
            <View style={styles.Actions}>
              {!!actions?.length && <View style={{ flex: 1, marginRight: 12 }}>
                {actions.map(({ icon, onPress }, index) => (
                  <View style={{ marginLeft: 20 }} key={index}>
                    <Button
                      circular
                      variant={transparent ? 'transparent' : 'text'}
                      icon={(typeof icon === 'string' ? <SvgIcon fill={headerItemsColor ?? backgroundContent} icon={icon as IconTypes} /> : (typeof icon === 'object' ? icon : undefined)) as any}
                      onPress={onPress}
                    />
                  </View>))}
              </View>}
              {otherActions && otherActions}
            </View>
          )}
        </View>
        <View style={[{
          height: Platform.select({ web: staticContentHeightOnWeb ? StaticHeightForWeb : '100%' }),
          paddingTop: Platform.select({ web: staticContentHeightOnWeb ? undefined : HeaderSpace, native: HeaderSpace }),
          marginTop: Platform.select({ web: staticContentHeightOnWeb ? HeaderSpace : undefined }),
          flex: Platform.select({ native: 1 }),
          backgroundColor: backgroundContent
        }]}>
          <View style={{ width: '100%', height: '100%' }}>
            {children}
          </View>
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
    right: 0,
    flex: 1,
  },
});

export default ScreenHeaderProvider;
