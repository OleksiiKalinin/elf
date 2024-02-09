import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import calendarLocaleConfig from '../../hooks/calendarLocaleConfig';
import { Dimensions, Platform } from 'react-native';
import { useActions } from '../../hooks/useActions';
import geocoder from 'react-native-geocoder-reborn';
import { MenuProvider } from 'react-native-popup-menu';
import { PaperProvider, MD3LightTheme, configureFonts, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import generalServices from '../../services/generalServices';
import { ContactPersonType, MediaType } from '../../store/reducers/types';
import candidatesServices from '../../services/candidatesServices';
import companyServices from '../../services/companyServices';
import { pl, registerTranslation as datePickerLocaleConfig } from '../modified_modules/react-native-paper-dates';
import { GoogleSigninProvider, googleSignOut } from './GoogleSignin';
import { ConfigureParams } from '@react-native-google-signin/google-signin';
import LoadingScreen from '../atoms/LoadingScreen';
import useRouter from '../../hooks/useRouter';
import Colors from '../../colors/Colors';
import { convertToFrontEndAddress } from '../../hooks/convertAddress';
import UserShouldBeLogedInModal from '../modals/UserShouldBeLogedInModal';
import SnackbarMessage from '../modals/SnackbarMessage';
import UserShouldHaveCompanyModal from '../modals/UserShouldHaveCompanyModal';
import ScreenExitLock from './ScreenExitLock';
import DraftFormModal from '../modals/DraftFormModal';

calendarLocaleConfig();
geocoder.fallbackToGoogle('AIzaSyCuD83IZtlNNM3sxn9Hac4YSOXkRZurb9c');
geocoder.setLanguage('pl');
datePickerLocaleConfig('pl', pl);

export const googleSigninConfig: ConfigureParams & { webClientId: string } = {
  webClientId: '808570809394-7kol8skr8o68nnkrqauu52i59i7oe3q2.apps.googleusercontent.com',
  offlineAccess: true,
};

const AppUnifiedProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setWindowSizes } = useActions();
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const { token, userCompany, appLoading, userData, currentScreen } = useTypedSelector(state => state.general);
  const { setToken, setUserCompany, setUserSettings } = useActions();
  // ssr huck
  const [ssrWindowSizes, setSsrWindowSizes] = useState<any>(Platform.OS === 'web' ? {} : Dimensions.get('window'));

  useEffect(() => {
    setSsrWindowSizes(Dimensions.get('window'));
    Dimensions.addEventListener('change', ({ window }) => setWindowSizes(window));
  }, []);

  useEffect(() => {
    setWindowSizes(ssrWindowSizes);
  }, [ssrWindowSizes]);

  useEffect(() => {
    console.log('token:', token);
  }, [token]);

  useEffect(() => {
    (async () => {
      const [
        [, token],
        [, refresh_token],
      ] = await AsyncStorage.multiGet([
        'token',
        'refresh_token',
      ]);

      await setToken({ refresh_token, token });
      await dispatch(generalServices.getAppData(token));

      const defaultNotifications = [1, 2, 3, 4, 5, 6];
      const defaultCookies = [1];

      const getNotifications = await AsyncStorage.getItem('notifications');
      const getCookies = await AsyncStorage.getItem('cookies');

      const notifications = !!getNotifications ? JSON.parse(getNotifications) : null;
      const cookies = !!getCookies ? JSON.parse(getCookies) : null;

      await setUserSettings({
        notifications: notifications || defaultNotifications,
        cookies: cookies || defaultCookies
      });
    })();
  }, []);

  useEffect(() => {
    if (userCompany?.id && token) {
      let logo: MediaType | null = null;
      let video: MediaType | null = null;
      let photos: MediaType[] | null = null;
      let certificates: MediaType[] | null = null;
      let contactPersons: ContactPersonType[] = [];

      dispatch(candidatesServices.getCandidateMarks(userCompany.id));
      dispatch(candidatesServices.getCandidateNotes(userCompany.id));

      if (userCompany.logo === undefined || userCompany.photos === undefined || userCompany.certificates === undefined || userCompany.contactPersons === undefined
        //  || userCompany.video === undefined
      ) {
        Promise.all([
          ...(userCompany.logo === undefined ? [
            dispatch(companyServices.getUserCompanyLogo(userCompany.id))
          ] : []),
          // ...(userCompany.video === undefined ? [
          //   dispatch(companyServices.getUserCompanyVideo(userCompany.id))
          // ] : []),
          ...(userCompany.photos === undefined ? [
            dispatch(companyServices.getUserCompanyPhotos(userCompany.id))
          ] : []),
          ...(userCompany.certificates === undefined ? [
            dispatch(companyServices.getUserCompanyCertificates(userCompany.id))
          ] : []),
          ...(userCompany.contactPersons === undefined ? [
            dispatch(companyServices.getUserCompanyContactPersons(userCompany.id))
          ] : []),
        ]).then((res) => {
          const [getLogo,
            // getVideo, 
            getPhotos, getCertificates, getcompanyContactPersons] = res as any;
          if (getLogo) logo = getLogo;
          // if (getVideo) video = getVideo;
          if (getPhotos && getPhotos.length) photos = getPhotos;
          if (getCertificates && getCertificates.length) certificates = getCertificates;
          if (getcompanyContactPersons && getcompanyContactPersons.length) contactPersons = getcompanyContactPersons;
          setUserCompany({
            ...userCompany,
            square_footage: userCompany.square_footage ? userCompany.square_footage.replace(/\.00\b/g, "") : null,
            address: convertToFrontEndAddress(userCompany.address as any),
            logo, photos, certificates, contactPersons
            // video, 
          });
        }).catch(() => { });
      }
    }
  }, [userCompany, token]);

  if (userData && !(userData.email && userData.first_name && userData.last_name)) {
    router.replace({ stack: 'AuthStack', screen: 'FillUserDataScreen' });
  }

  return (
    <GoogleSigninProvider>
      <MenuProvider>
        <PaperProvider theme={{
          ...MD3LightTheme,
          fonts: configureFonts({ config: { fontFamily: 'RedHatDisplay-Regular' } }),
        }}>
          {appLoading && <LoadingScreen />}
          {children}
          <SnackbarMessage />
          <UserShouldBeLogedInModal />
          <UserShouldHaveCompanyModal />
          <DraftFormModal />
          <ScreenExitLock />
        </PaperProvider>
      </MenuProvider >
    </GoogleSigninProvider>
  );
};

export default AppUnifiedProvider;