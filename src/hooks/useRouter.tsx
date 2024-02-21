import { UseLinkProps, useLink as solitoLink } from "solito/link";
import { useRouter as useSolitoRouter } from 'solito/router';
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector"
import withUrl, { WithUrlProps } from "./withUrl";
import windowExists from "./windowExists";
import { createParam } from "solito";
import { FC, ReactElement, ReactNode, useEffect, useRef } from "react";
import { Platform, View } from "react-native";
import { cloneDeep } from "lodash";
import GoogleMapScreen from "../screens/GoogleMapScreen";
import getPathnameFromScreen from "./getPathnameFromScreen";
import { RootStackParamList } from "../navigators/RootNavigator";
import ChooseAdvertScreen from "../screens/ChooseAdvertScreen";
import ChooseCandidateScreen from "../screens/ChooseCandidateScreen";
import JobCategoryScreen from "../screens/JobCategoryScreen";
import ItemSelectorScreen from "../screens/ItemSelectorScreen";
import CompanyInvoiceScreen from "../screens/CompanyInvoiceScreen";
import AddContactPersonsScreen from "../screens/AddContactPersonsScreen";
import CompanyDescriptionScreen from "../screens/CompanyDescriptionScreen";
import SocialMediaScreen from "../screens/SocialMediaScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import EditableItemSelectorScreen from "../screens/EditableItemSelectorScreen";
import { uuidv4 } from "react-native-compressor";
import AddOtherCompanyLocationsScreen from "../screens/AddOtherCompanyLocationsScreen";

export type SubViewType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? AllScreens<T, keyof RootStackParamList[T]['default']> : never;
type AllScreens<T extends keyof RootStackParamList, K extends keyof RootStackParamList[T]['default'] = keyof RootStackParamList[T]['default']> = K extends K ? AllParams<RootStackParamList[T]['default'][K]> : never;
type AllParams<T> = T extends { subView?: any } ? T['subView'] : never;

type ReplaceParams = Parameters<ReturnType<typeof useSolitoRouter>['replace']>;
type PushParams = Parameters<ReturnType<typeof useSolitoRouter>['push']>;

const { useParams } = createParam<{ subView?: SubViewType }>();

let componentProps: any = null;
let activeId: string | null = null;
//f*cking fix of 4x params re-render???
let prevParams: string | undefined = undefined;


type ProtectedUrlsType<T extends keyof RootStackParamList = keyof RootStackParamList> = T extends T ? { [T in keyof RootStackParamList]: Array<keyof RootStackParamList[T]['default']> | ['all'] } : never;

export const notPublicUrls: ProtectedUrlsType = {
    AuthStack: [],
    AdvertStack: ['all'],
    CandidatesStack: ['VideoScreen', 'FavouritesScreen', 'FavSettingsScreen',],
    CalendarStack: ['all'],
    MenuStack: ['CallsScreen', 'EventsScreen', 'NewsScreen', 'QuestionsScreen', 'QuestionEditorScreen', 'QuestionsListScreen', "NewsDetailsScreen",],
    MessengerStack: ['all'],
    ProfileStack: ['all'],
}

export const withCompanyUrls: ProtectedUrlsType = {
    AuthStack: [],
    AdvertStack: ['AdvertEditorScreen', 'CandidatesScreen', "AdvertScreen"],
    CandidatesStack: [],
    CalendarStack: ['EventEditorScreen'],
    MenuStack: [],
    MessengerStack: [],
    ProfileStack: [/* 'CompanyScreen' */],
}

const validateUrl = (props: WithUrlProps): string => {
    const newProps: WithUrlProps = cloneDeep(props);

    const exec = (props: any) => {
        const { subView, ...params } = props;
        componentProps = { ...params, validated: true };
        newProps.params = { subView };
    }

    if (
        (props.stack === 'CalendarStack' && props.screen === 'EventEditorScreen' && (
            props.params?.subView === 'GoogleMapScreen' ||
            props.params?.subView === 'ChooseAdvertScreen' ||
            props.params?.subView === 'ChooseCandidateScreen'
        )) ||
        (props.stack === 'CandidatesStack' && props.screen === 'FilterScreen' && (
            props.params?.subView === 'GoogleMapScreen' ||
            props.params?.subView === 'JobCategoryScreen' ||
            props.params?.subView === 'ItemSelectorScreen'
        )) ||
        (props.stack === 'MenuStack' && props.screen === 'TestScreen' && (
            props.params?.subView === 'JobCategoryScreen'
        )) ||
        (props.stack === 'AdvertStack' && props.screen === 'AdvertEditorScreen' && (
            props.params?.subView === 'JobCategoryScreen' ||
            props.params?.subView === 'ItemSelectorScreen' ||
            props.params?.subView === 'EditableItemSelectorScreen' ||
            props.params?.subView === 'CompanyDescriptionScreen' ||
            props.params?.subView === 'GoogleMapScreen'
        )) ||
        (props.stack === 'ProfileStack' && props.screen === 'CompanyEditorScreen' && (
            props.params?.subView === 'GoogleMapScreen' ||
            props.params?.subView === 'JobCategoryScreen' ||
            props.params?.subView === 'CompanyInvoiceScreen' ||
            props.params?.subView === 'AddContactPersonsScreen' ||
            props.params?.subView === 'CompanyDescriptionScreen' ||
            props.params?.subView === 'ItemSelectorScreen' ||
            props.params?.subView === 'SocialMediaScreen' ||
            props.params?.subView === 'AddOtherCompanyLocationsScreen'
        )) ||
        (props.stack === 'ProfileStack' && props.screen === 'AccountDataScreen' && (
            props.params?.subView === 'ChangePasswordScreen'
        )) ||
        false //something else
    ) {
        exec(props.params);
    }

    return withUrl(newProps);
}

