import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import calendarLocaleConfig from '../../hooks/calendarLocaleConfig';
import { Dimensions } from 'react-native';
import { useActions } from '../../hooks/useActions';
import geocoder from 'react-native-geocoder-reborn';
import { MenuProvider } from 'react-native-popup-menu';
import { PaperProvider } from 'react-native-paper';
import { enGB, registerTranslation } from 'react-native-paper-dates'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import generalServices from '../../services/generalServices';
import { ContactPersonType, MediaType } from '../../store/reducers/types';
import candidatesServices from '../../services/candidatesServices';
import companyServices from '../../services/companyServices';

calendarLocaleConfig();
geocoder.fallbackToGoogle('AIzaSyBLA1spwwoOjY2rOvMliOBc2C87k6ZOJ_s');
geocoder.setLanguage('pl');
registerTranslation('en-GB', enGB)

const AppUnifiedProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setWindowSizes } = useActions();
  const appDataLoaded = useRef<boolean>(false);
  const prevToken = useRef<string | null>('default');
  const dispatch = useTypedDispatch();
  const { token, userCompany } = useTypedSelector(state => state.general);
  const { setToken, setUserCompany } = useActions();
  const [ssrWindowSizes, setSsrWindowSizes] = useState<any>({})

  useEffect(() => {
    setSsrWindowSizes(Dimensions.get('window'));
    Dimensions.addEventListener('change', ({ window }) => setWindowSizes(window));
  }, []);

  useEffect(() => {
    setWindowSizes(ssrWindowSizes);
  }, [ssrWindowSizes]);

  useEffect(() => {
    (async () => {
      console.log('token: ', token);
      if (!appDataLoaded.current || (token && !prevToken.current)) {
        const [
          [, token],
          [, refresh_token],
        ] = await AsyncStorage.multiGet([
          'token',
          'refresh_token',
        ]);

        const isOk = await dispatch(generalServices.getAppData(token));
        if (!!isOk) {
          appDataLoaded.current = true;
          setToken({ refresh_token, token });
        }
      }
      prevToken.current = token;
    })();
  }, [token]);

  useEffect(() => {
    if (userCompany?.id && token) {
      let logo: MediaType | null = null;
      let video: MediaType | null = null;
      let photos: MediaType[] | null = null;
      let certificates: MediaType[] | null = null;
      let contactPersons: ContactPersonType[] | null = null;

      dispatch(candidatesServices.getCandidateMarks(token, userCompany.id));
      dispatch(candidatesServices.getCandidateNotes(token, userCompany.id));

      if (userCompany.logo === undefined || userCompany.photos === undefined || userCompany.certificates === undefined || userCompany.contactPersons === undefined || userCompany.video === undefined) {
        Promise.all([
          ...(userCompany.logo === undefined ? [
            dispatch(companyServices.getUserCompanyLogo(userCompany.id, token))
          ] : []),
          ...(userCompany.video === undefined ? [
            dispatch(companyServices.getUserCompanyVideo(userCompany.id, token))
          ] : []),
          ...(userCompany.photos === undefined ? [
            dispatch(companyServices.getUserCompanyPhotos(userCompany.id, token))
          ] : []),
          ...(userCompany.certificates === undefined ? [
            dispatch(companyServices.getUserCompanyCertificates(userCompany.id, token))
          ] : []),
          ...(userCompany.contactPersons === undefined ? [
            dispatch(companyServices.getUserCompanyContactPersons(userCompany.id, token))
          ] : []),
        ]).then((res) => {
          const [getLogo, getVideo, getPhotos, getCertificates, getcompanyContactPersons] = res as any;
          if (getLogo) logo = getLogo;
          if (getVideo) video = getVideo;
          if (getPhotos && getPhotos.length) photos = getPhotos;
          if (getCertificates && getCertificates.length) certificates = getCertificates;
          if (getcompanyContactPersons && getcompanyContactPersons.length) contactPersons = getcompanyContactPersons;
          setUserCompany({ ...userCompany, logo, video, photos, certificates, contactPersons });
        }).catch(() => { });
      }
    }
  }, [userCompany, token]);

  return (
    <>
      <MenuProvider>
        <PaperProvider theme={{ dark: false }}>
          {children}
        </PaperProvider>
      </MenuProvider>
    </>
  );
};

export default AppUnifiedProvider;