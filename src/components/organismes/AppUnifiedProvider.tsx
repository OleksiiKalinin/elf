import React, { FC, ReactNode, useEffect } from 'react';
import calendarLocaleConfig from '../../hooks/calendarLocaleConfig';
import { Dimensions } from 'react-native';
import { useActions } from '../../hooks/useActions';
import geocoder from 'react-native-geocoder-reborn';
import { MenuProvider } from 'react-native-popup-menu';
import { PaperProvider } from 'react-native-paper';
import { enGB, registerTranslation } from 'react-native-paper-dates'

calendarLocaleConfig();
geocoder.fallbackToGoogle('AIzaSyBLA1spwwoOjY2rOvMliOBc2C87k6ZOJ_s');
geocoder.setLanguage('pl');
registerTranslation('en-GB', enGB)

const AppUnifiedProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { setWindowSizes } = useActions();

    useEffect(() => {
        Dimensions.addEventListener('change', ({ window }) => setWindowSizes(window));
        setWindowSizes(Dimensions.get('window'));
    }, [])

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