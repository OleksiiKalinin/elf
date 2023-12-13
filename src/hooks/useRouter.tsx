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

const validateUrl = (props: WithUrlProps): string => {
    const newProps: WithUrlProps = cloneDeep(props);

    const exec = (props: any) => {
        const { subView, ...params } = props;
        componentProps = params;
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
        (props.stack === 'ProfileStack' && props.screen === 'CompanyEditorScreen' && (
            props.params?.subView === 'GoogleMapScreen' ||
            props.params?.subView === 'JobCategoryScreen' ||
            props.params?.subView === 'CompanyInvoiceScreen' ||
            props.params?.subView === 'AddContactPersonsScreen' ||
            props.params?.subView === 'CompanyDescriptionScreen' ||
            props.params?.subView === 'ItemSelectorScreen'
        )) ||
        false //something else
    ) {
        exec(props.params);
    }

    return withUrl(newProps);
}

export default function useRouter() {
    const { currentScreen } = useTypedSelector(s => s.general);
    const { setSwipeablePanelProps } = useActions();
    const { back, parseNextPath, push, replace } = useSolitoRouter();
    const { params, setParams } = useParams();
    const id = useRef(Math.random().toString() + Math.random().toString());

    const preProcessHandler = () => {
        // console.log('pressed');
    }

    useEffect(() => {
        return () => {
            if (activeId === id.current) activeId = null;
        }
    }, []);

    useEffect(() => {
        if (activeId === null || activeId === id.current) {
            if ((!!prevParams || !!params?.subView) && (prevParams !== params?.subView)) {
                prevParams = params?.subView;

                if (!!params?.subView) {
                    let Component: FC<any> | null = null;

                    if (params.subView === 'GoogleMapScreen') {
                        Component = GoogleMapScreen;
                    } else if (params.subView === 'ChooseAdvertScreen') {
                        Component = ChooseAdvertScreen;
                    } else if (params.subView === 'ChooseCandidateScreen') {
                        Component = ChooseCandidateScreen
                        // Test
                    } else if (params.subView === 'JobCategoryScreen') {
                        Component = JobCategoryScreen
                    } else if (params.subView === 'ItemSelectorScreen') {
                        Component = ItemSelectorScreen
                    } else if (params.subView === 'CompanyInvoiceScreen') {
                        Component = CompanyInvoiceScreen
                    } else if (params.subView === 'AddContactPersonsScreen') {
                        Component = AddContactPersonsScreen
                    } else if (params.subView === 'CompanyDescriptionScreen') {
                        Component = CompanyDescriptionScreen
                    } else if (params.subView === 'ItemSelectorScreen') {
                        Component = ItemSelectorScreen
                    } else {
                        return;
                    }

                    if (!!componentProps && !!Component) {
                        activeId = id.current;

                        setSwipeablePanelProps({
                            mode: 'screen',
                            children: <Component {...componentProps} />
                        })
                    } else {
                        setParams({ subView: undefined }, { webBehavior: 'replace' });
                    }
                } else {
                    activeId = null;
                    setSwipeablePanelProps(null);
                }
            }
        }
    }, [params]);

    const backOrReplace = () => {
        if (Platform.OS === 'web') {
            let popStatus = false;
            const callback = () => popStatus = true;
            window.addEventListener('popstate', callback);

            back();

            setTimeout(() => {
                if (!popStatus) {
                    const [stack, screen] = currentScreen.split('-');
                    replace(withUrl({ stack: (screen === 'MainScreen' ? 'MenuStack' : stack as any) }));
                }

                window.removeEventListener('popstate', callback);
            }, 200);
        } else {
            back();
        }
    }

    return {
        useLink: ({ href, ...props }: Omit<UseLinkProps, 'href'> & { href: WithUrlProps }): ReturnType<typeof solitoLink> => {
            const linking = solitoLink({ ...props, href: validateUrl(href) });

            return {
                ...linking,
                onPress: (e) => {
                    preProcessHandler();
                    linking.onPress(e);
                }
            }
        },
        parseNextPath,
        back: backOrReplace,
        backToRemoveParams: () => {
            if (Platform.OS === 'web') {
                backOrReplace();
            } else {
                replace(getPathnameFromScreen(currentScreen))
            }
            setSwipeablePanelProps(null);
        },
        push: (url: WithUrlProps, as?: PushParams[1], transitionOptions?: PushParams[2]) => {
            preProcessHandler();
            push(validateUrl(url), as, transitionOptions);
        },
        replace: (url: WithUrlProps, as?: ReplaceParams[1], transitionOptions?: ReplaceParams[2]) => {
            preProcessHandler();
            replace(validateUrl(url), as, transitionOptions);
        },
    }
}