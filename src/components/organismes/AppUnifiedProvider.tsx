import React, { FC, ReactNode, useEffect } from 'react';
import calendarLocaleConfig from '../../hooks/calendarLocaleConfig';
import { Dimensions } from 'react-native';
import { useActions } from '../../hooks/useActions';

calendarLocaleConfig();

const AppUnifiedProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { setWindowSizes } = useActions();

    useEffect(() => {
        Dimensions.addEventListener('change', ({ window }) => setWindowSizes(window))
    }, [])

    return (
        <>
            {children}
        </>
    );
};

export default AppUnifiedProvider;