import React, { FC, ReactNode, useEffect, useRef } from 'react';
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

calendarLocaleConfig();
geocoder.fallbackToGoogle('AIzaSyBLA1spwwoOjY2rOvMliOBc2C87k6ZOJ_s');
geocoder.setLanguage('pl');
registerTranslation('en-GB', enGB)

const AppUnifiedProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { setWindowSizes } = useActions();
    const appDataLoaded = useRef<boolean>(false);
    const prevToken = useRef<string | null>('default');
    const dispatch = useTypedDispatch();
    const { token } = useTypedSelector(state => state.general);
    const { setToken } = useActions();

    useEffect(() => {
        Dimensions.addEventListener('change', ({ window }) => setWindowSizes(window));
        setWindowSizes(Dimensions.get('window'));
    }, [])

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

    return (
        <>
            <MenuProvider>
                <PaperProvider theme={{dark: false}}>
                    {children}
                </PaperProvider>
            </MenuProvider>
        </>
    );
};

export default AppUnifiedProvider;