export default function useRouter() {
    const { currentScreen, userData, userCompany, swipeablePanelProps, blockedScreen } = useTypedSelector(s => s.general);
    const { setSwipeablePanelProps, setShowUserShouldBeLogedInModal, setShowUserShouldHaveCompanyModal, setBlockedScreen } = useActions();
    const { back, parseNextPath, push, replace } = useSolitoRouter();
    const { params, setParams } = useParams();
    const id = useRef(uuidv4());

    const preProcessHandler = ({ stack, screen }: WithUrlProps): boolean => {
        let access = false;

        if (!userData && !!notPublicUrls[stack].find(e => e === 'all' || e === screen)) {
            setShowUserShouldBeLogedInModal({ state: true, closeAction: 'close' });
        } else if (userData && !userCompany && !!withCompanyUrls[stack].find(e => e === 'all' || e === screen)) {
            setShowUserShouldHaveCompanyModal({ state: true, closeAction: 'close' });
        } else {
            access = true;
        }

        return access;
    }

    useEffect(() => {
        return () => {
            if (activeId === id.current) activeId = null;
        }
    }, []);

    useEffect(() => {
        if (activeId === null || activeId === id.current) {
            if (!!componentProps?.validated && (!!prevParams || !!params?.subView) && (prevParams !== params?.subView)) {
                prevParams = params?.subView;

                if (!!params?.subView) {
                    let Component: FC<any> | null = null;

                    switch (params.subView) {
                        case 'GoogleMapScreen':
                            Component = GoogleMapScreen;
                            break;
                        case 'ChooseAdvertScreen':
                            Component = ChooseAdvertScreen;
                            break;
                        case 'ChooseCandidateScreen':
                            Component = ChooseCandidateScreen;
                            break;
                        case 'JobCategoryScreen':
                            Component = JobCategoryScreen;
                            break;
                        case 'ItemSelectorScreen':
                            Component = ItemSelectorScreen;
                            break;
                        case 'CompanyInvoiceScreen':
                            Component = CompanyInvoiceScreen;
                            break;
                        case 'AddContactPersonsScreen':
                            Component = AddContactPersonsScreen;
                            break;
                        case 'CompanyDescriptionScreen':
                            Component = CompanyDescriptionScreen;
                            break;
                        case 'CompanyDescriptionScreen':
                            Component = CompanyDescriptionScreen;
                            break;
                        case 'SocialMediaScreen':
                            Component = SocialMediaScreen;
                            break;
                        case 'ChangePasswordScreen':
                            Component = ChangePasswordScreen;
                            break;
                        case 'EditableItemSelectorScreen':
                            Component = EditableItemSelectorScreen;
                            break;
                        case 'AddOtherCompanyLocationsScreen':
                            Component = AddOtherCompanyLocationsScreen;
                            break;
                        default:
                            break;
                    }

                    if (Component) {
                        activeId = id.current;
                        const { validated, ...props } = componentProps;

                        setSwipeablePanelProps({
                            mode: 'screen',
                            children: <Component {...props} />
                        })
                    } else {
                        setParams({ subView: undefined }, { webBehavior: 'replace' });
                    }
                } else {
                    componentProps = null;
                    activeId = null;
                    setSwipeablePanelProps(null);
                }
            }
        }
    }, [params]);

    const backOrReplaceToRoot = () => {
        if (Platform.OS === 'web') {
            const win: any = window;

            if (win.prevPage) {
                back();
            } else {
                win.prevPageIsNull = true;
                const { stack, screen } = currentScreen;
                replace(withUrl({ stack: (screen === 'MainScreen' ? 'MenuStack' : stack as any) }));
            }
        } else {
            back();
        }
    }

    return {
        /**
         * This method does not protect from unauthorized access to path on web because of "href" property.
         * 
         * Use only on:
         * * public screens to redirect to another public screen.
         * * protected screens to redirect to another protected screen.
         * * protected screens to redirect to public screen.
         */
        useLink: ({ href, ...props }: Omit<UseLinkProps, 'href'> & { href: WithUrlProps }): ReturnType<typeof solitoLink> => {
            const linking = solitoLink({ ...props, href: validateUrl(href) });

            return {
                ...linking,
                onPress: (e) => {
                    const access = preProcessHandler(href);
                    if (!access) return;
                    linking.onPress(e);
                }
            }
        },
        parseNextPath,
        back: backOrReplaceToRoot,
        backToRemoveParams: () => {
            if (Platform.OS === 'web') {
                backOrReplaceToRoot();
                setBlockedScreen({ ...blockedScreen, blockedBack: false, });
            } else {
                replace(getPathnameFromScreen(currentScreen))
                setSwipeablePanelProps(null);
            }
            // setSwipeablePanelProps(null);
        },
        push: (url: WithUrlProps, as?: PushParams[1], transitionOptions?: PushParams[2]) => {
            const access = preProcessHandler(url);
            if (!access) return;
            push(validateUrl(url), as, transitionOptions);
        },
        replace: (url: WithUrlProps, as?: ReplaceParams[1], transitionOptions?: ReplaceParams[2]) => {
            const access = preProcessHandler(url);

            if (!access) return;

            let options: any = {};
            if ((currentScreen.stack === url.stack) && !swipeablePanelProps) {
                options = { experimental: { nativeBehavior: 'stack-replace', isNestedNavigator: true } };
            }
            replace(validateUrl(url), as, { ...transitionOptions, ...options });
        },
    }
}