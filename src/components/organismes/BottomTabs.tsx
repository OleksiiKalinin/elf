import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Platform } from 'react-native';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import Typography from '../atoms/Typography';
import withUrl from '../../hooks/withUrl';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { protectedUrls, withCompanyUrls } from '../../hooks/useRouter';
import { useRouter } from 'solito/router';
import useShadow from '../../hooks/useShadow';

export const BOTTOM_TABS_HEIGHT = 45;

type BottomTabsProps = {
    routes: string[];
};

const icons: { [k in keyof RootStackParamList]: IconTypes } = {
    AdvertStack: 'work',
    AuthStack: 'googleLittle',
    CandidatesStack: 'candidates',
    CalendarStack: 'calendar',
    MenuStack: 'home',
    MessengerStack: 'messenger',
    ProfileStack: 'pencil',
}

type ScreensType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? { [T in keyof RootStackParamList]: Array<keyof RootStackParamList[T]['default']> } : never;

const hiddenTabbarScreens: ScreensType = {
    AdvertStack: ['AdvertScreen', 'AdvertEditorScreen', 'CandidatesScreen'],
    AuthStack: ['MainScreen', 'LoginScreen', 'RegistrationScreen', 'RememberPasswordScreen', 'FillUserDataScreen'],
    CandidatesStack: ['ProfileScreen', 'VideoScreen', 'FavouritesScreen', 'FavSettingsScreen', 'FilterScreen', 'ProfileScreen', 'VideoScreen'],
    CalendarStack: ['EventEditorScreen'],
    MenuStack: ['CallsScreen', 'EventsScreen', 'NewsScreen', 'QuestionsScreen', 'QuestionEditorScreen', 'QuestionsListScreen'],
    MessengerStack: [],
    ProfileStack: ['SettingsScreen', 'PackagesScreen', 'NoCompanyScreen', 'CompanyEditorScreen', 'AddPaymentScreen', 'CompanyScreen', 'EditPaymentScreen', 'MethodsScreen', 'NotificationScreen', 'PaymentScreen', 'PointsScreen', 'PrivacyScreen', 'AccountDataScreen', 'ToolsScreen', 'CookieScreen'],
};

/**
 * don't import custom useRouter!!!
 */
const BottomTabs: FC<BottomTabsProps> = ({ routes }) => {
    const { isTabbarVisible, currentScreen, userData, userCompany } = useTypedSelector(state => state.general);
    const { setIsTabbarVisible } = useActions();
    const router = useRouter();

    const badgeNumbers: { [k in keyof RootStackParamList]: number } = {
        MenuStack: 0,
        CandidatesStack: 0,
        CalendarStack: 0,
        AdvertStack: 0,
        MessengerStack: 0,
        ProfileStack: 0,
        AuthStack: 0,
        // MenuStack: 90,
        // CandidatesStack: 1,
        // CalendarStack: 5,
        // AdvertStack: 80,
        // MessengerStack: 11,
        // ProfileStack: 0,
        // AuthStack: 0,
    }

    useEffect(() => {
        const { stack, screen } = currentScreen;
        if (
            (!userData && !!protectedUrls[stack].find(e => e === 'all' || e === screen)) ||
            (userData && !userCompany && !!withCompanyUrls[stack].find(e => e === 'all' || e === screen))
        ) {
            setIsTabbarVisible(false);
            return;
        }
        //@ts-ignore
        setIsTabbarVisible(!hiddenTabbarScreens[stack].includes(screen));
    }, [currentScreen, userData]);

    return (
        <View style={[{
            height: isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0,
            visibility: isTabbarVisible ? 'visible' : 'hidden',
            flex: Platform.select({ web: 1 }),
            alignItems: 'center',
        }]}>
            <View style={[{ flexDirection: 'row', backgroundColor: Colors.White, maxWidth: 768, width: '100%', flex: 1, ...useShadow(10) }]}>
                {routes.map((route) => {
                    const stack = route as keyof RootStackParamList;
                    const isFocused = (currentScreen.stack === stack) || (stack === 'MenuStack' && currentScreen.stack === 'ProfileStack');

                    const excludedStacks: Array<keyof RootStackParamList> = ['AuthStack', 'ProfileStack'];
                    if (!userData && protectedUrls[stack].find(e => e === 'all')) return null;
                    if (excludedStacks.includes(stack)) return null;

                    return (
                        <Button
                            key={stack}
                            variant='white'
                            accessibilityState={isFocused ? { selected: true } : {}}
                            style={{ height: '100%', flex: 1 }}
                            onPress={() => router.push(withUrl({ stack: stack as any }))}
                        >
                            <View style={{ position: 'relative', width: '100%', height: '100%' }}>
                                {!!badgeNumbers[stack] && <View style={{ position: 'absolute', borderRadius: 8, paddingLeft: 5, paddingRight: 5, backgroundColor: Colors.Basic900, zIndex: 1, left: 16, top: -8 }}>
                                    <Typography color={Colors.Basic100} variant='small'>{badgeNumbers[stack] > 50 ? '50+' : badgeNumbers[stack]}</Typography>
                                </View>}
                                <SvgIcon icon={icons[stack]} fill={Colors[isFocused ? 'Basic900' : 'Basic600']} />
                            </View>
                        </Button>
                    )
                })}
            </View>
        </View>
    );
}

export default BottomTabs;