import React, { FC, useEffect, useRef, useState } from 'react';
import { Keyboard, View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
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
import Typography from '../atoms/Typography';
import withUrl from '../../hooks/withUrl';
import { RootStackParamList } from '../../navigators/RootNavigator';

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

type ScreensType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? { [T in keyof RootStackParamList]: Array<keyof RootStackParamList[T]> } : never;

const hiddenTabbarScreens: ScreensType = {
    AdvertStack: ['AdvertScreen', 'JobScreen', 'AdvertEditorScreen', 'CandidatesScreen', 'JobCategoryScreen', 'MapScreen'],
    AuthStack: ['MainScreen', 'LoginScreen', 'RegistrationScreen', 'RememberPasswordScreen', 'FillUserDataScreen'],
    CandidatesStack: ['ProfileScreen', 'VideoScreen', 'FavouritesScreen', 'FavSettingsScreen', 'FilterScreen', 'MapScreen', 'ProfileScreen', 'VideoScreen'],
    CalendarStack: ['EventScreen', 'MapScreen', 'ChooseAdvertScreen', 'ChooseCandidateScreen'],
    MenuStack: ['CallsScreen', 'EventsScreen', 'NewsScreen', 'QuestionsScreen'],
    MessengerStack: [],
    ProfileStack: ['SettingsScreen', 'PackagesScreen', 'CompanyInvoiceScreen', 'CompanyDescriptionScreen', 'NoCompanyScreen', 'AddCompanyScreen', 'AddPaymentScreen', 'CompanyScreen', 'EditPaymentScreen', 'LanguageScreen', 'MapScreen', 'MethodsScreen', 'NotificationScreen', 'PaymentScreen', 'PointsScreen', 'PrivacyScreen', 'AccountDataScreen', 'ToolsScreen', 'AddConractPersonsScreen'],
};

const BottomTabs: FC<BottomTabsProps> = ({ routes }) => {
    // const animation = useSharedValue({ height: BOTTOM_TABS_HEIGHT });
    const { isTabbarVisible, currentScreen } = useTypedSelector(state => state.general);
    const { setIsTabbarVisible } = useActions();

    // const animationStyle = useAnimatedStyle(() => ({
    //     height: withTiming(animation.value.height, { duration: 10 })
    // }), []);

    const badgeNumbers: { [k in keyof RootStackParamList]: number } = {
        MenuStack: 90,
        CandidatesStack: 1,
        CalendarStack: 5,
        AdvertStack: 80,
        MessengerStack: 11,
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
            {routes.map((route) => {
                const stack = route as keyof RootStackParamList;
                const isFocused = (currentScreen.split('-')[0] === stack) || (stack === 'MenuStack' && currentScreen.split('-')[0] === 'ProfileStack');

                const excludedStacks: Array<keyof RootStackParamList> = ['AuthStack', 'ProfileStack'];
                if (excludedStacks.includes(stack)) return null;

                return (
                    <Button
                        key={stack}
                        variant='white'
                        accessibilityState={isFocused ? { selected: true } : {}}
                        style={{ height: '100%', flex: 1 }}
                        {...useLink({ href: withUrl({ stack: stack as any }) })}
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
        </Animated.View>
    );
}

export default BottomTabs;