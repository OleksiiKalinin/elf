import React, { FC, useEffect, useState } from 'react';
import { Keyboard, View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootStackParamList, navigationLinking } from '../../navigators/RootNavigator';
import SvgIcon, { IconTypes } from '../atoms/SvgIcon';
import { MenuStackParamList } from '../../navigators/MenuNavigator';
import { CandidatesStackParamList } from '../../navigators/CandidatesNavigator';
import { CalendarStackParamList } from '../../navigators/CalendarNavigator';
import { AdvertStackParamList } from '../../navigators/AdvertNavigator';
import { MessengerStackParamList } from '../../navigators/MessengerNavigator';
import { ProfileStackParamList } from '../../navigators/ProfileNavigator';
import { AuthStackParamList } from '../../navigators/AuthNavigator';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Colors from '../../colors/Colors';
import Button from '../molecules/Button';
import { useLink } from 'solito/link';

export const BOTTOM_TABS_HEIGHT = 45;

type BottomTabsProps = {
    profileFocused: boolean;
    setProfileFocused: (b: boolean) => void;
    routes: string[];
};
// } & BottomTabBarProps;

const icons: { [k in keyof RootStackParamList]: IconTypes } = {
    AdvertStack: 'work',
    AuthStack: 'googleLittle',
    CandidatesStack: 'candidates',
    CalendarStack: 'calendar',
    MenuStack: 'home',
    MessengerStack: 'messenger',
    ProfileStack: 'pencil',
}

const hiddenTabbarScreens: {
    MenuStack: Array<keyof MenuStackParamList>;
    CandidatesStack: Array<keyof CandidatesStackParamList>;
    CalendarStack: Array<keyof CalendarStackParamList>;
    AdvertStack: Array<keyof AdvertStackParamList>;
    MessengerStack: Array<keyof MessengerStackParamList>;
    ProfileStack: Array<keyof ProfileStackParamList>;
    AuthStack: Array<keyof AuthStackParamList>;
} = {
    AdvertStack: ['ProfileScreen', 'VideoScreen', 'AdvertScreen', 'EditAdvertScreen', 'JobScreen', 'NewAdvertScreen', 'CandidatesScreen', 'JobCategoryScreen', 'MapScreen', 'OptionsDrawerScreen'],
    AuthStack: ['MainScreen', 'LoginScreen', 'RegistrationScreen', 'RememberPasswordScreen', 'FillUserDataScreen'],
    CandidatesStack: ['ProfileScreen', 'VideoScreen', 'FavouritesScreen', 'FavSettingsScreen', 'FilterScreen', 'JobScreen', 'MapScreen', 'ProfileScreen', 'SearchScreen', 'VideoScreen'],
    CalendarStack: ['ProfileScreen', 'VideoScreen', 'CallScreen', 'EditEventScreen', 'EventScreen', 'MapScreen', 'AddPersonScreen', 'ChooseAdvertScreen', 'ChooseCandidateScreen'],
    MenuStack: ['ProfileScreen', 'VideoScreen', 'CallsScreen', 'EventsScreen', 'NewsScreen', 'QuestionsScreen'],
    MessengerStack: [],
    ProfileStack: ['PaymentTemporalScreen', 'SettingsScreen', 'PackagesScreen', 'CompanyInvoiceScreen', 'CompanyDescriptionScreen', 'NoCompanyScreen', 'AddCompanyScreen', 'AddPaymentScreen', 'CompanyScreen', 'CookieScreen', 'EditPaymentScreen', 'HelpCenterScreen', 'JobCategoryScreen', 'JobScreen', 'LanguageScreen', 'MapScreen', 'MethodsScreen', 'NotificationScreen', 'PaymentScreen', 'PointsScreen', 'PrivacyScreen', 'AccountDataScreen', 'ToolsScreen', 'AddConractPersonsScreen'],
};

const BottomTabs: FC<BottomTabsProps> = ({ routes, profileFocused, setProfileFocused }) => {
    // const animation = useSharedValue({ height: BOTTOM_TABS_HEIGHT });
    const { isTabbarVisible, currentScreen } = useTypedSelector(state => state.general);
    const { setIsTabbarVisible } = useActions();

    // const animationStyle = useAnimatedStyle(() => ({
    //     height: withTiming(animation.value.height, { duration: 10 })
    // }), []);

    const badgeNumbers: { [k in keyof RootStackParamList]: number } = {
        MenuStack: 0,
        CandidatesStack: 0,
        CalendarStack: 0,
        AdvertStack: 0,
        MessengerStack: 0,
        ProfileStack: 0,
        AuthStack: 0,
    }

    useEffect(() => {
        if (currentScreen) {
            const [stack, screen] = currentScreen.split('-');
            //@ts-ignore
            setIsTabbarVisible(!hiddenTabbarScreens[stack].includes(screen));
        }
    }, [currentScreen]);

    // useEffect(() => {
    //     animation.value = { height: isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0 };
    // }, [isTabbarVisible]);

    return (
        <Animated.View style={[{ flexDirection: 'row', backgroundColor: Colors.White, height: isTabbarVisible ? BOTTOM_TABS_HEIGHT : 0, visibility: isTabbarVisible ? 'visible' : 'hidden' }]}>
            {/* <Animated.View style={[{ flexDirection: 'row', backgroundColor: Colors.White }, animationStyle]}> */}
            {routes.map(route => {
                const label = route as keyof RootStackParamList;
                const href = ((navigationLinking.config?.screens[label] as any)?.path || '') as string;
                const isFocused = currentScreen.split('-')[0] === label;
                if (label === 'ProfileStack') setProfileFocused(isFocused);

                const excludedStacks: Array<keyof RootStackParamList> = ['AuthStack', 'ProfileStack'];
                if (excludedStacks.includes(label)) return null;

                return (
                    <Button
                        key={label}
                        variant='white'
                        accessibilityState={isFocused ? { selected: true } : {}}
                        style={{ height: '100%', flex: 1 }}
                        {...(!!href ? useLink({ href: '/' + href }) : {})}
                    >
                        <View style={{ position: 'relative', width: '100%', height: '100%' }}>
                            {/* {!!badgeNumbers[label] && <Badge px='1.5' py='0' zIndex={1} position='absolute' left={2} top={-9} bgColor={Colors.Basic900} rounded="full">
                                <Typography color={Colors.Basic100} variant='small'>{badgeNumbers[label] > 50 ? '50+' : badgeNumbers[label]}</Typography>
                            </Badge>} */}
                            <SvgIcon icon={icons[label]} fill={Colors[isFocused || (label === 'MenuStack' && profileFocused) ? 'Basic900' : 'Basic600']} />
                        </View>
                    </Button>
                )
            })}
        </Animated.View>
    );
}

export default BottomTabs;